import { Block } from "../../core/Block"
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

export default class Popup extends Block<PopupProps> {
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
