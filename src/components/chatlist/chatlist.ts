import { Block } from "../../core"
import { Page } from "../../router/pages"
import { Chat } from "../../services/api/Chats"
import { ControlledInput } from "../controlled-input/controlled-input"
import { ModalDispatch } from "../modal/modal"
import "./chatlist.css"

interface ChatlistProps {
  chats: Chat[]
  currentChat: Chat
  goProfile: VoidFunction
  selectChat: (id: number) => void
  currentChatId: number | null
  openModal: ModalDispatch
  createChat: (title: string) => void
}

interface ChatlistState {
  selectedChatId: number | null
  chats: Chat[]
  selectChat: (id: number) => void
  goProfile: VoidFunction
  setModal: ModalDispatch
  createChat: (title: string) => void
}

export class Chatlist extends Block<ChatlistState> {
  static blockName = "Chatlist"

  constructor(props: ChatlistProps) {
    super({
      createChat: props.createChat,
      setModal: props.openModal,
      chats: props.chats,
      selectedChatId: props.currentChatId,
      selectChat: (id) => {
        props.selectChat(id)
      },
      goProfile: () => {
        window.__internals.router.go(Page.Profile)
      },
      events: {
        click: (e) => {
          if (
            e.target instanceof HTMLButtonElement &&
            e.target.classList.contains("controlsBox__addChatButton")
          ) {
            this.activateAddChatModal()
          }
        },
      },
    })
  }

  activateAddChatModal = () => {
    const block = new ControlledInput({
      placeholder: "Введите имя чата",
      hasLabel: false,
      name: "addChat",
      type: "text",
      dontValidate: true,
    })

    this.props.setModal({
      title: "Добавьте чат",
      content: block,
      buttonText: "Добавить",
      cancel: () => {
        this.props.setModal(null)
      },
      confirm: () => {
        this.props.createChat(block.getInputValue())
        block.setInputValue("")
        this.props.setModal(null)
      },
    })
  }

  render() {
    return /* html */ `
      <aside class="chatlist">
        <div class="controlsBox">
          <div class="controlsBox__buttons">
            <button class="controlsBox__addChatButton">
              <i class="ph-list-plus"></i>
            </button>
            {{{ Button
              text="Профиль"
              kind="secondary"
              extraClass="controlsBox__button"
              onClick=goProfile
            }}}
          </div>
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
