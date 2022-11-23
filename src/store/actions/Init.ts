import { AppAction } from "../store"
import { AuthService } from "../../services/api"
import { checkForError } from "../helpers"
import { Transformer } from "../../services/api/transformers"
import { Page } from "../../router/pages"

export const appInit: AppAction = async (dispatch) => {
  try {
    dispatch({ loading: true, appIsInited: true })
    const getUserResponse = await AuthService.getUser()

    if (checkForError(getUserResponse)) {
      window.__internals.router.go(Page.SignIn)
    } else {
      const user = Transformer.toUser(getUserResponse)
      dispatch({ user })
      window.__internals.router.go(Page.Chat)
    }
  } catch (error) {
    console.error(error)
  } finally {
    dispatch({ loading: false })
  }
}
