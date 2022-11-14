import { ItemMessage } from "../components/message-bubble/message-bubble"
import { Store } from "../core"
import { Action, Dispatch } from "../core/Store"
import { WSTransport } from "../core/WSTransport"
import { ChatUserDto } from "../services/api/dto"
import { User } from "../services/api/User"
import { Chat } from "../services/api/Chats"
import { Page } from "../pages"

export interface AppState {
  appIsInited: boolean
  loading: boolean
  page: Page | null
  user: User | null
  currentChat: Nullable<{
    id: number
    token: string
    chatUsers: ChatUserDto[]
    messages: ItemMessage
    socket: WSTransport
  }>
  chats: Chat[] | null
  errors: {
    signIn: string | null
    signUp: string | null
    getUser: string | null
    chatAddUser: string | null
    chatDeleteUser: string | null
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
  chats: null,
  errors: {
    signIn: null,
    signUp: null,
    getUser: null,
    chatAddUser: null,
    chatDeleteUser: null,
    chatAddFile: null,
    userChangeAvatar: null,
    userChangePassword: null,
    userChangePublicInfo: null,
  },
}

export type AppStore = Store<AppState>
export type AppAction = Action<AppState>
export type AppDispatch = Dispatch<AppState>
