import { PathRouter } from "../src/core"
import { AppStore } from "../src/store/store"

declare global {
  export type Nullable<T> = T | null

  export type Keys<T extends Record<string, unknown>> = keyof T
  export type Values<T extends Record<string, unknown>> = T[keyof T]
  export type StringKeys<M> = Extract<keyof M, string>

  export type UnknownObject = Record<string, unknown>
  export type AnyObject = Record<string, any>
  export type Indexed<T = unknown> = { [key in string]: T }

  interface Window {
    __internals: {
      store: AppStore
      router: PathRouter
    }
  }
}

export {}
