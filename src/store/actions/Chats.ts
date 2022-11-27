import { ChatsService, UserService } from "../../services/api"
import { AppAction } from "../store"
import { checkForError } from "../helpers"

const getAllChats: AppAction = async (dispatch) => {
  try {
    const allChats = await ChatsService.getChats()

    if (!checkForError(allChats)) {
      dispatch({
        chats: allChats,
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

      dispatch({ chats: allChats })
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
  try {
    const deleteChatResponse = await ChatsService.deleteChat(payload.chatId)

    if (!checkForError(deleteChatResponse)) {
      const chats = await ChatsService.getChats()

      dispatch({ chats, currentChat: null, currentChatId: null })
    }
  } catch (error) {
    console.error(error)
  }
}

const addUserByLogin: AppAction = async (
  dispatch,
  state,
  payload: { loginQuery: string }
) => {
  try {
    const usersByLogin = await UserService.getUsersByLogin(payload.loginQuery)
    if (!usersByLogin.length || !state.currentChatId) {
      return
    }

    const idToAdd = usersByLogin[0].id

    const addUserResponse = await ChatsService.addUsersToChat(
      [idToAdd],
      state.currentChatId
    )

    if (!checkForError(addUserResponse)) {
      const allChats = await ChatsService.getChats()
      dispatch({ chats: allChats })
    }
  } catch (error) {
    console.error(error)
  }
}

const removeUserByLogin: AppAction = async (
  dispatch,
  state,
  payload: { loginQuery: string }
) => {
  try {
    if (!state.currentChatId) {
      return
    }

    const chatUsers = await ChatsService.getChatUsers(state.currentChatId)

    if (!chatUsers.length) {
      return
    }

    const userToRemove = chatUsers.find((user) =>
      user.login.toLowerCase().includes(payload.loginQuery.toLowerCase())
    )

    if (!userToRemove) {
      return
    }

    const removeUserResponse = await ChatsService.removeUsersFromChat(
      [userToRemove.id],
      state.currentChatId
    )

    if (!checkForError(removeUserResponse)) {
      const allChats = await ChatsService.getChats()

      dispatch({ chats: allChats })
    }
  } catch (error) {
    console.error(error)
  }
}

export const ChatActions = {
  createChat,
  deleteChat,
  addUserByLogin,
  removeUserByLogin,
  getAllChats,
}
