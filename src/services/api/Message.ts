import { WS_URL } from "../../config"

const PING_INTERVAL = 60 * 5

type MessageSocketCredentials = {
  userId: number
  chatId: number
  token: string
}

export class MessageService {
  private socket: WebSocket

  private pathname: string

  constructor(credentials: MessageSocketCredentials) {
    this.pathname = this.credentialsToPathname(credentials)
    this.socket = new WebSocket(this.pathname)

    const intervalId = setInterval(() => {
      this.socket.send(JSON.stringify({ type: "ping" }))
    }, PING_INTERVAL)

    this.socket.addEventListener("close", () => {
      clearInterval(intervalId)
    })
  }

  public getSocket() {
    return this.socket
  }

  private credentialsToPathname(credentials: MessageSocketCredentials) {
    return `${WS_URL}/chats/${credentials.userId}/${credentials.chatId}/${credentials.token}`
  }
}
