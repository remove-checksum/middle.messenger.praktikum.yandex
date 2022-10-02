import { Block } from "../../core"
import "./page.css"

interface LayoutProps {
  page: Block
}

export class Page extends Block<LayoutProps> {
  constructor(props: LayoutProps) {
    super({ ...props, events: { click: () => console.log("sos") } })
  }

  render(): string {
    return /*html*/ `
        <main class="page-content">
          {{{ Button text="hello bowl" onClick=onClick }}}
        </main>
    `
  }
}
