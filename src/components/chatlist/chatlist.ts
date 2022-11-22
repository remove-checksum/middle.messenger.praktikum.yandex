import { Block } from "../../core"
import { Page } from "../../router/pages"
import { Chat } from "../../services/api/Chats"
import "./chatlist.css"

interface ChatlistProps {
  chats: Chat[]
  goProfile: VoidFunction
}

export class Chatlist extends Block<ChatlistProps> {
  static blockName = "Chatlist"

  constructor(props: ChatlistProps) {
    super({
      ...props,
      goProfile: () => {
        window.__internals.router.go(Page.Profile)
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
        {{#each chats as |chat| }}
          {{{ChatlistItem chatMeta=chat }}}
        {{/each}}
      </aside>
    `
  }
}
