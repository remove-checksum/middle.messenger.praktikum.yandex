import { Block, PathRouter } from "../../core"
import "./link.css"

interface LinkContext {
  router: PathRouter
}
interface LinkProps {
  to: string
  text: string
  extraClass: string
}

export default class Link extends Block<LinkProps & LinkContext> {
  static blockName = "Link"

  constructor(props: LinkProps & LinkContext) {
    super({
      ...props,
      events: {
        click: () => {
          this.props.router.go(this.props.to)
        },
      },
    })
  }

  render() {
    return /* html */ `
      <button class="link {{extraClass}}">{{text}}</button>
    `
  }
}
