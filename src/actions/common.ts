import { errorResponse } from "../helpers"
import { AppDispatch } from "../store/store"

export const isBadRequest = (dispatch: AppDispatch, response: any) => {
  if (errorResponse(response)) {
    dispatch({ loading: false, errorReason: response.reason })
    return false
  }
  return true
}
