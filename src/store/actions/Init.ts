import { AppAction } from "../store"
import { withLogException } from "./common"
import { getGlobalRouter } from "../../helpers"
import { FALLBACK_ROUTE } from "../../router"
import { AuthService } from "../../services/api"
import { checkForError } from "../helpers"
import { ResponseTransformer } from "../../services/api/transformers"

export const appInit: AppAction = withLogException(async (dispatch, state) => {
  const router = getGlobalRouter()
  dispatch({ loading: true })

  const getUserResponse = await AuthService.getUser()

  if (!checkForError(getUserResponse)) {
    const user = ResponseTransformer.GetUser(getUserResponse)
    dispatch({ user })
    router.go("/chats")
    dispatch({ appIsInited: true })
  } else {
    router.go(FALLBACK_ROUTE.path)
    dispatch({ appIsInited: true })
  }
})
