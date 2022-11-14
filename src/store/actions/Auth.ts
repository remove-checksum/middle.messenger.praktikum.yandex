import AuthService, {
  SignUpCredentials,
  SignInCredentials,
} from "../../services/api/Auth"
import { AppAction } from "../store"
import { withException, isBadRequest } from "./common"
import { ResponseTransformer } from "../../services/api/transformers"
import { withErrorReason } from "../../helpers/isWrongRequest"
import { getGlobalRouter } from "../../helpers"

const getUser: AppAction = async (dispatch) => {
  dispatch({ loading: true })

  const userResponse = await AuthService.getUser()

  if (withErrorReason(userResponse)) {
    dispatch(signOut)
    return
  }

  dispatch({ user: ResponseTransformer.GetUser(userResponse) })
}

const signUp: AppAction = async (dispatch, state, payload) => {
  dispatch({ loading: true })

  const signUpResponse = await AuthService.signUp(payload as SignUpCredentials)
  if (isBadRequest(dispatch, signUpResponse)) {
    return
  }

  const userResponse = await AuthService.getUser()

  if (isBadRequest(dispatch, userResponse)) {
    return
  }

  dispatch({ user: ResponseTransformer.GetUser(userResponse), loading: false })

  const router = getGlobalRouter()
  router.go("/chats")
}

const signIn: AppAction = async (dispatch, state, payload) => {
  dispatch({ loading: true })

  const router = getGlobalRouter()

  router.go("/chats")

  const signInResponse = await AuthService.signIn(payload as SignInCredentials)

  if (isBadRequest(dispatch, signInResponse)) {
    return
  }
  dispatch({ loading: false })
}

const signOut: AppAction = async (dispatch) => {
  dispatch({ loading: true })
  await AuthService.signOut()
  dispatch({ loading: false, user: null })

  const router = getGlobalRouter()
  router.go("/sign-in")
}

export const AuthActions = {
  getUser: withException(getUser),
  signIn: withException(signIn),
  signUp: withException(signUp),
  signOut: withException(signOut),
}
