import { Block } from "../../core"
import { Chat } from "../../services/api/Chats"
import { ChatActions } from "../../store/actions"
import { ModalVariant } from "../../components"
import { AppStore } from "../../store"
import { AppState } from "../../store/store"
import { Message, MessageActions } from "../../store/actions/Message"
import { User } from "../../services/api/User"
import { WSTransport } from "../../core/WSTransport"
import "./chat.css"

interface ChatPageProps {
  store: AppStore
  currentChatId: number | null
  chats: Chat[]
  currentChat: Chat | null
  user: User
  socket: WSTransport
  messages: Message[]
}

interface ChatPageState {
  modalVariant: Nullable<ModalVariant>
  dispatchModal: (variant: ModalVariant) => void
  cancelModal: VoidFunction
  confirmModal: VoidFunction
  selectChat: (id: number) => void
  sendMessage: (message: string) => void
  currentChat: Chat | null
}

export default class ChatPage extends Block<ChatPageState & ChatPageProps> {
  static blockName = "ChatPage"

  constructor(props: ChatPageProps) {
    super({
      currentChat: props.currentChat,
      messages: props.messages,
      socket: props.socket,
      user: props.user,
      chats: props.chats,
      store: props.store,
      modalVariant: null,
      dispatchModal: (variant: ModalVariant) => {
        this.setProps({ modalVariant: variant })
      },
      cancelModal: () => {
        this.closeModal()
      },
      confirmModal: () => {
        console.log("confirm goes here")
        this.closeModal()
      },
      selectChat: (id: number) => {
        this.selectChat(id)
      },
      currentChatId: props.currentChatId,
      sendMessage: (message: string) => {
        this.sendMessage(message)
      },
    })
  }

  componentDidMount(): void {
    this.props.store.dispatch(ChatActions.getAllChats)
  }

  openModal = (variant: ModalVariant) => {
    this.setProps({ modalVariant: variant })
  }

  closeModal = () => {
    this.setProps({ modalVariant: null })
  }

  sendMessage = (message: string) => {
    if (this.props.socket) {
      this.props.store.dispatch(MessageActions.sendMessage, { message })
    }
  }

  selectChat = (id: number) => {
    const selectedId = this.props.chats.find((chat) => chat.id === id)?.id

    if (!selectedId) {
      return
    }

    this.props.store.dispatch(MessageActions.connectToChat, {
      chatId: selectedId,
      userId: this.props.user.id,
    })
  }

  render() {
    return /* html */ `
      {{#PageLayout}}
        <div class="chatWrapper">
          {{{ Chatlist
            chats=chats
            currentChatId=currentChatId
            selectChat=selectChat
          }}}
          <section class="messagesColumn">
            {{#if currentChatId }}
              {{{ ActiveChat
                currentChat=currentChat
                currentUserId=user.id
                messages=messages
                openModal=dispatchModal
              }}}
              {{{ ChatInputbox
                inputType=chats.input.type
                inputName=chats.input.name
                onMessage=sendMessage
                openModal=dispatchModal
              }}}
            {{else}}
              <p class="messagesColumn__no-chat">Выберите чат и отправьте сообщение</p>
            {{/if}}
          </section>
        </div>
        {{#if modalVariant }}
          {{{ Modal
            variant=modalVariant
            cancel=closeModal
            confirm=confirmModal
          }}}
        {{/if}}
      {{/PageLayout}}
    `
  }
}

export const mapChatPageProps = (state: AppState) => ({
  chats: state.chats,
  currentChatId: state.currentChatId,
  currentChat: state.currentChat,
  messages: state.messages,
  user: state.user,
  socket: state.socket,
})
