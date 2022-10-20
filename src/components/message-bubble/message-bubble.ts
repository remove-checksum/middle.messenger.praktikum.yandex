import { Block } from "../../core"
import "./message-bubble.css"

interface MessageBubbleProps {
  text?: string
  image?: string
  time: string
  own: boolean
}

const formatTime = (time: string) => {
  const date = new Date(time)
  const hours = date.getHours()
  const minutes = date.getMinutes()

  return `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`
}

export class MessageBubble extends Block<MessageBubbleProps> {
  static blockName = "MessageBubble"

  constructor(props: MessageBubbleProps) {
    super({ ...props, time: formatTime(props.time) })
  }

  render() {
    return /* html */ `
      <li class="messageBubble{{#if own}} messageBubble_own{{/if}}">
        {{#if text}}
          <p class="messageBubble__text">{{text}}</p>
        {{/if}}
        {{#if image}}
          <img src="{{image}}" alt="фотография в чате" class="messageBubble__image">
        {{/if}}
        <time class="messageBubble__time">{{time}}</time>
      </li>
    `
  }
}
