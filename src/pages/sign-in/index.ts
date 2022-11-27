import BaseSignInPage from "./sign-in"
import { withStore } from "../../hoc/withStore"

export const SignInPage = withStore((state) => state, BaseSignInPage)
