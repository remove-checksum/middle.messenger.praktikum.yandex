import { errorResponse } from "../helpers"
import { AppDispatch, AppAction } from "../store/store"

export const isBadRequest = (dispatch: AppDispatch, response: any) => {
  if (errorResponse(response)) {
    dispatch({ loading: false, errorReason: response.reason })
    return false
  }
  return true
}

type apiCallPayload = {
  apiResponse: Promise<unknown>
  onSuccess: { action: AppAction; payload: any }
}

export const onResponseSuccess: AppAction = async (
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
