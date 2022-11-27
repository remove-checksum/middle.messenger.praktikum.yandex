import { withStore } from "../../hoc/withStore"
import BaseSignUpPage from "./sign-up"

export const SignUpPage = withStore((state) => state, BaseSignUpPage)
