interface Router {
  start(): void
  use(pathname: string, cb: VoidFunction): PathRouter
  go(pathname: string): void
  back(): void
  forward(): void
}

export class PathRouter implements Router {
  private routes: Record<string, VoidFunction> = {}

  private initialized = false

  private history = window.history

  private location = window.location

  constructor(private fallbackPath = "/*") {
    this.onRouteChange = this.onRouteChange.bind(this)
  }

  start() {
    console.log("Router started")
    if (!this.initialized) {
      this.initialized = true
      window.addEventListener("popstate", () => {
        this.onRouteChange()
      })
      this.onRouteChange()
    }
  }

  private onRouteChange(pathname: string = this.location.pathname) {
    const matchingRoute = Object.entries(this.routes).find(
      ([route]) => pathname === route
    )

    console.log(`trying route ${pathname}`)

    if (!matchingRoute) {
      console.log(
        `not found route ${pathname}, using fallback route ${this.fallbackPath}`
      )

      const onRouteFallback = this.routes[this.fallbackPath]
      onRouteFallback()
    } else {
      console.log(`found route ${pathname}`)
      const [route, onRoute] = matchingRoute
      if (route === pathname) {
        onRoute()
      }
    }
  }

  public use(pathname: string, cb: VoidFunction): PathRouter {
    this.routes[pathname] = cb
    return this
  }

  public go(pathname: string) {
    this.history.pushState({}, "", pathname)
    console.log(`Going to route ${pathname}`)
    this.onRouteChange(pathname)
  }

  public back() {
    this.history.back()
  }

  public forward() {
    this.history.forward()
  }
}
