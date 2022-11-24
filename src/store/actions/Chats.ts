import { ChatsService } from "../../services/api"
import { AppAction } from "../store"
import { checkForError } from "../helpers"
import { Transformer } from "../../services/api/transformers"

const getAllChats: AppAction = async (dispatch) => {
  try {
    const chatsResponse = await ChatsService.getChats()

    if (!checkForError(chatsResponse)) {
      dispatch({
        chats: chatsResponse.map(Transformer.toChat),
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
    const createChatResponse = await ChatsService.createChat(payload.title)

    if (checkForError(createChatResponse)) {
      dispatch({
        errors: {
          ...state.errors,
          chatCreate: createChatResponse.reason,
        },
      })
    } else {
      const allChats = await ChatsService.getChats()

      dispatch({ chats: allChats.map(Transformer.toChat) })
    }
  } catch (error) {
    console.error(error)
  }
}

const deleteChat: AppAction = async (
  dispatch,
  _,
  payload: { chatId: number }
) => {
  const deleteChatResponse = await ChatsService.deleteChat(payload.chatId)

  if (!checkForError(deleteChatResponse)) {
    const allChats = await ChatsService.getChats()

    dispatch({ chats: allChats.map(Transformer.toChat) })
  }
}

const addUserToChat: AppAction = async (
  dispatch,
  _,
  payload: { userId: number; chatId: number }
) => {
  dispatch({ loading: true })
  const addUserResponse = await ChatsService.addUsersToChat(
    [payload.userId],
    payload.chatId
  )

  if (!checkForError(addUserResponse)) {
    const allChats = await ChatsService.getChats()
    dispatch({ chats: allChats.map(Transformer.toChat) })
  }
}

const removeUserFromChat: AppAction = async (
  dispatch,
  _,
  payload: { userId: number; chatId: number }
) => {
  const removeUserResponse = await ChatsService.removeUsersFromChat(
    [payload.userId],
    payload.chatId
  )

  if (!checkForError(removeUserResponse)) {
    const allChats = await ChatsService.getChats()

    dispatch({ chats: allChats.map(Transformer.toChat) })
  }
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

  if (checkForError(dispatch, getChatMessageToken)) {
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
  getAllChats,
  getChatMessageToken,
}
