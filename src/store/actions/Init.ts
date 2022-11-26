import { AppAction } from "../store"
import { AuthService } from "../../services/api"
import { checkForError } from "../helpers"
import { Page } from "../../router/pages"
import { getGlobalRouter } from "../../helpers"

export const appInit: AppAction = async (dispatch) => {
  try {
    dispatch({ appIsInited: true })

    const getUserResponse = await AuthService.getUser()

    if (checkForError(getUserResponse)) {
      getGlobalRouter().go(Page.SignIn)
    } else {
      dispatch({ user: getUserResponse })
      getGlobalRouter().go(Page.Chat)
    }
  } catch (error) {
    console.error(error)
  }
}
