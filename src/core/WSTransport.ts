/* eslint-disable max-classes-per-file */
import { EventBus } from "./EventBus"

const PING_INTERVAL = 60 * 10
const PING_MESSAGE = {
  type: "ping",
}

export const SocketEvents = {
  Message: "SOCKET:MESSAGE",
  Error: "SOCKET:ERROR",
  Open: "SOCKET:OPEN",
} as const

export class WSTransport extends EventBus {
  private socket: WebSocket

  // 0 is invalid interval ID, used only for initialization
  private intervalId = 0

  constructor(url: string) {
    super()
    this.socket = new WebSocket(url)
    this.bindListeners()
  }

  private bindListeners() {
    this.socket.addEventListener("open", this.onOpen)
    this.socket.addEventListener("close", this.onClose)
    this.socket.addEventListener("error", this.onError)
    this.socket.addEventListener("message", this.onMessage)
  }

  private unbindListeners() {
    this.socket.removeEventListener("open", this.onOpen)
    this.socket.removeEventListener("close", this.onClose)
    this.socket.removeEventListener("error", this.onError)
    this.socket.removeEventListener("message", this.onMessage)
  }

  private onOpen = () => {
    console.log("socket opened")

    this.intervalId = setInterval(() => {
      this.socket.send(JSON.stringify(PING_MESSAGE))
    }, PING_INTERVAL)
    this.emit(SocketEvents.Open)
  }

  private onClose = (e: CloseEvent) => {
    if (e.wasClean) {
      console.log("socket gracefully closed")
    } else {
      console.log("socket abruptly closed")
    }
  }

  private onMessage = (e: MessageEvent) => {
    const message = JSON.parse(e.data)
    console.log("got message", message)

    this.emit(SocketEvents.Message, message)
  }

  private onError = (e: Event) => {
    console.error("socket error", e)
    this.emit(SocketEvents.Error, e)
  }

  public sendMessage(message: string) {
    this.socket.send(JSON.stringify({ type: "message", content: message }))
  }

  public getLastMessages(offset = "0") {
    this.socket.send(
      JSON.stringify({
        type: "get old",
        content: offset,
      })
    )
  }

  public close() {
    clearInterval(this.intervalId)
    this.unbindListeners()
    this.socket.close()
  }
}
