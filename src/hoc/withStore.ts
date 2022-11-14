import { AppState, AppStore } from "../store/store"
import { BlockProps } from "../core/Block"
import { StoreEvents, Block } from "../core"
import { getGlobalStore } from "../helpers"

export type StoreContext = { store: AppStore }
type StateMapper = (state: AppState) => UnknownObject

export function withStore(mapStateToProps: StateMapper) {
  return function withPreviousState(WrappedBlock: typeof Block) {
    const store = getGlobalStore()

    const previousState = mapStateToProps(store.getState())

    // @ts-expect-error WrappedBlock has render()
    return class BlockWithStore<
      P extends BlockProps & StoreContext
    > extends WrappedBlock<P> {
      static blockName = WrappedBlock.blockName

      constructor(props: P) {
        super({
          ...props,
          ...previousState,
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
}
