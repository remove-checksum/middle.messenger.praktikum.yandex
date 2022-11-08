import { queryStringify } from "../helpers"
import { API_URL } from "../config"

const METHODS = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE",
} as const

interface XHROptions {
  method: keyof typeof METHODS
  headers?: Record<string, string>
  data?: UnknownObject
}

interface HTTPClient {
  get(url: string, options: XHROptions): Promise<unknown>
  put(url: string, options: XHROptions): Promise<unknown>
  post(url: string, options: XHROptions): Promise<unknown>
  delete(url: string, options: XHROptions): Promise<unknown>
}

export class HTTPTransport implements HTTPClient {
  private basename: string

  constructor(basename: string = API_URL) {
    this.basename = basename
  }

  get(url: string, options: XHROptions) {
    if (options.data) {
      const queryParams = queryStringify(options.data)
      url = `${url}${queryParams}`
    }

    return this.request(url, { ...options, method: METHODS.GET })
  }

  put(url: string, options: XHROptions) {
    return this.request(url, { ...options, method: METHODS.PUT })
  }

  post(url: string, options: XHROptions) {
    return this.request(url, { ...options, method: METHODS.POST })
  }

  delete(url: string, options: XHROptions) {
    return this.request(url, { ...options, method: METHODS.DELETE })
  }

  private request(url: string, options: XHROptions) {
    const endpoint = `${this.basename}${url}`

    return new Promise((resolve, reject) => {
      const x = new XMLHttpRequest()
      x.open(options.method, endpoint)

      x.onerror = () => {
        reject(new Error("Loading error"))
      }
      x.onload = () => {
        resolve(x.response)
      }

      if (options.headers) {
        Object.entries(options.headers).forEach(([name, value]) => {
          x.setRequestHeader(name, value)
        })
      }

      if (options.data) {
        x.send(JSON.stringify(options.data))
      } else {
        x.send()
      }
    })
  }
}
