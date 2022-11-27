import { AppState, AppStore } from "../store/store"
import { BlockConstructable, BlockProps } from "../core/Block"
import { StoreEvents } from "../core"

export type StoreContext = { store: AppStore }

type StateMapper = (state: AppState) => AnyObject

export function withStore(
  mapStateToProps: StateMapper,
  WrappedBlock: BlockConstructable
) {
  // @ts-expect-error WrappedBlock implements render()
  return class BlockWithStore<
    P extends BlockProps & StoreContext
  > extends WrappedBlock {
    static blockName = WrappedBlock.blockName

    constructor(props: P) {
      super({
        ...props,
        store: window.__internals.store,
      })
    }

    private onStoreChange = () => {
      this.setProps(mapStateToProps(this.props.store.getState()) as P)
    }

    componentDidMount(props: P): void {
      super.componentDidMount(props)
      this.props.store.on(StoreEvents.Updated, this.onStoreChange)
    }

    componentWillUnmount(props: P): void {
      super.componentWillUnmount(props)
      this.props.store.off(StoreEvents.Updated, this.onStoreChange)
    }
  }
}
