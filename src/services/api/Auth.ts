import { HTTPTransport } from "../../core/HTTPTransport"
import { Headers } from "./common"
import { API_URL } from "../../config"

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

export type CreatedUserId = {
  id: number
}

class AuthService {
  private client = new HTTPTransport(API_URL)

  signUp(credentials: SignUpCredentials) {
    return this.client.post("auth/signup", {
      headers: {
        ...Headers.ContentType.JSON,
      },
      body: credentials,
    })
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
    return this.client.get("auth/user")
  }

  signOut() {
    return this.client.post("auth/logout")
  }
}

export default new AuthService()
