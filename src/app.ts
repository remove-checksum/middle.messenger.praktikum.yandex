import { registerComponents } from "./helpers" // !!! This import must be first
import { PathRouter } from "./core/Router"
import { Store, StoreEvents } from "./core/Store"
import { FALLBACK_ROUTE, initRouter } from "./router"
import { AppState, initialAppState } from "./store/store"
import "./shared/main.css"
import { appInit } from "./actions/AppInit"
import { renderDOM } from "./core"
import { Loader } from "./components"

registerComponents()

const logStore = (prevState, nextState) => {
  console.log(
    `%cstore updated`,
    "background: hotpink; color: black;",
    prevState,
    nextState
  )
}

const bootstrapApplication = () => {
  const router = new PathRouter(FALLBACK_ROUTE.path)
  const store = new Store<AppState>(initialAppState)

  const loader = new Loader({})

  window.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = {
    router,
    store,
    blockInstance: loader,
  }

  store.on(StoreEvents.Updated, logStore)

  renderDOM("#app", loader)

  initRouter(router, store)

  store.dispatch(appInit)
}

document.addEventListener("DOMContentLoaded", bootstrapApplication)
