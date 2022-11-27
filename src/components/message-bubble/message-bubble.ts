import { Block } from "../../core"
import { formatUTC } from "../../helpers/formatUTC"
import "./message-bubble.css"

interface MessageBubbleProps {
  text?: string
  image?: string
  time: string
  own: boolean
}

export class MessageBubble extends Block<MessageBubbleProps> {
  static blockName = "MessageBubble"

  constructor(props: MessageBubbleProps) {
    super({ ...props, time: formatUTC(props.time) })
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
