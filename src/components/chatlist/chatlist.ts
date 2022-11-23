import { Block } from "../../core"
import { Page } from "../../router/pages"
import { Chat } from "../../services/api/Chats"
import "./chatlist.css"

interface ChatlistProps {
  chats: Chat[]
  currentChat: Chat
  goProfile: VoidFunction
  selectChat: (id: number) => void
  currentChatId: number | null
}

interface ChatlistState {
  selectedChatId: number | null
  chats: Chat[]
  selectChat: (id: number) => void
  goProfile: VoidFunction
}

export class Chatlist extends Block<ChatlistState> {
  static blockName = "Chatlist"

  constructor(props: ChatlistProps) {
    super({
      chats: props.chats,
      selectedChatId: props.currentChatId,
      selectChat: (id) => {
        props.selectChat(id)
      },
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
          {{{ ChatlistItem
            chat=chat
            selectedChatId=@root.selectedChatId
            onChatSelect=@root.selectChat
          }}}
        {{/each}}
      </aside>
    `
  }
}
