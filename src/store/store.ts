import { Store } from "../core"
import { Action, Dispatch } from "../core/Store"
import { User } from "../services/api/User"
import { Chat } from "../services/api/Chats"
import { Page } from "../router/pages"
import { Message } from "./actions/Message"

export interface AppState {
  appIsInited: boolean
  loading: boolean
  page: Page | null
  user: User | null
  currentChatId: number | null
  currentChat: Chat | null
  chats: Chat[]
  messages: Message[]
  socket: WebSocket | null
  errors: {
    signIn: string | null
    signUp: string | null
    getUser: string | null
    chatAddUser: string | null
    chatDeleteUser: string | null
    chatCreate: string | null
    chatAddFile: string | null
    userChangePublicInfo: string | null
    userChangePassword: string | null
    userChangeAvatar: string | null
  }
}

export const initialAppState: AppState = {
  appIsInited: false,
  loading: false,
  page: null,
  user: null,
  currentChat: null,
  currentChatId: null,
  chats: [],
  messages: [],
  socket: null,
  errors: {
    signIn: null,
    signUp: null,
    getUser: null,
    chatAddUser: null,
    chatDeleteUser: null,
    chatCreate: null,
    chatAddFile: null,
    userChangeAvatar: null,
    userChangePassword: null,
    userChangePublicInfo: null,
  },
}

export type AppStore = Store<AppState>
export type AppAction = Action<AppState>
export type AppDispatch = Dispatch<AppState>
