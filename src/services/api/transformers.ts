import { ItemMessage } from "../../components/message-bubble/message-bubble"
import { CreatedUserId } from "./Auth"
import { Chat } from "./Chats"
import { ChatDto, LastMessage, MessageDto, SignUpUserDto } from "./dto"
import { User } from "./User"

export const ResponseTransformer = {
  SignUp: (res: any): CreatedUserId => ({
    id: res.id,
  }),
  GetUser: (res: SignUpUserDto): User => ({
    id: res.id,
    first_name: res.first_name,
    second_name: res.second_name,
    display_name: res.display_name,
    login: res.login,
    email: res.email,
    phone: res.phone,
    avatar: res.avatar,
  }),
  LastMessage: (res: LastMessage): LastMessage => ({
    user: {
      avatar: res.user.avatar,
      email: res.user.email,
      first_name: res.user.first_name,
      login: res.user.login,
      phone: res.user.phone,
      second_name: res.user.second_name,
    },
    time: res.time,
    content: res.content,
  }),
  GetChats: (res: ChatDto[]): Chat[] =>
    res.map((chat) => ({
      id: chat.id,
      title: chat.title,
      avatar: chat.avatar,
      unread_count: chat.unread_count,
      last_message: ResponseTransformer.LastMessage(chat.last_message),
    })),
  ChatMessage: (res: MessageDto, myId: number): ItemMessage => ({
    image: (res.file && res.file.path) || null,
    own: res.user_id === myId,
    text: res.content,
    time: res.time,
  }),
}
