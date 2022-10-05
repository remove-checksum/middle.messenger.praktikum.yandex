import { Block } from "../../core"
import { ChatMeta } from "../../models/chatMeta"
import "./chatlist.css"

interface ChatlistProps {
  chats: ChatMeta[]
  goProfile: VoidFunction
}

interface IncomingChatlistProps {
  chats: ChatMeta[]
}

export class Chatlist extends Block<ChatlistProps> {
  static blockName = "Chatlist"

  constructor(props: IncomingChatlistProps) {
    super({
      ...props,
      goProfile: () => {
        window.location.hash = "#profile"
      },
    })
  }

  render() {
    return /* html */ `
      <aside class="chatlist">
        <div class="controlsBox">
          {{{ Button text="Профиль"
            kind="secondary"
            extraClass="controlsBox__button"
            onClick=goProfile
          }}}
          {{{ ControlledInput placeholder="Поиск" }}}
        </div>
        {{#each chats}}
          {{{ChatlistItem chatMeta=this }}}
        {{/each}}
      </aside>
    `
  }
}
