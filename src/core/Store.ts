import { EventBus } from "./EventBus"
import { mergeDeep } from "../helpers/mergeDeep"

export type Dispatch<S> = (
  nextStateOrAction: Partial<S> | Action<S>,
  payload?: AnyObject
) => void

export type Action<S> = (dispatch: Dispatch<S>, state: S, payload: any) => void

export const StoreEvents = {
  Inited: "STORE_INITIALISED",
  Updated: "STORE_UPDATED",
  Destroyed: "STORE_DESTROYED",
} as const

export class Store<S extends AnyObject> extends EventBus<
  Values<typeof StoreEvents>
> {
  private state = {} as S

  constructor(initialState: S) {
    super()

    this.state = initialState
    this.set(initialState)
    this.dispatch = this.dispatch.bind(this)
  }

  public set(newState: Partial<S>) {
    const prevState = { ...this.state }

    this.state = mergeDeep(this.state, newState) as S

    this.emit(StoreEvents.Updated, prevState, this.state)
  }

  public dispatch(
    updateOrAction: Partial<S> | Action<S>,
    payload: AnyObject = {}
  ) {
    if (typeof updateOrAction === "function") {
      updateOrAction(this.dispatch, this.state, payload)
    } else {
      this.set(updateOrAction)
    }
  }

  public getState() {
    return this.state
  }
}
