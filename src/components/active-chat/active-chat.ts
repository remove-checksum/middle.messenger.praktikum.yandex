import { Block } from "../../core"
import type { PopupItem } from "../index"
import { Chat } from "../../services/api/Chats"
import { Message } from "../../store/actions/Message"
import avatarFallback from "../../assets/avatar_not_found.png"
import { ModalDispatch } from "../modal/modal"
import { ControlledInput } from "../index"
import "./active-chat.css"
import { AppDispatch } from "../../store"
import { ChatActions } from "../../store/actions"
import { ChatsService, UserService } from "../../services/api"

interface ActiveChatProps {
  currentChat: Chat
  messages: Message[]
  currentUserId: number
  openModal: ModalDispatch
  appDispatch: AppDispatch
}

export type DisplayMessage = {
  text: string
  image?: string
  time: string
  own: boolean
}

interface ActiveChatState {
  currentChat: Chat
  messages: DisplayMessage[]
  popupOpen: boolean
  popupItems: PopupItem[]
  popupName: "chatActions"
  setModal: ModalDispatch
  appDispatch: AppDispatch
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
          this.activateAddUserModal()
        },
      } as const,
      {
        iconClass: "ph-user-minus",
        text: "Удалить пользователя",
        action: () => {
          this.togglePopup()
          this.activateDeleteUserModal()
        },
      } as const,
      {
        iconClass: "ph-trash",
        text: "Удалить чат",
        action: () => {
          this.togglePopup()
          this.activateDeleteChatModal()
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
      currentChat: props.currentChat,
      messages: props.messages.map(toDisplayMessage),
      setModal: props.openModal,
      popupOpen: false,
      popupName: "chatActions",
      appDispatch: props.appDispatch,
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

  activateDeleteChatModal = () => {
    this.props.setModal({
      title: "Удалить чат",
      buttonText: "Удалить",
      content: null,
      warning: true,
      cancel: () => {
        this.props.setModal(null)
      },
      confirm: () => {
        const chatId = this.props.currentChat.id

        this.props.appDispatch(ChatActions.deleteChat, { chatId })
        this.props.setModal(null)
      },
    })
  }

  activateDeleteUserModal = () => {
    const block = new ControlledInput({
      placeholder: "Логин пользователя",
      name: "deleteUser",
      type: "text",
      hasLabel: false,
      dontValidate: true,
    })

    this.props.setModal({
      title: "Удалить пользователя",
      buttonText: "Удалить",
      warning: true,
      content: block,
      cancel: () => {
        this.props.setModal(null)
      },
      confirm: () => {
        const loginQuery = block.getInputValue()
        this.props.appDispatch(ChatActions.removeUserByLogin, { loginQuery })
        block.setInputValue("")
        this.props.setModal(null)
      },
    })
  }

  activateAddUserModal = () => {
    const block = new ControlledInput({
      placeholder: "Логин пользователя",
      name: "addUser",
      type: "text",
      hasLabel: false,
      dontValidate: true,
    })

    this.props.setModal({
      title: "Добавить пользователя",
      buttonText: "Добавить",
      content: block,
      cancel: () => {
        this.props.setModal(null)
      },
      confirm: () => {
        const loginQuery = block.getInputValue()
        this.props.appDispatch(ChatActions.addUserByLogin, { loginQuery })
        block.setInputValue("")
        this.props.setModal(null)
      },
    })
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
    const avatarSrc = this.props.currentChat.avatar || avatarFallback

    return /* html */ `
      <div class="activeChat">
        <div class="chatHeader">
          <img src="${avatarSrc}" alt="Аватар чата" class="chatHeader__image">
          <h2 class="chatHeader__chatName">{{currentChat.title}}</h2>
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
