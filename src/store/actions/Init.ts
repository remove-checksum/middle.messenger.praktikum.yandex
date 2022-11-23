import { AppAction } from "../store"
import { AuthService } from "../../services/api"
import { checkForError } from "../helpers"
import { Transformer } from "../../services/api/transformers"
import { Page } from "../../router/pages"

export const appInit: AppAction = async (dispatch, state) => {
  try {
    dispatch({ loading: true, appIsInited: true })
    const getUserResponse = await AuthService.getUser()

    if (checkForError(getUserResponse)) {
      dispatch({ page: Page.SignIn })
    } else {
      const user = Transformer.toUser(getUserResponse)
      dispatch({ user, page: Page.Chat })
    }
  } catch (error) {
    console.error(error)
  } finally {
    dispatch({ loading: false })
  }
}
