import { Block } from "../../core"
import "./chat-additions-popup.css"

interface PopupItemSpec<S extends string = string> {
  action: VoidFunction
  icon: `ph-${S}`
  text: string
}

interface ChatAdditionsPopupProps {
  open: boolean
  popupItems: PopupItemSpec[]
}

export class ChatAdditionsPopup extends Block {
  static blockName = "ChatAdditionsPopup"

  constructor(props: ChatAdditionsPopupProps) {
    super({
      ...props,
      open: false,
      popupItems: [
        {
          action: () => console.log("attach photo"),
          icon: "ph-image",
          text: "Фото или Видео",
        },
        {
          action: () => console.log("attach video"),
          icon: "ph-file",
          text: "Файл",
        },
        {
          action: () => console.log("attach place"),
          icon: "ph-map-pin",
          text: "Место",
        },
      ] as PopupItemSpec[],
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
      <div class="chatAdditions">
        <button class="chatAdditions__triggerButton" data-popup-trigger>
          <i class="ph-paperclip chatAdditions__triggerIcon
            {{~#if open}} chatAdditions__triggerIcon_open{{/if}}"
          ></i>
        </button>
        {{#if open}}
          <div class="chatAdditions__popup" data-popup>
            <ul class="chatAdditions__items">
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
