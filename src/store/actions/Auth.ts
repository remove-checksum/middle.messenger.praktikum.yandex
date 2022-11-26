import { AuthService } from "../../services/api"
import { AppAction, initialAppState } from "../store"
import { getGlobalRouter } from "../../helpers"
import { checkForError } from "../helpers"
import { Page } from "../../router/pages"

const signOut: AppAction = async (dispatch) => {
  try {
    const signOutResponse = await AuthService.signOut()

    if (checkForError(signOutResponse)) {
      return
    }

    dispatch(initialAppState)
    getGlobalRouter().go(Page.SignIn)
  } catch (error) {
    console.error(error)
  }
}

const getUser: AppAction = async (dispatch, state) => {
  try {
    const user = await AuthService.getUser()

    if (!checkForError(user)) {
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
          getUser: user.reason,
        },
      })
    }
  } catch (error) {
    console.error(error)
  }
}

const signUp: AppAction = async (dispatch, state, payload) => {
  try {
    dispatch({ loading: true })

    const signUpResponse = await AuthService.signUp(payload)

    if (checkForError(signUpResponse)) {
      dispatch({
        loading: false,
        errors: { ...state.errors, signUp: signUpResponse.reason },
      })
    }

    const userResponse = await AuthService.getUser()

    if (checkForError(userResponse)) {
      dispatch(signOut)
      return
    }
    dispatch({ user: userResponse })
    getGlobalRouter().go(Page.Chat)
  } catch (error) {
    console.error(error)
  }
}

const signIn: AppAction = async (dispatch, state, payload) => {
  const signInResponse = await AuthService.signIn(payload)

  if (checkForError(signInResponse)) {
    dispatch({
      loading: false,
      errors: { ...state.errors, signIn: signInResponse.reason },
    })
  }

  const user = await AuthService.getUser()

  if (checkForError(user)) {
    dispatch(signOut)
    return
  }
  dispatch({ user })
  getGlobalRouter().go(Page.Chat)
}

export const AuthActions = {
  getUser,
  signIn,
  signUp,
  signOut,
}
