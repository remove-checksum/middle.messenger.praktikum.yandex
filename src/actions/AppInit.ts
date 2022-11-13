import { AuthService } from "../services/api"
import { User } from "../services/api/User"
import { AppAction } from "../store/store"

const appInit: AppAction = async (dispatch, state, payload) => {
  dispatch({ loading: true })

  const user = (await AuthService.getUser()) as User

  dispatch({ user, loading: false })
}

export { appInit }
