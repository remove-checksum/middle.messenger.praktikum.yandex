import { debounce } from "./debounce"

type OnSetCb = (newProps: EmptyObject) => void

export const addProxyHandler = (object: EmptyObject, onSet: OnSetCb) => {
  const debouncedOnSet = debounce(onSet, 0)

  return new Proxy(object, {
    get(target: EmptyObject, prop: string) {
      const value = Reflect.get(target, prop)
      return typeof value === "function" ? value.bind(target) : value
    },
    deleteProperty() {
      throw new Error("Нет доступа")
    },
    set: (target: EmptyObject, prop: string, value: unknown) => {
      Reflect.set(target, prop, value)

      debouncedOnSet(target)
      return true
    },
  })
}
