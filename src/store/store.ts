import { Loader } from "../components"
import { BlockConstructable, Store } from "../core"
import { Action, Dispatch } from "../core/Store"
import { Chat } from "../services/api/Chats"
import { User } from "../services/api/User"

export interface AppState {
  initialLoad: boolean
  loading: boolean
  errorReason: Nullable<string>
  page: BlockConstructable
  user: Nullable<User>
  currentChat: Nullable<{
    id: number
    token: string
    messages: Nullable<any>
  }>
  chats: Nullable<Chat[]>
}

export const initialAppState: AppState = {
  initialLoad: true,
  loading: false,
  errorReason: null,
  page: Loader,
  user: null,
  currentChat: null,
  chats: null,
}

export type AppStore = Store<AppState>
export type AppAction = Action<AppState>
export type AppDispatch = Dispatch<AppState>
