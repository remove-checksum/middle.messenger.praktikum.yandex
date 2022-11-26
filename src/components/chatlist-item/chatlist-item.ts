import { Block } from "../../core"
import "./chatlist-item.css"

interface MessagePreview {
  chat_name: string
  last_time: string
  unread: number
  last_message: string
}

interface ChatlistItemProps {
  chatMeta: MessagePreview
}

export class ChatlistItem extends Block<ChatlistItemProps> {
  static blockName = "ChatlistItem"

  render() {
    return /* html */ `
      <div class="chatlistItem">
        <div class="chatlistItem__avatar"></div>
        <div class="chatlistItem__midsection">
          <h3 class="chatlistItem__chat-name">{{chatMeta.chat_name}}</h3>
          <p class="chatlistItem__last-message">{{chatMeta.last_message}}</p>
        </div>
        <div class="chatlistItem__metadata">
          <time class="chatlistItem__time">{{chatMeta.last_time}}</time>
          {{#if chatMeta.unread}}
            <div class="chatlistItem__badge">
              <span class="chatlistItem__unread">
                {{chatMeta.unread}}
              </span>
            </div>
          {{/if}}
        </div>
      </div>
    `
  }
}
