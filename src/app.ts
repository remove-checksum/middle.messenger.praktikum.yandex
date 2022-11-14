import { registerComponents } from "./helpers" // !!! This import must be first
import { PathRouter } from "./core/Router"
import { Store, StoreEvents } from "./core/Store"
import { FALLBACK_ROUTE, initRouter } from "./router"
import { AppState, initialAppState } from "./store/store"
import { renderDOM } from "./core"
import { appInit } from "./store/actions/Init"
import { Loader } from "./components"
import { logStore } from "./store/helpers"
import "./shared/main.css"

registerComponents()

const bootstrapApplication = () => {
  const router = new PathRouter(FALLBACK_ROUTE.path)
  const store = new Store<AppState>(initialAppState)

  store.on(StoreEvents.Updated, logStore)

  window.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = {
    router,
    store,
  }

  renderDOM("#app", new Loader({}))

  initRouter(router, store)

  store.dispatch(appInit)
}

document.addEventListener("DOMContentLoaded", bootstrapApplication)
