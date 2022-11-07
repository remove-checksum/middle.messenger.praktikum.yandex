import { Block } from "../../core"
import { PopupItem } from "../popup/popup"
import "./chat-inputbox.css"

interface ChatInputboxProps {
  inputType: string
  inputName: string
}

interface ChatInputboxState {
  popupItems: PopupItem[]
  popupName: "chatAdditions"
  popupOpen: boolean
}

export class ChatInputbox extends Block<ChatInputboxProps & ChatInputboxState> {
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
          action: props.addPhoto,
        },
        {
          iconClass: "ph-file",
          text: "Файл",
          action: props.addFile,
        },
        {
          iconClass: "ph-map-pin",
          text: "Место",
          action: props.addPlace,
        },
      ],
      events: {
        click: (e: MouseEvent) => {
          if (
            e.target instanceof HTMLButtonElement &&
            e.target.dataset.popupTrigger === this.props.popupName
          ) {
            this.togglePopup()
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
      <form action="#" class="chatInputbox">
        <div class="chatInputbox__popupRoot">
          <button class="chatAdditions__triggerButton" data-popup-trigger="{{popupName}}">
            <i class="ph-paperclip chatAdditions__triggerIcon
              {{~#if popupOpen}} chatAdditions__triggerIcon_open{{/if}}"
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
          name=inputName
          hasLabel=false
          extraClass="chatInputbox__input"
          type=chatInputType
          placeholder="Введите сообщение"
        }}}
        <button class="chatInputbox__button">
          <i class="ph-paper-plane-right chatInputbox__icon"></i>
        </button>
      </form>
    `
  }
}
