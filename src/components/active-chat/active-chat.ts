import { Block } from "../../core"
import { ChatActions } from "../chat-actions-popup/chat-actions-popup"
import type { PopupItem } from "../chat-popup-item/chat-popup-item"
import "./active-chat.css"

// @ts-expect-error parcel import url resolution mechanism
const catPictureUrl = new URL("../../assets/catpix.jpeg", import.meta.url)

interface ActiveChatProps {
  chatName: string
  image?: string
  messages: AnyObject
  openModal: (action: ChatActions) => void
}

interface ActiveChatState {
  image: string
  popupOpen: boolean
  popupItems: PopupItem[]
  popupName: "chatActions"
}

export class ActiveChat extends Block<ActiveChatState> {
  static blockName = "ActiveChat"

  constructor(props: ActiveChatProps) {
    super({
      ...props,
      popupOpen: false,
      popupName: "chatActions",
      image: catPictureUrl.href,
      popupItems: [
        {
          iconClass: "ph-user-plus",
          text: "Добавить пользователя",
          action: props.addUser,
        },
        {
          iconClass: "ph-user-minus",
          text: "Удалить пользователя",
          action: props.deleteUser,
        },
        {
          iconClass: "ph-trash",
          text: "Удалить чат",
          action: props.deleteChat,
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

  render(): string {
    return /* html */ `
      <div class="activeChat">
        <div class="chatHeader">
          <img  src="{{image}}" alt="фото профиля" class="chatHeader__image">
          <h2 class="chatHeader__chatName">{{chatName}}</h2>
          <div class="chatHeader__popupRoot">
            <button data-popup-trigger="{{popupName}}" class="popupTrigger">
              <i class="ph-dots-three-outline-vertical popupTrigger__icon
                        {{~#if popupOpen}} popupTrigger__icon_open{{/if}}">
              </i>
            </button>
            {{#if popupOpen}}
              {{{ Popup
                items=popupItems
                position=popupPosition
                extraClass="chatHeader__popup"
              }}}
            {{/if}}
          </div>
        </div>
        <ol class="activeChat__messages">
          {{#each messages as |message| }}
            {{{ MessageBubble
              text=message.text
              image=message.image
              time=message.time
              own=message.own
            }}}
          {{/each}}
        </ol>
      </div>
    `
  }
}
