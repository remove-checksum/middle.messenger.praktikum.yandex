import { WSCredentials } from "../../models/Messages"
import { Store } from "../../core"
import { WS_URL } from "../../config"
import { AppState } from "../../store/store"

const WS_PING_INTERVAL = 60 * 5
const CODE_CLOSED_ABNORMALLY = 1006
const endpointFromCredentials = ({ userId, chatId, token }: WSCredentials) =>
  `${WS_URL}/${userId}/${chatId}/${token}`

interface WSService {
  open(credentials: WSCredentials): void
  close(): void
  send(message: string): void
  getLastMessages(offset: number): void
}

export class MessageService implements WSService {
  private socket: WebSocket

  private endpointWithCredentials: string

  private pingIntervalId: number

  // constructor(credentials: WSCredentials, store: Store<AppState>) {
  //   this.store = store

  //   this.endpointWithCredentials = endpointFromCredentials(credentials)

  //   this.pingIntervalId = setInterval(() => {
  //     if (this.socket) {
  //       this.ping()
  //     }
  //   }, WS_PING_INTERVAL)

  //   this.socket = new WebSocket(this.endpointWithCredentials)
  //   this.addHandlers()
  // }

  public open(credentials: WSCredentials) {
    clearInterval(this.pingIntervalId)

    this.endpointWithCredentials = endpointFromCredentials(credentials)

    this.pingIntervalId = setInterval(() => {
      if (this.socket) {
        this.ping()
      }
    }, WS_PING_INTERVAL)

    this.socket = new WebSocket(this.endpointWithCredentials)
    this.addHandlers()
  }

  public send(message: string): void {
    const serialized = JSON.stringify({
      type: "message",
      content: message,
    })

    this.socket.send(serialized)
  }

  public getLastMessages(offset: number): void {
    const serialized = JSON.stringify({
      type: "get old",
      content: offset.toString(),
    })

    this.socket.send(serialized)
  }

  public close(): void {
    clearInterval(this.pingIntervalId)

    this.socket.close()
    this.removeHandlers()
  }

  private addHandlers() {
    this.socket.addEventListener("open", this.onOpen)
    this.socket.addEventListener("close", this.onClose)
    this.socket.addEventListener("error", this.onError)
    this.socket.addEventListener("message", this.onMessage)
  }

  private removeHandlers() {
    this.socket.removeEventListener("open", this.onOpen)
    this.socket.removeEventListener("close", this.onClose)
    this.socket.removeEventListener("error", this.onError)
    this.socket.removeEventListener("message", this.onMessage)
  }

  private ping() {
    const serialized = JSON.stringify({
      type: "ping",
    })

    this.socket.send(serialized)
  }

  private onOpen = () => {
    this.pingIntervalId = setInterval(() => {
      this.ping()
    }, WS_PING_INTERVAL)
    console.log("WS opened succesfully")
  }

  private onClose = (e: CloseEvent) => {
    this.removeHandlers()

    if (e.code === CODE_CLOSED_ABNORMALLY) {
      this.open()
    }

    if (e.wasClean) {
      console.log("WS closed gracefully")
    } else {
      console.error("WS closed abnormally")
    }

    console.error(`Closed with code ${e.code}, reason: ${e.reason}`)
  }

  private onError = (e: Event) => {
    console.error(`WS error: ${e}`)
  }

  private onMessage = (e: MessageEvent) => {
    const data = JSON.parse(e.data)
  }
}

export default new MessageService()
