import { WS_URL } from "../config"

const PING_INTERVAL = 60 * 10
const PING_MESSAGE = {
  type: "ping",
}

interface WSClient {
  send(message: UnknownObject): void
  close(): void
}

interface WSCredentials {
  token: string
  chatId: number
}

export interface WSHandlers {
  onOpen: (e: Event) => void
  onClose: (e: CloseEvent) => void
  onMessage: (e: MessageEvent) => void
  onError: (e: Event) => void
}

export class WSTransport implements WSClient {
  private socket: WebSocket

  private handlers: WSHandlers

  // @ts-expect-error interval initialized inside 'augmentHandlers'
  private intervalId: number

  constructor(credentials: WSCredentials, handlers: WSHandlers) {
    this.handlers = handlers
    this.socket = new WebSocket(
      `${WS_URL}${credentials.token}/${credentials.chatId}`
    )

    this.attachPing()

    this.bindEvents()
  }

  private attachPing() {
    const rawOnOpen = this.handlers.onOpen

    this.handlers.onOpen = (e: Event) => {
      this.intervalId = setInterval(() => {
        this.socket.send(JSON.stringify(PING_MESSAGE))
      }, PING_INTERVAL)
      rawOnOpen(e)
    }
  }

  private bindEvents() {
    this.socket.addEventListener("open", this.handlers.onOpen)
    this.socket.addEventListener("close", this.handlers.onClose)
    this.socket.addEventListener("error", this.handlers.onError)
    this.socket.addEventListener("message", this.handlers.onMessage)
  }

  private unbindEvents() {
    this.socket.removeEventListener("open", this.handlers.onOpen)
    this.socket.removeEventListener("close", this.handlers.onClose)
    this.socket.removeEventListener("error", this.handlers.onError)
    this.socket.removeEventListener("message", this.handlers.onMessage)
  }

  public send(payload: UnknownObject) {
    this.socket.send(JSON.stringify(payload))
  }

  public close(): void {
    clearInterval(this.intervalId)
    this.unbindEvents()
    this.socket.close()
  }
}
