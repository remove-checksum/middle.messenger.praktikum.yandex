import { Block } from "../../core"
import type { PopupItem, ModalVariant } from "../index"
import { Chat } from "../../services/api/Chats"
import { Message } from "../../store/actions/Message"
import avatarFallback from "../../assets/avatar_not_found.png"
import "./active-chat.css"

interface ActiveChatProps {
  currentChat: Chat
  messages: Message[]
  currentUserId: number
  openModal: (variant: ModalVariant) => void
}

type DisplayMessage = {
  text: string
  image?: string
  time: string
  own: boolean
}

interface ActiveChatState {
  chat: Chat
  messages: DisplayMessage[]
  popupOpen: boolean
  popupItems: PopupItem[]
  popupName: "chatActions"
}

export class ActiveChat extends Block<ActiveChatState> {
  static blockName = "ActiveChat"

  constructor(props: ActiveChatProps) {
    const popupItems = [
      {
        iconClass: "ph-user-plus",
        text: "Добавить пользователя",
        action: () => {
          this.togglePopup()
          props.openModal("addUser")
        },
      } as const,
      {
        iconClass: "ph-user-minus",
        text: "Удалить пользователя",
        action: () => {
          this.togglePopup()
          props.openModal("deleteUser")
        },
      } as const,
      {
        iconClass: "ph-trash",
        text: "Удалить чат",
        action: () => {
          this.togglePopup()
          props.openModal("deleteChat")
        },
      } as const,
    ]

    const toDisplayMessage = (message: Message): DisplayMessage => ({
      text: message.content,
      image: message?.file?.filename,
      time: message.time,
      own: message.userId === props.currentUserId,
    })

    super({
      chat: props.currentChat,
      messages: props.messages.map(toDisplayMessage),
      popupOpen: false,
      popupName: "chatActions",
      popupItems,
      events: {
        click: (e: MouseEvent) => {
          const isPopupTriggerButton =
            e.target instanceof HTMLButtonElement &&
            e.target.dataset.popupTrigger === this.props.popupName

          if (isPopupTriggerButton) {
            this.togglePopup()
          }
        },
      },
    })
  }

  componentDidMount(): void {
    this.scrollToLast()
  }

  scrollToLast = () => {
    this.getContent().scrollTo({
      top: 9000,
    })
  }

  togglePopup = () => {
    this.setProps({ popupOpen: !this.props.popupOpen })
  }

  render(): string {
    const avatarSrc = this.props.chat.avatar || avatarFallback

    return /* html */ `
      <div class="activeChat">
        <div class="chatHeader">
          <img src="${avatarSrc}" alt="Аватар чата" class="chatHeader__image">
          <h2 class="chatHeader__chatName">{{chat.title}}</h2>
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
        {{#if messages}}
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
        {{else}}
          <p class="activeChat__no-messages">Напишите что-нибудь</p>
        {{/if}}
      </div>
    `
  }
}
