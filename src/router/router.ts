import { renderDOM, PathRouter, Store, StoreEvents } from "../core"

import { getBlockByPage, Page } from "./pages"

import { AppState } from "../store/store"

interface Route {
  path: string
  block: Page
  isProtected: boolean
}

const routes: Route[] = [
  {
    path: "/sign-in",
    block: Page.SignIn,
    isProtected: false,
  },
  {
    path: "/sign-up",
    block: Page.SignUp,
    isProtected: false,
  },
  {
    path: "/profile",
    block: Page.Profile,
    isProtected: true,
  },
  {
    path: "/chat",
    block: Page.Chat,
    isProtected: true,
  },
  {
    path: "/not-found",
    block: Page.NotFound,
    isProtected: false,
  },
  {
    path: "/server-error",
    block: Page.ServerError,
    isProtected: false,
  },
  /*
    -------------
    Default route
    -------------
  */
  {
    path: "/*",
    block: Page.SignIn,
    isProtected: false,
  },
]

export const initRouter = (router: PathRouter, store: Store<AppState>) => {
  routes.forEach((route) => {
    router.use(route.path, () => {
      const isAuthorized = Boolean(store.getState().user)
      const hasCurrentPage = Boolean(store.getState().page)

      if (isAuthorized || !route.isProtected) {
        store.dispatch({ page: route.block })
        return
      }

      if (!isAuthorized && route.isProtected) {
        router.go(Page.SignIn)
      }

      if (!hasCurrentPage) {
        router.go(Page.SignIn)
      }
    })
  })

  store.on(StoreEvents.Updated, (prevState, nextState) => {
    const prev = prevState as Partial<AppState>
    const next = nextState as Partial<AppState>

    const shouldInit = !prev.appIsInited && next.appIsInited

    if (shouldInit) {
      router.start()
    }

    const pageChanged = prev.page !== next.page
    if (pageChanged) {
      if (next.page) {
        const MatchBlock = getBlockByPage(next.page)

        renderDOM("#app", new MatchBlock({}))
        document.title = `ChatApp / ${MatchBlock.blockName}`
      }
    }
  })
}
