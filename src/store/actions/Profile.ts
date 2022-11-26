import { AuthService, UserService } from "../../services/api"
import { UserPublicInfo } from "../../services/api/User"
import { checkForError } from "../helpers"
import { AppAction } from "../store"

const changePublicInfo: AppAction = async (
  dispatch,
  _,
  payload: UserPublicInfo
) => {
  try {
    const newPublicInfo = await UserService.changePublicInfo(payload)

    if (checkForError(newPublicInfo)) {
      return
    }

    const newUserInfo = await AuthService.getUser()

    if (checkForError(newUserInfo)) {
      return
    }

    dispatch({
      user: newUserInfo,
    })
  } catch (error) {
    console.error(error)
  }
}

const changePassword: AppAction = async (
  dispatch,
  _,
  payload: { old_password: string; new_password: string }
) => {
  try {
    const changePasswordResponse = await UserService.changePassword(
      payload.old_password,
      payload.new_password
    )

    if (checkForError(changePasswordResponse)) {
      return
    }

    const newUserInfo = await AuthService.getUser()

    if (checkForError(newUserInfo)) {
      return
    }

    dispatch({
      user: newUserInfo,
    })
  } catch (error) {
    console.error(error)
  }
}

const changeAvatar: AppAction = async (
  dispatch,
  _,
  payload: {
    formData: FormData
  }
) => {
  try {
    const updatedUser = await UserService.changeAvatar(payload.formData)

    console.log(updatedUser)

    if (checkForError(updatedUser)) {
      return
    }

    dispatch({ user: updatedUser })
  } catch (error) {
    console.error(error)
  }
}

export const ProfileActions = {
  changeAvatar,
  changePassword,
  changePublicInfo,
}
