import { API_URL } from "../../config"
import { HTTPTransport } from "../../core/HTTPTransport"
import { User } from "./User"
import { Headers } from "./common"
import { ChatDeletedDto, ChatDto, ChatTokenDto, ChatUserDto } from "./dto"

export type Chat = {
  id: number
  title: string
  avatar: string
  unread_count: number
  last_message: {
    user: Omit<User, "id" | "display_name">
    content: string
    time: string
  }
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
    return this.client.get("chats") as Promise<ChatDto[]>
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
    return this.client.get(`chats/${chatId}/users`) as Promise<ChatUserDto[]>
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
