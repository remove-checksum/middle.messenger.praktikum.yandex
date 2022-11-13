import { ChatsService } from "../services/api"
import { AppAction } from "../store/store"
import { isBadRequest } from "./common"
import { ResponseTransformer } from "../services/api/transformers"
import { ChatDto, ChatTokenDto } from "../services/api/dto"

const getChats: AppAction = async (dispatch) => {
  dispatch({ loading: true })

  const chatsResponse = await ChatsService.getAllChats()

  if (isBadRequest(dispatch, chatsResponse)) {
    return
  }

  dispatch({
    chats: ResponseTransformer.GetChats(chatsResponse as ChatDto[]),
    loading: false,
  })
}

const createChat: AppAction = async (
  dispatch,
  state,
  payload: { title: string }
) => {
  dispatch({ loading: true })
  const createChatResponse = await ChatsService.createChat(payload.title)

  if (isBadRequest(dispatch, createChatResponse)) {
    return
  }

  await getChats(dispatch, state, payload)

  dispatch({ loading: false })
}

const deleteChat: AppAction = async (
  dispatch,
  state,
  payload: { chatId: number }
) => {
  dispatch({ loading: true })
  const deleteChatResponse = await ChatsService.deleteChat(payload.chatId)

  if (isBadRequest(dispatch, deleteChatResponse)) {
    return
  }

  console.log(`deleted chat ${deleteChatResponse}`)

  await getChats(dispatch, state, payload)

  dispatch({ loading: false })
}

const addUserToChat: AppAction = async (
  dispatch,
  state,
  payload: { userId: number; chatId: number }
) => {
  dispatch({ loading: true })
  const addUserResponse = await ChatsService.addUsersToChat(
    [payload.userId],
    payload.chatId
  )

  if (isBadRequest(dispatch, addUserResponse)) {
    return
  }

  await getChats(dispatch, state, payload)

  dispatch({ loading: false })
}

const removeUserFromChat: AppAction = async (
  dispatch,
  state,
  payload: { userId: number; chatId: number }
) => {
  dispatch({ loading: true })
  const removeUserResponse = await ChatsService.removeUsersFromChat(
    [payload.userId],
    payload.chatId
  )

  if (isBadRequest(dispatch, removeUserResponse)) {
    return
  }

  await getChats(dispatch, state, payload)

  dispatch({ loading: false })
}

const getChatMessageToken: AppAction = async (
  dispatch,
  state,
  payload: { chatId: number }
) => {
  dispatch({ loading: true })
  const getChatTokenResponse = await ChatsService.getMessageServerToken(
    payload.chatId
  )

  if (isBadRequest(dispatch, getChatMessageToken)) {
    return
  }

  const { token } = getChatTokenResponse as ChatTokenDto

  const currentChat = { id: state.currentChat!.id, messages: [], token }

  dispatch({
    currentChat,
    loading: false,
  })
}

export {
  createChat,
  deleteChat,
  addUserToChat,
  removeUserFromChat,
  getChats,
  getChatMessageToken,
}
