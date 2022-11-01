import { Block } from "../../core"
import "./chat-actions-popup.css"

export class ChatActionsPopup extends Block {
  static blockName = "ChatActionsPopup"

  constructor(props) {
    super({
      ...props,
      open: false,
      popupItems: [
        {
          icon: "ph-user-plus",
          text: "Добавить пользователя",
        },
        {
          icon: "ph-user-minus",
          text: "Удалить пользователя",
        },
        {
          icon: "ph-trash",
          text: "Удалить чат",
        },
      ],
      events: {
        click: (e: MouseEvent) => {
          const element = e.target as HTMLElement
          const isActionsButton = element.hasAttribute("data-popup-trigger")

          if (isActionsButton) {
            this.setProps({ open: !this.props.open })
          }
        },
      },
    })
  }

  render() {
    return /* html */ `
      <div class="chatActions">
        <button class="chatActions__triggerButton" data-popup-trigger>
          <i class="ph-dots-three-outline-vertical chatActions__triggerIcon
                    {{~#if open}} chatActions__triggerIcon_open{{/if}}">
          </i>
        </button>
        {{#if open}}
          <div class="chatActions__popup" data-popup>
            <ul class="chatActions__items">
            {{#each popupItems as |item| }}
              {{{ ChatPopupItem
                icon=item.icon
                onClick=item.action
                text=item.text
              }}}
            {{/each}}
            </ul>
          </div>
        {{/if}}
      </div>
    `
  }
}
