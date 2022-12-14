import { API_URL } from "../../config"
import { HTTPTransport } from "../../core/HTTPTransport"
import { User } from "./User"
import { Headers } from "./common"
import { ChatDeletedDto, ChatDto, ChatTokenDto, ChatUserDto } from "./dto"
import { Transformer } from "./transformers"

export type Chat = {
  id: number
  title: string
  avatar: string
  unreadCount: number
  lastMessage: Nullable<{
    user: Pick<
      User,
      "id" | "firstName" | "secondName" | "email" | "login" | "phone"
    >
    content: string
    time: string
  }>
}

export type ChatDeleted = {
  userId: number
  result: {
    id: number
    title: string
    avatar: string
  }
}

export type ChatAddUser = {
  users: number[]
  chatId: number
}

export type ChatWSToken = {
  token: string
}

class ChatsService {
  private client = new HTTPTransport(API_URL)

  getChats() {
    return this.client
      .get("chats")
      .then((chats) => (chats as ChatDto[]).map(Transformer.toChat))
  }

  createChat(chatTitle: string) {
    return this.client.post("chats", {
      headers: {
        ...Headers.ContentType.JSON,
      },
      body: {
        title: chatTitle,
      },
    })
  }

  deleteChat(chatId: number) {
    return this.client.delete("chats", {
      headers: {
        ...Headers.ContentType.JSON,
      },
      body: { chatId },
    }) as Promise<ChatDeletedDto>
  }

  getChatUsers(chatId: number) {
    return this.client
      .get(`chats/${chatId}/users`)
      .then((users) => (users as ChatUserDto[]).map(Transformer.toUser))
  }

  addUsersToChat(userIds: number[], chatId: number) {
    return this.client.put("chats/users", {
      headers: {
        ...Headers.ContentType.JSON,
      },
      body: {
        users: userIds,
        chatId,
      },
    })
  }

  removeUsersFromChat(userIds: number[], chatId: number) {
    return this.client.delete("chat/users", {
      headers: {
        ...Headers.ContentType.JSON,
      },
      body: {
        users: userIds,
        chatId,
      },
    }) as Promise<ChatDeletedDto>
  }

  async getMessageServerToken(chatId: number) {
    return this.client.post(`chats/token/${chatId}`) as Promise<ChatTokenDto>
  }
}

export default new ChatsService()
