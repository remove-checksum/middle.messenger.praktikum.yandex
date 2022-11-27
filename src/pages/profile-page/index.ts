import BaseProfilePage, { mapProfilePageProps } from "./profile-page"
import { withStore } from "../../hoc/withStore"

export const ProfilePage = withStore(mapProfilePageProps, BaseProfilePage)
