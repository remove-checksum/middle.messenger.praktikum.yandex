import { withStore } from "../../hoc/withStore"
import BaseChatPage, { mapChatPageProps } from "./chat"

export const ChatPage = withStore(mapChatPageProps, BaseChatPage)
