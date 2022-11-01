import { Block } from "../../core"
import "./chat-popup-item.css"

type PHIconName<N extends string = string> = `ph-${N}`

export interface ChatPopupItemProps {
  icon: PHIconName
  text: string
  action: VoidFunction
}

export class ChatPopupItem extends Block<ChatPopupItemProps> {
  static blockName = "ChatPopupItem"

  constructor(props) {
    super({
      ...props,
      events: { click: props.action },
    })
  }

  render() {
    return /* html */ `
      <li class="chatPopupItem">
        <i class="{{icon}} chatPopupItem__icon"></i><span>{{text}}</span>
      </li>
    `
  }
}
