import { renderDOM, PathRouter, BlockConstructable, Store } from "./core"
import { StoreEvents } from "./core/Store"

import * as Pages from "./pages"
import { AppState } from "./store/store"

interface Route {
  path: `/${string}`
  block: BlockConstructable<AnyObject>
  isProtected: boolean
}

export const FALLBACK_ROUTE: Route = {
  path: "/*",
  block: Pages.SignInPage,
  isProtected: false,
}

const routes: Route[] = [
  {
    path: "/",
    block: Pages.SignInPage,
    isProtected: false,
  },
  {
    path: "/sign-in",
    block: Pages.SignInPage,
    isProtected: false,
  },
  {
    path: "/sign-up",
    block: Pages.SignUpPage,
    isProtected: false,
  },
  {
    path: "/profile",
    block: Pages.ProfilePage,
    isProtected: true,
  },
  {
    path: "/chats",
    block: Pages.ChatPage,
    isProtected: true,
  },
  {
    path: "/not-found",
    block: Pages.NotFoundPage,
    isProtected: false,
  },
  {
    path: "/server-error",
    block: Pages.ServerErrorPage,
    isProtected: false,
  },
  FALLBACK_ROUTE,
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

      if (isAuthorized && route.isProtected) {
        store.dispatch({ page: FALLBACK_ROUTE.block })
      }
    })
  })

  store.on(
    StoreEvents.Updated,
    (prevState: Partial<AppState>, nextState: Partial<AppState>) => {
      const shouldInit = !prevState.appIsInited && nextState.appIsInited
      if (shouldInit) {
        router.start()
      }

      const pageChanged = prevState.page !== nextState.page
      if (pageChanged) {
        const Page = nextState.page
        renderDOM("#app", new Page({}))
        document.title = `ChatApp / ${Page.blockName}`
      }
    }
  )
}
