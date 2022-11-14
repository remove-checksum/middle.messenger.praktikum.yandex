import { API_URL } from "../../config"
import { HTTPTransport } from "../../core/HTTPTransport"
import { Headers } from "./common"
import { ApiErrorDto } from "./dto"

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

type ChangeUser = Omit<User, "id" | "avatar">

export class UserService {
  private client = new HTTPTransport(API_URL)

  changePublicInfo(newInfo: ChangeUser): Promise<Partial<User | ApiErrorDto>> {
    return this.client.put("user/profile", {
      headers: {
        ...Headers.ContentType.JSON,
      },
      body: newInfo,
    }) as Promise<Partial<User | ApiErrorDto>>
  }

  changeAvatar(formData: FormData): Promise<unknown | ApiErrorDto> {
    return this.client.put("user/profile/avatar", {
      body: formData,
    })
  }

  changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<unknown | ApiErrorDto> {
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
