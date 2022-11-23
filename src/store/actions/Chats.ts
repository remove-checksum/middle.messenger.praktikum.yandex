import { ChatsService } from "../../services/api"
import { AppAction } from "../store"
import { checkForError } from "../helpers"
import { Transformer } from "../../services/api/transformers"

const getAllChats: AppAction = async (dispatch) => {
  try {
    dispatch({ loading: true })
    const chatsResponse = await ChatsService.getChats()

    if (checkForError(chatsResponse)) {
      dispatch({ loading: false })
    } else {
      dispatch({
        chats: chatsResponse.map(Transformer.toChat),
        loading: false,
      })
    }
  } catch (error) {
    console.log(error)
  }
}

const createChat: AppAction = async (
  dispatch,
  state,
  payload: { title: string }
) => {
  try {
    dispatch({ loading: true })
    const createChatResponse = await ChatsService.createChat(payload.title)

    if (checkForError(createChatResponse)) {
      dispatch({
        loading: false,
        errors: {
          ...state.errors,
          chatCreate: createChatResponse.reason,
        },
      })
    } else {
      dispatch({ loading: false })
    }
  } catch (error) {
    console.error(error)
  }
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

export const ChatActions = {
  createChat,
  deleteChat,
  addUserToChat,
  removeUserFromChat,
  getChats,
  getChatMessageToken,
}
