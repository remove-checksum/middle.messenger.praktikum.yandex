const METHODS = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE",
} as const

type ContentType = "application/json" | "multipart/form-data"

interface UsedHeaders {
  "Content-Type": ContentType
  [key: string]: string
}

interface RequestExtras {
  headers?: UsedHeaders
  body?: AnyObject
}

interface XHROptions extends RequestExtras {
  method: keyof typeof METHODS
}

type HTTPMethodHandler = (url: string, options: RequestExtras) => Promise<any>
interface HTTPHandles {
  get: HTTPMethodHandler
  put: HTTPMethodHandler
  post: HTTPMethodHandler
  delete: HTTPMethodHandler
}

export class HTTPTransport implements HTTPHandles {
  private endpoint: string

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  get(url: string, options: RequestExtras = {}) {
    return this.request(url, { ...options, method: METHODS.GET })
  }

  put(url: string, options: RequestExtras = {}) {
    return this.request(url, { ...options, method: METHODS.PUT })
  }

  post(url: string, options: RequestExtras = {}) {
    return this.request(url, { ...options, method: METHODS.POST })
  }

  delete(url: string, options: RequestExtras = {}) {
    return this.request(url, { ...options, method: METHODS.DELETE })
  }

  private request(url: string, options: XHROptions = { method: METHODS.GET }) {
    const finalURL = new URL(url, this.endpoint)

    if (options.body && options.method === METHODS.GET) {
      Object.entries(options.body as Record<string, string>).forEach(
        ([key, value]) => {
          finalURL.searchParams.set(key, value)
        }
      )
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(options.method, finalURL.toString())
      xhr.withCredentials = true
      xhr.responseType = "json"

      xhr.onerror = () => {
        if (xhr.status === 400) {
          reject(xhr.response)
        }

        if (xhr.status === 401) {
          reject(xhr.response)
        }

        if (xhr.status === 500) {
          reject(new Error("Server Error"))
        }
      }

      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(xhr.response)
        }
      }

      if (options.headers) {
        Object.entries(options.headers).forEach(([name, value]) => {
          xhr.setRequestHeader(name, value)
        })
      }

      if (options.body) {
        xhr.send(
          options.body instanceof FormData
            ? options.body
            : JSON.stringify(options.body)
        )
      } else {
        xhr.send()
      }
    })
  }
}
