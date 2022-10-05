import { Block } from "../../core"
import "./chat.css"
import { ChatMeta } from "../../models/chatMeta"
import chatData from "./chat.json"

interface ChatPageProps {
  input: { name: string; type: string }
  chats: ChatMeta[]
}

export class ChatPage extends Block<ChatPageProps> {
  static blockName = "ChatPage"

  constructor(props: EmptyObject) {
    super({ ...props, chats: chatData })
  }

  render() {
    return /* html */ `
      {{#PageLayout}}
        <div class="chatWrapper">
        {{{ Chatlist chats=chats.chats }}}
        <section class="messagesColumn">
          <p class="messagesColumn__select-chat">Выберите чат и отправьте сообщение</p>
          {{{ ChatInputbox inputType=chats.input.type inputName=chats.input.name }}}
        </section>
        </div>
      {{/PageLayout}}
    `
  }
}
