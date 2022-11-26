import { Chat } from "./Chats"
import {
  ChatDto,
  ChatUserDto,
  GetUserDto,
  MessageDto,
  UserPublicInfoDto,
} from "./dto"
import { Message } from "../../store/actions/Message"
import { User, UserPublicInfo } from "./User"

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

function toUserChange(user: UserPublicInfo): UserPublicInfoDto {
  return {
    first_name: user.firstName,
    second_name: user.secondName,
    display_name: user.displayName,
    login: user.login,
    email: user.email,
    phone: user.phone,
  }
}

export const Transformer = {
  toChat,
  toUser,
  toMessage,
  toUserChange,
}
