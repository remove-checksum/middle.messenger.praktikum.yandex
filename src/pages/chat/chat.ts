import { Block } from "../../core"
import "./chat.css"
import { ChatMeta } from "../../models/chatMeta"
import chatData from "./chat.json"
import { ModalMode } from "../../components"

// @ts-expect-error parcel import url resolution mechanism
const cameraImage = new URL("../../assets/camera_msg.jpg", import.meta.url)
const now = new Date().toISOString()

const messages = [
  {
    text: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.

  Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`,
    time: now,
    own: false,
  },
  {
    image: cameraImage.href,
    time: now,
    own: false,
  },
  {
    text: "Круто!",
    time: now,
    own: true,
  },
]

interface ChatPageState {
  chats: ChatMeta[]
  modalMode: Nullable<ModalMode>
  closeModal: VoidFunction
  openModal: (mode: ModalMode) => void
  openedChat: {
    messages: AnyObject[]
  }
}

export class ChatPage extends Block<ChatPageState> {
  static blockName = "ChatPage"

  constructor() {
    super({
      chats: chatData as unknown as ChatMeta[],
      openedChat: { messages },
      modalMode: null,
      closeModal: () => {
        this.setProps({ modalMode: null })
      },
      openModal: (mode: ModalMode) => {
        this.setProps({ modalMode: mode })
      },
    })
  }

  render() {
    return /* html */ `
      {{#PageLayout}}
        <div class="chatWrapper">
          {{{ Chatlist chats=chats.chats }}}
          <section class="messagesColumn">
            {{{ ActiveChat
              chatName="coolChat"
              messages=openedChat.messages
              openModal=openModal
            }}}
            {{{ ChatInputbox inputType=chats.input.type inputName=chats.input.name }}}
          </section>
        </div>
        {{#if modalMode }}
          {{{ Modal mode=modalMode onCancel=closeModal }}}
        {{/if}}
      {{/PageLayout}}
    `
  }
}
