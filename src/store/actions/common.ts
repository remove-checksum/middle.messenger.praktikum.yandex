import { AppAction } from "../store"

export const withLogException =
  (action: AppAction): AppAction =>
  (dispatch, state, payload) => {
    try {
      action(dispatch, state, payload)
    } catch (e) {
      console.error(`
        Error in action ${action.name}
        State -> ${JSON.stringify(state, null, 2)}
        Payload -> ${JSON.stringify(state, null, 2)}
        Error -> ${e}
      `)
    }
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
