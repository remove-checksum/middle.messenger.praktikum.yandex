import { Block } from "../../core"
import { ModalVariant } from "../modal/modal"
import { PopupItem } from "../popup/popup"
import "./chat-inputbox.css"

interface ChatInputboxProps {
  onMessage: (message: string) => void
  openModal: (variant: ModalVariant) => void
}

interface ChatInputboxState {
  popupItems: PopupItem[]
  popupName: "chatAdditions"
  popupOpen: boolean
}

export class ChatInputbox extends Block<ChatInputboxState> {
  static blockName = "ChatInputbox"

  constructor(props: ChatInputboxProps) {
    super({
      ...props,
      popupOpen: false,
      popupName: "chatAdditions",
      popupItems: [
        {
          iconClass: "ph-image",
          text: "Фото или Видео",
          action: () => {
            this.togglePopup()
            props.openModal("addFile")
          },
        },
        {
          iconClass: "ph-file",
          text: "Файл",
          action: () => {
            this.togglePopup()
            props.openModal("addFile")
          },
        },
        {
          iconClass: "ph-map-pin",
          text: "Место",
          action: () => {
            this.togglePopup()
            props.openModal("addFile")
          },
        },
      ],
      events: {
        click: (e: MouseEvent) => {
          if (
            e.target instanceof HTMLButtonElement &&
            e.target.dataset.popupTrigger === this.props.popupName
          ) {
            e.preventDefault()
            this.togglePopup()
          }
        },
        submit: (e: SubmitEvent) => {
          e.preventDefault()
          const input = this.getContent().querySelector(
            ".controlledInput__input"
          ) as HTMLInputElement

          if (input.value.length) {
            props.onMessage(input.value)
          }
        },
      },
    })
  }

  togglePopup = () => {
    this.setProps({ popupOpen: !this.props.popupOpen })
  }

  render() {
    return /* html */ `
      <form action="POST" class="chatInputbox">
        <div class="chatInputbox__popupRoot">
          <button class="popupTrigger" data-popup-trigger="{{popupName}}" type="button">
            <i class="ph-paperclip popupTrigger__icon
              {{~#if popupOpen}} popupTrigger__icon_open{{/if}}"
            ></i>
          </button>
          {{#if popupOpen }}
            {{{ Popup
              items=popupItems
              position=popupPosition
              extraClass="chatInputbox__popup"
            }}}
          {{/if}}
        </div>
        {{{ ControlledInput
          name="message"
          hasLabel=false
          extraClass="chatInputbox__input"
          type="text"
          placeholder="Введите сообщение"
          dontValidate=true
          noAutocomplete=true
        }}}
        <button class="chatInputbox__button" type="submit">
          <i class="ph-paper-plane-right chatInputbox__icon"></i>
        </button>
      </form>
    `
  }
}
