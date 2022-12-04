import { PathRouter } from "./Router"

const registerRoutes = (router: PathRouter) => (routes: string[]) => {
  routes.forEach((route) => {
    router.use(route, () => console.log(`going to ${route}`))
  })
}

describe("Router", () => {
  const router = new PathRouter("/fallback")
  router.use("/fallback", () => console.log("going to fallback"))
  const addRoutes = registerRoutes(router)
  addRoutes(["/", "/home", "/sign-in", "/about"])
  router.start()

  afterEach(() => {
    router.go("/")
  })

  it("should change pathname on route change", () => {
    expect(window.location.pathname).toStrictEqual("/")

    router.go("/home")
    expect(window.location.pathname).toStrictEqual("/home")

    router.go("/sign-in")
    expect(window.location.pathname).toStrictEqual("/sign-in")

    router.go("/about")
    expect(window.location.pathname).toStrictEqual("/about")

    router.go("/home")
    expect(window.location.pathname).toStrictEqual("/home")
  })

  it("should register new routes", () => {
    router.use("/newroute", () => console.log("going to /newroute"))

    router.go("/newroute")
    expect(window.location.pathname).toStrictEqual("/newroute")
  })

  it("should go fallback on route mismatch", () => {
    router.go("/nosuchpage")
    expect(window.location.pathname).toStrictEqual("/fallback")
  })
})
