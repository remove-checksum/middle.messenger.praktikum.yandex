import { Block } from "../../core/Block"
import { formatUTC } from "../../helpers/formatUTC"
import { Chat } from "../../services/api/Chats"
import avatarFallback from "../../assets/avatar_not_found.png"
import "./chatlist-item.css"

interface ChatlistItemProps {
  chat: Chat
  selectedChatId: number
  onChatSelect: (chatId: number) => void
}

interface ChatlistItemState {
  id: number
  chatName: string
  unreadCount?: number
  lastTime: string
  lastMessage: string
  selected: boolean
  avatarSrc: string
}

export default class ChatlistItem extends Block<ChatlistItemState> {
  static blockName = "ChatlistItem"

  constructor(props: ChatlistItemProps) {
    const displayLastTime = props.chat.lastMessage
      ? formatUTC(props.chat.lastMessage.time)
      : ""

    const isSelected = props.selectedChatId
      ? props.chat.id === props.selectedChatId
      : false

    super({
      id: props.chat.id,
      selected: isSelected,
      chatName: props.chat.title,
      unreadCount: props.chat.unreadCount,
      lastTime: displayLastTime,
      lastMessage: props.chat?.lastMessage?.content || "В чате нет сообщений",
      avatarSrc: props.chat.avatar || avatarFallback,
      events: {
        click: () => {
          props.onChatSelect(this.props.id)
        },
      },
    })
  }

  render() {
    return /* html */ `
      <div class="chatlistItem {{#if selected}}chatlistItem_selected{{/if}}">
        <img class="chatlistItem__avatar" src="{{avatarSrc}}" alt="Аватар пользователя">
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
