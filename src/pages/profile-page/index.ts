import BaseProfilePage from "./profile-page"
import { withStore } from "../../hoc/withStore"

export const ProfilePage = withStore((state) => state, BaseProfilePage)
