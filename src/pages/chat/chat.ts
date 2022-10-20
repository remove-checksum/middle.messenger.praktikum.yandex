import { Block } from "../../core"
import "./chat.css"
import { ChatMeta } from "../../models/chatMeta"
import chatData from "./chat.json"

// @ts-expect-error parcel import url resolution mechanism
const cameraImage = new URL("../../assets/camera_msg.jpg", import.meta.url)
const now = new Date()

const messages = [
  {
    text: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.

  Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`,
    time: now.toISOString(),
    own: false,
  },
  {
    image: cameraImage.href,
    time: now.toISOString(),
    own: false,
  },
  {
    text: "Круто!",
    time: now.toISOString(),
    own: true,
  },
]

interface ChatPageProps {
  input: { name: string; type: string }
  chats: ChatMeta[]
  openedChat: {
    messages: AnyObject[]
  }
}

export class ChatPage extends Block<ChatPageProps> {
  static blockName = "ChatPage"

  constructor(props: EmptyObject) {
    // @ts-expect-error 'ChatPageProps is parsed json but expected to have array methods'
    super({ ...props, chats: chatData, openedChat: { messages } })
  }

  render() {
    return /* html */ `
      {{#PageLayout}}
        <div class="chatWrapper">
          {{{ Chatlist chats=chats.chats }}}
          <section class="messagesColumn">
            {{{ ActiveChat chatName="coolChat" messages=openedChat.messages }}}
            {{{ ChatInputbox inputType=chats.input.type inputName=chats.input.name }}}
          </section>
        </div>
      {{/PageLayout}}
    `
  }
}
