import { AuthService } from "../../services/api"
import { User } from "../../services/api/User"
import { AppAction } from "../store"

const getRouter = () =>
  window.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.router

const appInit: AppAction = async (dispatch, state, payload) => {
  dispatch({ loading: true })
  const user = (await AuthService.getUser()) as User
  console.log(`Logged in with ${JSON.stringify(user, null, 2)}`)

  dispatch({ user, loading: false, appIsInited: false })
  // getRouter().go("/sign-in")
}

export { appInit }
