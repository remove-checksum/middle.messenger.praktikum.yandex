import { Block } from "../../core"
import "./popup.css"

export interface PopupItem<S extends string = string> {
  text: string
  iconClass: `ph-${S}`
  action: VoidFunction
}

interface PopupProps {
  items: PopupItem[]
  extraClass?: string
  position: {
    top: number
    left: number
  }
}

export class Popup extends Block<PopupProps> {
  static blockName = "Popup"

  constructor(props: PopupProps) {
    super({
      ...props,
      events: {
        click: ({ target }: MouseEvent) => {
          if (target instanceof HTMLButtonElement) {
            const matchingItem = props.items.find(
              (item) => item.text === target.innerText
            )

            matchingItem?.action()
          }
        },
      },
    })
  }

  // componentDidMount(props: PopupProps): void {
  //   const popup = this.element
  //   if (popup) {
  //     popup.style.top = `${props.position.top}px`
  //     popup.style.left = `${props.position.left}px`
  //     popup.classList.remove("popup_hidden")
  //   }
  // }

  render() {
    return /* html */ `
      <div class="popup popup_hidden {{extraClass}}">
        <ul class="popup__items">
          {{#each items as |item|}}
            <li class="popup__item">
              <i class="{{item.iconClass}} popup__icon"></i>
              <button class="popup__button">{{item.text}}</button>
            </li>
          {{/each}}
        </ul>
      </div>
    `
  }
}
