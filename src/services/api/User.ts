import { API_URL } from "../../config"
import { HTTPTransport } from "../../core/HTTPTransport"
import { Headers } from "./common"
import { ApiErrorDto, ChatUserDto } from "./dto"
import { Transformer } from "./transformers"

export interface User {
  id: number
  firstName: string
  secondName: string
  displayName: string
  login: string
  email: string
  phone: string
  avatar: string
}

export type UserPublicInfo = Omit<User, "id" | "avatar">

export class UserService {
  private client = new HTTPTransport(API_URL)

  changePublicInfo(newInfo: UserPublicInfo) {
    return this.client.put("user/profile", {
      headers: {
        ...Headers.ContentType.JSON,
      },
      body: newInfo,
    })
  }

  changeAvatar(formData: FormData) {
    return this.client
      .put("user/profile/avatar", {
        body: formData,
      })
      .then((response) => Transformer.toUser(response as ChatUserDto))
  }

  changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<unknown | ApiErrorDto> {
    return this.client.put("user/password", {
      headers: {
        ...Headers.ContentType.JSON,
      },
      body: {
        oldPassword,
        newPassword,
      },
    })
  }

  getOneById(id: number): Promise<User> {
    return this.client.get(`user/${id}`) as Promise<User>
  }

  getUsersByLogin(login: string): Promise<User[]> {
    return this.client.post("user/search", {
      headers: {
        ...Headers.ContentType.JSON,
      },
      body: { login },
    }) as Promise<User[]>
  }
}

export default new UserService()
