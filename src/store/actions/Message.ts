import { AppAction } from "../store"
import { WS_URL } from "../../config"
import { SocketEvents, WSTransport } from "../../core/WSTransport"
import { ChatsService } from "../../services/api"
import { Transformer } from "../../services/api/transformers"

type WSCredentials = {
  chatId: number
  userId: number
  token: string
}

export type Message = {
  chatId: number
  time: string
  type: string
  userId: number
  content: string
  file: Nullable<{
    id: number
    userId: number
    path: string
    filename: string
    contentType: string
    uploadDate: string
  }>
}

const toSocketURL = (credentials: WSCredentials) =>
  `${WS_URL}${credentials.userId}/${credentials.chatId}/${credentials.token}`

type ConnectToChatPayload = {
  chatId: number
  userId: number
}

const connectToChat: AppAction = async (
  dispatch,
  state,
  payload: ConnectToChatPayload
) => {
  try {
    if (state.socket) {
      console.log("cleanup")

      state.socket.close()
    }

    const { token } = await ChatsService.getMessageServerToken(payload.chatId)

    const userId = state.user?.id
    const socket = new WebSocket(
      toSocketURL({ userId, chatId: payload.chatId, token })
    )

    socket.onopen = () => {
      console.log("socket opened")
      dispatch({ socket })

      socket.send(
        JSON.stringify({
          type: "get old",
          content: "0",
        })
      )
    }

    socket.onclose = (e: CloseEvent) => {
      if (e.wasClean) {
        console.log("socket gracefully closed")
      } else {
        console.log("socket abruptly closed")
      }
    }

    socket.onmessage = (e: MessageEvent) => {
      const data = JSON.parse(e.data)

      // old messages, replace state
      if (Array.isArray(data)) {
        dispatch({ messages: [...data.map(Transformer.toMessage)] })
      } else {
        dispatch({ messages: [...state.messages, Transformer.toMessage(data)] })
      }

      console.log(data)
    }

    const currentChat = JSON.parse(
      JSON.stringify(state.chats.find((chat) => chat.id === payload.chatId))
    )

    dispatch({ currentChat, currentChatId: payload.chatId, socket })
  } catch (error) {
    console.error(error)
  }
}

type SendMessagePayload = { message: string }

const sendMessage: AppAction = (_, store, payload: SendMessagePayload) => {
  if (store.socket) {
    store.socket.send(
      JSON.stringify({
        type: "message",
        content: payload.message,
      })
    )
  }
}

export const MessageActions = {
  sendMessage,
  connectToChat,
}
