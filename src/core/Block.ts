import { nanoid } from "nanoid"
import Handlebars from "handlebars"
import { EventBus } from "./EventBus"

interface BlockMeta<P = any> {
  props: P
}

type BlockChildren = Record<string, Block>
type BlockRefs = Record<string, Block>
type Events = Values<typeof Block.EVENTS>

export interface BlockProps {
  children?: BlockChildren
  refs?: BlockRefs
  events?: Partial<Record<keyof HTMLElementEventMap, EventListener>>
  [key: string]: any
}

export abstract class Block<
  P extends BlockProps = AnyObject,
  R extends Record<string, Block> = AnyObject
> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  } as const

  public id = nanoid(6)

  private readonly _meta: BlockMeta

  protected _element: Nullable<HTMLElement> = null

  protected readonly props: P

  static blockName: string

  protected children: BlockChildren = {}

  eventBus: () => EventBus<Events>

  // @ts-expect-error 'R could be instantiated with a different subtype of Record<string, Block>
  protected refs: R = {}

  public constructor(props?: P) {
    const eventBus = new EventBus<Events>()

    this._meta = {
      props,
    }

    this.getStateFromProps(props)

    this.props = this._makePropsProxy(props || ({} as P))

    this.eventBus = () => eventBus

    this._registerEvents(eventBus)

    eventBus.emit(Block.EVENTS.INIT, this.props)
  }

  _registerEvents(eventBus: EventBus<Events>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  private _createResources() {
    this._element = this._createDocumentElement("div")
  }

  init() {
    this._createResources()
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props)
  }

  private _componentDidMount(props: P) {
    this.componentDidMount(props)
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM, this.props)
  }

  componentDidMount(props: P) {}

  private _componentDidUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps)
    if (!response) {
      return
    }
    this._render()
  }

  componentDidUpdate(oldProps: P, newProps: P) {
    return true
  }

  setProps = (nextProps: Partial<P>) => {
    if (!nextProps) {
      return
    }

    Object.assign(this.props, nextProps)
  }

  getProps = () => {
    return this.props
  }

  get element() {
    return this._element
  }

  private _render() {
    const fragment = this._compile()

    this._removeEvents()
    const newElement = fragment.firstElementChild!

    this._element!.replaceWith(newElement)

    this._element = newElement as HTMLElement
    this._addEvents()
  }

  abstract render(): string

  getContent(): HTMLElement {
    // Хак, чтобы вызвать CDM только после добавления в DOM
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (
          this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
        ) {
          this.eventBus().emit(Block.EVENTS.FLOW_CDM, this.props)
        }
      }, 100)
    }

    return this.element!
  }

  _makePropsProxy(props: any): any {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this

    return new Proxy(props as unknown as object, {
      get(target: EmptyObject, prop: string) {
        const value = target[prop]
        return typeof value === "function" ? value.bind(target) : value
      },
      set(target: EmptyObject, prop: string, value: unknown) {
        target[prop] = value

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в след итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target)
        return true
      },
      deleteProperty() {
        throw new Error("Нет доступа")
      },
    }) as unknown as P
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName)
  }

  _removeEvents() {
    const { events } = this.props

    if (!events || !this._element) {
      return
    }

    Object.entries(events).forEach(([event, listener]) => {
      if (this._element) {
        this._element.removeEventListener(event, listener)
      }
    })
  }

  _addEvents() {
    const { events } = this.props

    if (!events) {
      return
    }

    Object.entries(events).forEach(([event, listener]) => {
      if (this._element) {
        this._element.addEventListener(event, listener)
      }
    })
  }

  _compile(): DocumentFragment {
    const fragment = document.createElement("template")

    /**
     * Рендерим шаблон
     */
    const template = Handlebars.compile(this.render())
    fragment.innerHTML = template({
      ...this.state,
      ...this.props,
      children: this.children,
      refs: this.refs,
    })

    /**
     * Заменяем заглушки на компоненты
     */
    Object.entries(this.children).forEach(([id, component]) => {
      /**
       * Ищем заглушку по id
       */
      const stub = fragment.content.querySelector(`[data-id="${id}"]`)

      if (!stub) {
        return
      }

      const stubChilds = stub.childNodes.length ? stub.childNodes : []

      /**
       * Заменяем заглушку на component._element
       */
      const content = component.getContent()
      stub.replaceWith(content)

      /**
       * Ищем элемент layout-а, куда вставлять детей
       */
      const layoutContent = content.querySelector('[data-layout="1"]')

      if (layoutContent && stubChilds.length) {
        layoutContent.append(...stubChilds)
      }
    })

    /**
     * Возвращаем фрагмент
     */
    return fragment.content
  }

  show() {
    this.getContent().style.display = "initial"
  }

  hide() {
    this.getContent().style.display = "none"
  }
}
