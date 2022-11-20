import { PathRouter } from "../core"
import { BlockConstructable } from "../core/Block"

type RouterContext = { router: PathRouter }

export function withRouter<P extends RouterContext>(
  WrappedBlock: BlockConstructable<P>
) {
  // @ts-expect-error WrappedBlock has render()
  return class extends WrappedBlock {
    static blockName = WrappedBlock.blockName

    constructor(props: P) {
      const { router } = window.__internals
      super({ ...props, router })
    }
  }
}
