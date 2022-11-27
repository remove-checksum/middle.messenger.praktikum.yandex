import { Block } from "../../core"
import { Chat } from "../../services/api/Chats"
import { ChatActions } from "../../store/actions"
import { AppStore } from "../../store"
import { AppDispatch, AppState } from "../../store/store"
import { Message, MessageActions } from "../../store/actions/Message"
import { User } from "../../services/api/User"
import { ModalDispatch, ModalSpec } from "../../components/modal/modal"
import "./chat.css"

interface ChatPageProps {
  store: AppStore
  currentChatId: number | null
  chats: Chat[]
  currentChat: Chat | null
  user: User
  socket: WebSocket
  messages: Message[]
}

interface ChatPageState {
  modalSpec: ModalSpec | null
  currentChat: Chat | null
  setModal: ModalDispatch
  selectChat: (id: number) => void
  sendMessage: (message: string) => void
  createChat: (title: string) => void
  appDispatch: AppDispatch
}

export default class ChatPage extends Block<ChatPageState & ChatPageProps> {
  static blockName = "ChatPage"

  constructor(props: ChatPageProps) {
    super({
      currentChat: props.currentChat,
      currentChatId: props.currentChatId,
      messages: props.messages,
      socket: props.socket,
      user: props.user,
      chats: props.chats,
      store: props.store,
      modalSpec: null,
      appDispatch: props.store.dispatch,
      setModal: (spec) => this.setProps({ modalSpec: spec }),
      selectChat: (id) => this.selectChat(id),
      sendMessage: (msg) => this.sendMessage(msg),
      createChat: (title) => this.createChat(title),
    })
  }

  componentDidMount(): void {
    this.props.store.dispatch(ChatActions.getAllChats)
  }

  createChat = (title: string) => {
    this.props.store.dispatch(ChatActions.createChat, { title })
  }

  deleteChat = (chatId: number) => {
    this.props.store.dispatch(ChatActions.deleteChat, { chatId })
  }

  setModal = (spec: ModalSpec) => {
    this.setProps({ modalSpec: spec })
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
            openModal=setModal
            createChat=createChat
          }}}
          <section class="messagesColumn">
            {{#if currentChatId }}
              {{{ ActiveChat
                currentChat=currentChat
                currentUserId=user.id
                messages=messages
                openModal=setModal
                appDispatch=store.dispatch
              }}}
              {{{ ChatInputbox
                inputType=chats.input.type
                inputName=chats.input.name
                onMessage=sendMessage
                openModal=setModal
              }}}
            {{else}}
              <p class="messagesColumn__no-chat">Выберите чат и отправьте сообщение</p>
            {{/if}}
          </section>
        </div>
        {{#if modalSpec }}
          {{{ Modal spec=modalSpec }}}
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
