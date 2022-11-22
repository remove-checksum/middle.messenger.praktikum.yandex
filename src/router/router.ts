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

      console.log("inside handler")

      if (isAuthorized || !route.isProtected) {
        store.dispatch({ page: route.block })
        return
      }

      if (!isAuthorized && route.isProtected) {
        store.dispatch({ page: Page.SignIn })
      }

      if (!hasCurrentPage) {
        console.log("fallback")
        store.dispatch({ page: Page.SignIn })
      }
    })
  })

  store.on(
    StoreEvents.Updated,
    (prevState: Partial<AppState>, nextState: Partial<AppState>) => {
      const shouldInit = !prevState.appIsInited && nextState.appIsInited

      if (shouldInit) {
        console.log("Initializing application")
        router.start()
      }

      const pageChanged = prevState.page !== nextState.page
      if (pageChanged) {
        const MatchBlock = getBlockByPage(nextState.page!)
        console.log({ MatchBlock, name: MatchBlock.blockName })

        renderDOM("#app", new MatchBlock({}))
        document.title = `ChatApp / ${MatchBlock.blockName}`
      }
    }
  )
}
