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
      const { router } =
        window.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
      super({ ...props, router })
    }
  }
}
