import { Block } from "../../core"
import "./chat.css"
import { Chat } from "../../services/api/Chats"
import { ChatActions } from "../../store/actions"
import { ModalVariant } from "../../components"
import { AppStore } from "../../store"
import { AppState } from "../../store/store"

interface ChatPageProps {
  store: AppStore
  currentChatId: number | null
  chats: Chat[]
  currentChat: Chat
}

interface ChatPageState {
  modalVariant: Nullable<ModalVariant>
  dispatchModal: (variant: ModalVariant) => void
  cancelModal: VoidFunction
  confirmModal: VoidFunction
  selectChat: (id: number) => void
}

export default class ChatPage extends Block<ChatPageState & ChatPageProps> {
  static blockName = "ChatPage"

  constructor(props: ChatPageProps) {
    super({
      chats: props.chats,
      currentChat: props.currentChat || null,
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
    })
  }

  componentDidMount(props: ChatPageState): void {
    // load chats and set first chat as selected
    this.props.store.dispatch(ChatActions.getAllChats)
  }

  openModal = (variant: ModalVariant) => {
    this.setProps({ modalVariant: variant })
  }

  closeModal = () => {
    this.setProps({ modalVariant: null })
  }

  sendMessage = (message: string) => {
    // send message
  }

  selectChat = (id: number) => {
    const selectedId = this.props.chats.find((chat) => chat.id === id)?.id

    this.props.store.dispatch({
      currentChatId: selectedId || null,
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
            {{#if currentChat }}
              <!-- {{{ ActiveChat
                chatName="coolChat"
                messages=currentChat.messages
                openModal=dispatchModal
              }}} -->
              <span style="max-width: 200px;">
                ${JSON.stringify(this.props.currentChat)}

              </span>


            {{else}}
              <div>no chat selected</div>
            {{/if}}

            {{{ ChatInputbox
              inputType=chats.input.type
              inputName=chats.input.name
              onMessage=sendMessage
              openModal=dispatchModal
            }}}
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
})
