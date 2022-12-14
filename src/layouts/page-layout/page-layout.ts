import { Block } from "../../core/Block"
import "./page-layout.css"

interface PageLayoutProps {
  page: Block
}

export class PageLayout extends Block<UnknownObject> {
  static blockName = "PageLayout"

  constructor(props: PageLayoutProps) {
    super({ ...props })
  }

  render(): string {
    return /* html */ `
        <main class="pageContent">
          <div data-slot="1"></div>
        </main>
    `
  }
}
