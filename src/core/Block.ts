import { nanoid } from "nanoid"
import Handlebars from "handlebars"
import { EventBus } from "./EventBus"
import { addProxyHandler } from "../helpers/addProxyHandler"

type Events = Values<typeof Block.EVENTS>

interface CorrectEventHandlers extends EventListener {
  submit: (e: SubmitEvent) => void
  click: (e: MouseEvent) => void
  blur: (e: FocusEvent) => void
  focus: (e: FocusEvent) => void
}
export interface BlockProps {
  events?: Partial<
    Record<keyof HTMLElementEventMap, (e: any) => void> & CorrectEventHandlers
  >
}

export interface BlockConstructable<P extends AnyObject = any> {
  new (props: P): Block<P>
  blockName: string
}

export abstract class Block<
  P extends AnyObject & BlockProps = any & BlockProps,
  R extends Record<string, Block> = AnyObject
> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
    FLOW_CWU: "flow-component-will-unmount",
  } as const

  public id = nanoid(6)

  private blockListeners = new Map()

  protected _element: Nullable<HTMLElement> = null

  protected readonly props: P

  static blockName: string

  protected children: Record<string, Block<UnknownObject>> = {}

  eventBus: () => EventBus<Events>

  // @ts-expect-error 'R could be instantiated with a different subtype of Record<string, Block>
  protected refs: R = {}

  public constructor(props: P & BlockProps = {} as P) {
    const eventBus = new EventBus<Events>()

    this.props = addProxyHandler(props, (newProps) =>
      this.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...newProps }, newProps)
    ) as P

    this.eventBus = () => eventBus

    this._registerEvents(eventBus)

    eventBus.emit(Block.EVENTS.INIT, this.props)
  }

  private _registerEvents(eventBus: EventBus<Events>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this))
    // @ts-expect-error 'P could be instantiated with arbitrary type'
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    // @ts-expect-error 'P could be instantiated with arbitrary type'
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
    // @ts-expect-error 'P could be instantiated with arbitrary type'
    eventBus.on(Block.EVENTS.FLOW_CWU, this.componentWillUnmount.bind(this))
  }

  private _createResources() {
    this._element = this.createDocumentElement("div")
  }

  private init() {
    this._createResources()
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props)
  }

  private _componentDidMount(props: P) {
    this.componentDidMount(props)
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM, this.props)
  }

  dispatchComponentWillUnmount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CWU, this.props)
  }

  // This method meant to be overriden
  /* eslint-disable-next-line */
  public componentDidMount(props: P) {}

  // This method meant to be overriden
  /* eslint-disable-next-line */
  public componentWillUnmount(props: P) {}

  private _componentDidUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps)
    if (!response) {
      return
    }
    this._render()
  }

  // This method meant to be overriden
  /* eslint-disable-next-line */
  componentDidUpdate(oldProps: P, newProps: P) {
    return true
  }

  setProps = (nextProps: Partial<P> & BlockProps) => {
    if (!nextProps) {
      return
    }

    Object.assign(this.props, nextProps)
  }

  getProps = () => this.props

  get element() {
    return this._element
  }

  private _render() {
    const fragment = this.compile()

    this.removeEvents()
    const newElement = fragment.firstElementChild

    if (newElement) {
      this._element?.replaceWith(newElement)

      this._element = newElement as HTMLElement
    }

    this.addEvents()
  }

  abstract render(): string

  getContent(): HTMLElement {
    // ??????, ?????????? ?????????????? CDM ???????????? ?????????? ???????????????????? ?? DOM
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (
          this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
        ) {
          this.eventBus().emit(Block.EVENTS.FLOW_CDM, this.props)
        }
      }, 100)
    }

    if (!this.element) {
      throw new Error("Block has no elements")
    }

    return this.element
  }

  private createDocumentElement(tagName: string) {
    return document.createElement(tagName)
  }

  private removeEvents() {
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

  private addEvents() {
    const { events } = this.props

    if (!events) {
      return
    }

    Object.entries(events).forEach(([event, listener]) => {
      if (this._element) {
        this.blockListeners.set(event, listener)

        this._element.addEventListener(event, listener)
      }
    })
  }

  private compile(): DocumentFragment {
    const fragment = document.createElement("template")

    /**
     * ???????????????? ????????????
     */
    const template = Handlebars.compile(this.render())
    fragment.innerHTML = template({
      ...this.props,
      children: this.children,
      refs: this.refs,
    })

    /**
     * ???????????????? ???????????????? ???? ????????????????????
     */
    Object.entries(this.children).forEach(([id, component]) => {
      /**
       * ???????? ???????????????? ???? id
       */
      const stub = fragment.content.querySelector(`[data-id="${id}"]`)

      if (!stub) {
        return
      }

      const stubChilds = stub.childNodes.length ? stub.childNodes : []

      /**
       * ???????????????? ???????????????? ???? component._element
       */
      const content = component.getContent()
      stub.replaceWith(content)

      /**
       * ???????? ?????????????? layout-??, ???????? ?????????????????? ??????????
       */
      const slotContent = content.querySelector(
        '[data-slot="1"]'
      ) as HTMLDivElement

      if (slotContent && stubChilds.length) {
        slotContent.replaceWith(...stubChilds)
      }
    })

    /**
     * ???????????????????? ????????????????
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
