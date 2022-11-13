import { ChangeUser } from "../services/api/User"
import { UserService } from "../services/api"
import { AppAction } from "../store/store"
import { getUser } from "./Auth"
import { errorResponse } from "../helpers"

/*
  changeProfile
  changePassword
  changeAvatar
  getById
  searchByLogin
*/

type apiCallPayload = {
  apiResponse: Promise<any>
  onSuccess: { action: AppAction; payload: any }
}

const onResponseSuccess: AppAction = async (
  dispatch,
  state,
  payload: apiCallPayload
) => {
  dispatch({ loading: true })

  const response = await payload.apiResponse

  if (errorResponse(response)) {
    dispatch({ loading: false, errorReason: response.reason })
    return
  }

  if (payload.onSuccess) {
    const onSuccessPayload = payload.onSuccess.payload
      ? payload.onSuccess.payload
      : payload

    dispatch(payload.onSuccess.action, onSuccessPayload)
  }

  dispatch({ loading: false })
}

const changeProfile: AppAction = async (
  dispatch,
  state,
  payload: ChangeUser
) => {
  dispatch(onResponseSuccess, {
    apiResponse: UserService.changePublicInfo(payload),
    onSuccess: {
      action: getUser,
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

// const getOneById: AppAction = async (
//   dispatch,
//   state,
//   payload: {
//     userId: number
//   }
// ) => {
//   dispatch(onResponseSuccess, {
//     apiResponse: UserService.getOneById(payload.userId),
//     onSuccess: {
//       action: {},
//     },
//   })
// }
