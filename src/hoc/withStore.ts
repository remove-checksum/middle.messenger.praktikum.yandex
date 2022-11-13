import { AppState, AppStore } from "../store/store"
import { BlockProps } from "../core/Block"
import { StoreEvents, Block } from "../core"

export type StoreContext = { store: AppStore }
type StateMapper = (state: AppState) => Partial<AppState>

export function withStore<S extends StoreContext>(
  WrappedBlock: typeof Block,
  mapStateToProps: StateMapper
) {
  type WrappedProps = typeof WrappedBlock extends typeof Block<
    infer P & AnyObject & BlockProps
  >
    ? P & StoreContext
    : S

  // @ts-expect-error WrappedBlock has render()
  return class BlockWithStore<P extends WrappedProps> extends WrappedBlock<P> {
    static blockName = WrappedBlock.blockName

    constructor(props: P) {
      const { store } =
        window.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED

      super({ ...props, store, ...mapStateToProps(store.getState()) })
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
