import { Block } from "../../core"
import "./active-chat.css"

// @ts-expect-error parcel import url resolution mechanism
const catPictureUrl = new URL("../../assets/catpix.jpeg", import.meta.url)

interface ActiveChatProps {
  chatName: string
  image?: string
  messages: AnyObject
}

export class ActiveChat extends Block<ActiveChatProps> {
  static blockName = "ActiveChat"

  constructor(props: ActiveChatProps) {
    super({
      ...props,
      image: catPictureUrl.href,
    })
  }

  render(): string {
    return /* html */ `
      <div class="activeChat">
        <div class="chatHeader">
          <img  src="{{image}}" alt="фото профиля" class="chatHeader__image">
          <h2 class="chatHeader__chatName">{{chatName}}</h2>
          {{{ ChatActionsPopup }}}
        </div>
        <ol class="activeChat__messages">
          {{#each messages as |message| }}
            {{{ MessageBubble
              text=message.text
              image=message.image
              time=message.time
              own=message.own
            }}}
          {{/each}}
        </ol>
      </div>
    `
  }
}
