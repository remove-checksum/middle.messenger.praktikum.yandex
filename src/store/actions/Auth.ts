import { AuthService } from "../../services/api"
import { AppAction } from "../store"
import { withLogException } from "./common"
import { Transformer } from "../../services/api/transformers"
import { getGlobalRouter } from "../../helpers"
import { checkForError } from "../helpers"
import { Page } from "../../router/pages"

const signOut: AppAction = async (dispatch) => {
  dispatch({ loading: true })
  await AuthService.signOut()
  dispatch({ loading: false, user: null })

  const router = getGlobalRouter() // TODO: call getGlobalRouter on module import
  router.go("/sign-in")
}

const getUser: AppAction = async (dispatch, state) => {
  const getUserResponse = await AuthService.getUser()

  if (!checkForError(getUserResponse)) {
    const user = Transformer.toUser(getUserResponse)
    dispatch({
      user,
      errors: {
        ...state.errors,
        getUser: null,
      },
    })
  } else {
    dispatch({
      errors: {
        ...state.errors,
        getUser: getUserResponse.reason,
      },
    })
  }
}

const signUp: AppAction = async (dispatch, state, payload) => {
  dispatch({ loading: true })

  const signUpResponse = await AuthService.signUp(payload)

  if (checkForError(signUpResponse)) {
    dispatch({
      loading: false,
      errors: { ...state.errors, signUp: signUpResponse.reason },
    })
  }

  await getUser(dispatch, state, payload)

  if (!state.errors.getUser) {
    const router = getGlobalRouter()
    router.go(Page.Chat)
  } else {
    dispatch(signOut)
  }
}

const signIn: AppAction = async (dispatch, state, payload) => {
  dispatch({ loading: true })

  const signInResponse = await AuthService.signIn(payload)

  if (checkForError(signInResponse)) {
    dispatch({
      loading: false,
      errors: { ...state.errors, signIn: signInResponse.reason },
    })
  }

  await getUser(dispatch, state, payload)

  if (!state.errors.getUser) {
    const router = getGlobalRouter()
    router.go(Page.Chat)
  } else {
    dispatch(signOut)
  }
}

export const AuthActions = {
  getUser: withLogException(getUser),
  signIn: withLogException(signIn),
  signUp: withLogException(signUp),
  signOut: withLogException(signOut),
}
