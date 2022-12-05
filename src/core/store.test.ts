import { sleep } from "../helpers/sleep"
import { Action, Store, StoreEvents } from "./Store"

describe("Store", () => {
  it("should set state", () => {
    const store = new Store({})

    store.set({ userId: 123 })

    expect(store.getState()).toEqual({ userId: 123 })
  })

  it("should notify subscribers on change", () => {
    const store = new Store({ userId: 32 })
    const storeSpy = jest.fn()

    store.on(StoreEvents.Updated, storeSpy)

    store.set({ userId: 42 })

    expect(storeSpy).toBeCalledWith({ userId: 32 }, { userId: 42 })
  })

  it("should set state on dispatch with object", () => {
    const store = new Store({})
    const storeSpy = jest.fn()

    store.on(StoreEvents.Updated, storeSpy)

    store.dispatch({ test: "test" })
    expect(storeSpy).toBeCalledWith({}, { test: "test" })
  })

  it("should run action on dispatch with function", async () => {
    const store = new Store({})
    const storeSpy = jest.fn()

    const mockAction: Action<{ test: string }> = async (dispatch) => {
      dispatch({ test: "test" })

      await sleep()

      dispatch({ test: "newTest" })
    }

    store.on(StoreEvents.Updated, storeSpy)

    store.dispatch(mockAction)

    await sleep(400)

    expect(storeSpy).toBeCalledWith({ test: "test" }, { test: "newTest" })
    expect(store.getState()).toEqual({ test: "newTest" })
  })
})
