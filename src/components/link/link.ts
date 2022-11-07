import { Block } from "../../core"
import "./link.css"

interface LinkProps {
  router: boolean
  to: string
  text: string
  extraClass: string
}

export class Link extends Block<LinkProps> {
  static blockName = "Link"

  constructor(props: LinkProps) {
    const innerProps = props.router
      ? {
          ...props,
          events: {
            click: (e: MouseEvent) => {
              router.go(props.to)
            },
          },
        }
      : props

    super(innerProps)
  }

  render() {
    return /* html */ `
      {{#if router}}
        <button class="link {{extraClass}}">{{text}}</button>
      {{else}}
        <a href="{{to}}" class="link {{extraClass}}">{{text}}</a>
      {{/if}}
    `
  }
}
