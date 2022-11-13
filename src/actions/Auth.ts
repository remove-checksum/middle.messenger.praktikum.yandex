import AuthService, {
  SignUpCredentials,
  SignInCredentials,
} from "../services/api/Auth"
import { AppAction } from "../store/store"
import { isBadRequest } from "./common"
import { ResponseTransformer } from "../services/api/transformers"
import { UserDto } from "../services/api/dto"

const getRouter = () =>
  window.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.router

const signOut: AppAction = async (dispatch) => {
  dispatch({ loading: true })
  await AuthService.signOut()
  dispatch({ loading: false, user: null })

  const router = getRouter()
  router.go("/sign-in")
}

const signUp: AppAction = async (dispatch, state, payload) => {
  dispatch({ loading: true })

  const signUpResponse = await AuthService.signUp(payload as SignUpCredentials)
  if (isBadRequest(dispatch, signUpResponse)) {
    return
  }

  const userResponse = (await AuthService.getUser()) as UserDto

  if (isBadRequest(dispatch, userResponse)) {
    return
  }

  dispatch({ user: ResponseTransformer.GetUser(userResponse), loading: false })

  const router = getRouter()
  router.go("/chats")
}

const signIn: AppAction = async (dispatch, state, payload) => {
  dispatch({ loading: true })

  const signInResponse = await AuthService.signIn(payload as SignInCredentials)

  if (isBadRequest(dispatch, signInResponse)) {
    return
  }
  const router = getRouter()

  router.go("/chats")
}

const getUser: AppAction = async (dispatch) => {
  dispatch({ loading: true })

  const userResponse = await AuthService.getUser()

  if (isBadRequest(dispatch, userResponse)) {
    return
  }

  dispatch({ user: ResponseTransformer.GetUser(userResponse as UserDto) })
}

export const AuthActions = {
  getUser,
  signOut,
  signIn,
  signUp,
}
