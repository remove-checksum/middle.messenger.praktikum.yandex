import { Block } from "../../core"
import { formatUTC } from "../../helpers/formatUTC"
import { Chat } from "../../services/api/Chats"
import "./chatlist-item.css"

interface ChatlistItemProps {
  chatMeta: Chat
}

interface ChatlistItemState {
  chatName: string
  unreadCount: number
  lastTime: string
  lastMessage: string
}

export class ChatlistItem extends Block<ChatlistItemState> {
  static blockName = "ChatlistItem"

  constructor(props: ChatlistItemProps) {
    const displayLastTime = props.chatMeta.last_message
      ? formatUTC(props.chatMeta.last_message.time)
      : ""

    super({
      chatName: props.chatMeta.title,
      unreadCount: props.chatMeta.unread_count,
      lastTime: displayLastTime,
      lastMessage:
        props.chatMeta.last_message?.content || "В чате нет сообщений",
    })
  }

  render() {
    return /* html */ `
      <div class="chatlistItem">
        <div class="chatlistItem__avatar"></div>
        <div class="chatlistItem__midsection">
          <h3 class="chatlistItem__chat-name">{{chatName}}</h3>
          <p class="chatlistItem__last-message">{{lastMessage}}</p>
        </div>
        <div class="chatlistItem__metadata">
          <time class="chatlistItem__time">{{lastTime}}</time>
          {{#if unreadCount}}
            <div class="chatlistItem__badge">
              <span class="chatlistItem__unread">
                {{unreadCount}}
              </span>
            </div>
          {{/if}}
        </div>
      </div>
    `
  }
}
