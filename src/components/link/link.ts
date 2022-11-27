import { Block, PathRouter } from "../../core"
import { withRouter } from "../../hoc/withRouter"
import "./link.css"

interface LinkContext {
  router: PathRouter
}
interface LinkProps {
  to: string
  text: string
  extraClass: string
}

export class Link extends Block<LinkProps & LinkContext> {
  static blockName = "Link"

  constructor(props: LinkProps & LinkContext) {
    super({
      ...props,
      events: {
        click: () => {
          console.log(`going to ${this.props.to}`)
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

export default withRouter(Link)
