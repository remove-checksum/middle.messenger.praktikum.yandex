import { Block } from "../../core"
import "./chat-inputbox.css"

interface ChatInputboxProps {
  inputType: string
  inputName: string
}

export class ChatInputbox extends Block<ChatInputboxProps> {
  static blockName = "ChatInputbox"

  render() {
    return /* html */ `
      <form action="#" class="chatInputboxForm">
        {{{ ChatAdditionsPopup }}}
        {{{ ControlledInput
          name=inputName
          hasLabel=false
          extraClass="chatInputboxForm__input"
          type=chatInputType
          placeholder="Введите сообщение"
        }}}
        <button class="chatInputboxForm__button">
          <i class="ph-paper-plane-right chatInputboxForm__icon"></i>
        </button>
      </form>
    `
  }
}
