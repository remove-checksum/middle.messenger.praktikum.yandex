import { API_URL } from "../../config"
import { HTTPTransport } from "../../core/HTTPTransport"
import { Headers } from "./common"

export interface User {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string
}

export type ChangeUser = Partial<Omit<User, "id" | "avatar">>

export interface FindUser {
  login: string
}

export class UserService {
  private client = new HTTPTransport(API_URL)

  changePublicInfo(newInfo: ChangeUser) {
    return this.client.put("user/profile", {
      headers: {
        ...Headers.ContentType.JSON,
      },
      body: newInfo,
    })
  }

  changeAvatar(formData: FormData) {
    return this.client.put("user/profile/avatar", {
      body: formData,
    })
  }

  changePassword(oldPassword: string, newPassword: string) {
    return this.client.put("user/profile/password", {
      headers: {
        ...Headers.ContentType.JSON,
      },
      body: {
        oldPassword,
        newPassword,
      },
    })
  }

  getOneById(id: number) {
    return this.client.get(`user/${id}`)
  }

  getUsersByLogin(login: string) {
    return this.client.post("user/search", {
      headers: {
        ...Headers.ContentType.JSON,
      },
      body: { login },
    })
  }
}

export default new UserService()
