import { Loader } from "./components"
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
  path: "/sign-in",
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
  routes.forEach(({ path, block, isProtected }) => {
    router.use(path, () => {
      const isAuthorized = Boolean(store.getState().user)
      const hasCurrentPage = Boolean(store.getState().page)

      if (isAuthorized || !isProtected) {
        store.dispatch({ page: block })
        return
      }

      if (!hasCurrentPage || isProtected) {
        store.dispatch({ page: FALLBACK_ROUTE.block })
        return
      }

      router.go(FALLBACK_ROUTE.path)
    })
  })

  store.on(StoreEvents.Updated, (prevState: any, nextState: any) => {
    const isAppInited = !prevState.initialLoad && nextState.initialLoad
    if (!isAppInited) {
      router.start()
    }
    console.log(
      `PREV PAGE: ${prevState.page.blockName} | NEW PAGE: ${nextState.page.blockName}`
    )
    const isSamePage = prevState.page === nextState.page

    if (store.getState().loading) {
      renderDOM("#app", new Loader({}))
    }

    if (!isSamePage) {
      const { blockInstance: previousBlock } =
        window.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED

      if (previousBlock) {
        previousBlock.dispatchComponentWillUnmount()
      }

      const Page = nextState.page

      const blockInstance = new Page({})

      window.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.blockInstance =
        blockInstance

      renderDOM("#app", new Page({}))
      document.title = `ChatApp / ${Page.blockName}`
    }
  })
}
