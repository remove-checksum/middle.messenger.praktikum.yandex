import { HTTPTransport } from "../../core/HTTPTransport"
import { Headers } from "./common"
import { API_URL } from "../../config"
import { ApiErrorDto, ChatUserDto, SignUpDto } from "./dto"
import { Transformer } from "./transformers"

export type SignUpCredentials = {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export type SignInCredentials = {
  login: string
  password: string
}

class AuthService {
  private client = new HTTPTransport(API_URL)

  signUp(credentials: SignUpCredentials): Promise<SignUpDto | ApiErrorDto> {
    return this.client.post("auth/signup", {
      headers: {
        ...Headers.ContentType.JSON,
      },
      body: credentials,
    }) as Promise<SignUpDto | ApiErrorDto>
  }

  signIn(credentials: SignInCredentials) {
    return this.client.post("auth/signin", {
      headers: {
        ...Headers.ContentType.JSON,
      },
      body: credentials,
    })
  }

  getUser() {
    return this.client
      .get("auth/user")
      .then((user) => Transformer.toUser(user as ChatUserDto))
  }

  signOut() {
    return this.client.post("auth/logout")
  }
}

export default new AuthService()
