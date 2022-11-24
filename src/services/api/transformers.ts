import { Chat } from "./Chats"
import { ChatDto, ChatUserDto, GetUserDto, MessageDto } from "./dto"
import { Message } from "../../store/actions/Message"
import { User } from "./User"

function toChat(res: ChatDto): Chat {
  return {
    id: res.id,
    avatar: res.avatar,
    title: res.title,
    unreadCount: res.unread_count,
    lastMessage: res.last_message
      ? {
          content: res.last_message.content,
          time: res.last_message.time,
          user: {
            id: res.last_message.user.id,
            firstName: res.last_message.user.first_name,
            secondName: res.last_message.user.second_name,
            email: res.last_message.user.email,
            login: res.last_message.user.login,
            phone: res.last_message.user.phone,
          },
        }
      : null,
  }
}

function toUser(res: ChatUserDto): User {
  return {
    id: res.id,
    avatar: res.avatar,
    displayName: res.display_name,
    firstName: res.first_name,
    secondName: res.second_name,
    email: res.email,
    login: res.login,
    phone: res.phone,
  }
}

function toMessage(res: MessageDto): Message {
  return {
    chatId: res.chat_id,
    userId: res.user_id,
    type: res.type,
    time: res.time,
    content: res.content,
    file: res.file
      ? {
          contentType: res.file.content_type,
          uploadDate: res.file.upload_date,
          filename: res.file.filename,
          id: res.file.id,
          path: res.file.path,
          userId: res.file.user_id,
        }
      : null,
  }
}

export const Transformer = {
  toChat,
  toUser,
  toMessage,
}

// export const ResponseTransformer = {
//   SignUp: (res: SignUpDto): { id: number } => ({
//     id: res.id,
//   }),
//   GetUser: (res: SignUpUserDto): User => ({
//     id: res.id,
//     first_name: res.first_name,
//     second_name: res.second_name,
//     display_name: res.display_name,
//     login: res.login,
//     email: res.email,
//     phone: res.phone,
//     avatar: res.avatar,
//   }),
//   LastMessage: (res: LastMessage): LastMessage => ({
//     user: {
//       avatar: res.user.avatar,
//       email: res.user.email,
//       first_name: res.user.first_name,
//       login: res.user.login,
//       phone: res.user.phone,
//       second_name: res.user.second_name,
//     },
//     time: res.time,
//     content: res.content,
//   }),
//   GetChats: (res: ChatDto[]): Chat[] => {
//     console.log({ RES: res })

//     return res.map((chat) => ({
//       id: chat.id,
//       title: chat.title,
//       avatar: chat.avatar,
//       unread_count: chat.unread_count,
//       last_message: ResponseTransformer.LastMessage(chat.last_message),
//     }))
//   },
//   ChatMessage: (res: MessageDto, myId: number): ItemMessage => ({
//     image: (res.file && res.file.path) || null,
//     own: res.user_id === myId,
//     text: res.content,
//     time: res.time,
//   }),
// }
