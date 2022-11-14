import { ChangeUser } from "../../services/api/User"
import { UserService } from "../../services/api"
import { AppAction } from "../store"
import { AuthActions } from "./Auth"
import { onResponseSuccess } from "./common"

const changePublicInfo: AppAction = async (
  dispatch,
  state,
  payload: ChangeUser
) => {
  dispatch(onResponseSuccess, {
    apiResponse: UserService.changePublicInfo(payload),
    onSuccess: {
      action: AuthActions.getUser,
    },
  })
}

const changePassword: AppAction = async (
  dispatch,
  state,
  payload: { oldPassword: string; newPassword: string }
) => {
  dispatch(onResponseSuccess, {
    apiResponse: UserService.changePassword(
      payload.oldPassword,
      payload.newPassword
    ),
  })
}

const changeAvatar: AppAction = async (
  dispatch,
  state,
  payload: {
    formData: FormData
  }
) => {
  dispatch(onResponseSuccess, {
    apiResponse: UserService.changeAvatar(payload.formData),
    onSuccess: {
      action: AuthActions.getUser,
    },
  })
}

// TODO add field for user search
const getOneById: AppAction = async (
  dispatch,
  state,
  payload: {
    userId: number
  }
) => {
  dispatch(onResponseSuccess, {
    apiResponse: UserService.getOneById(payload.userId),
    onSuccess: {
      action: {},
    },
  })
}

export const ProfileActions = {
  changeAvatar,
  changePassword,
  changePublicInfo,
  getOneById,
}
