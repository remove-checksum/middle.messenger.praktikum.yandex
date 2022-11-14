import { renderDOM, PathRouter, Store } from "./core"
import { StoreEvents } from "./core/Store"

import { getBlockByPage, Page } from "./pages"

import { AppState } from "./store/store"

interface Route {
  path: `/${string}`
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
]

export const FALLBACK_ROUTE = routes[1]

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
      console.log(
        `WAS INITED? ${prevState.appIsInited} | WILL BE INITED? ${nextState.appIsInited}`
      )

      if (shouldInit) {
        router.start()
      }

      const pageChanged = prevState.page !== nextState.page
      if (pageChanged) {
        const MatchBlock = getBlockByPage(nextState.page)

        renderDOM("#app", new MatchBlock({}))
        document.title = `ChatApp / ${MatchBlock.blockName}`
      }
    }
  )
}
