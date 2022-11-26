import { registerComponents } from "./helpers" // !!! This import must be first
import { PathRouter } from "./core/Router"
import { Store, StoreEvents } from "./core/Store"
import { initRouter } from "./router/router"
import { AppState, initialAppState } from "./store/store"
import { renderDOM } from "./core"
import { appInit } from "./store/actions/Init"
import { Loader } from "./components"
import "./shared/main.css"
import { logStore } from "./store"

registerComponents()

const bootstrapApplication = () => {
  const router = new PathRouter()
  const store = new Store<AppState>(initialAppState)

  window.__internals = {
    router,
    store,
  }

  // store.on(StoreEvents.Updated, logStore)

  renderDOM("#app", new Loader({}))

  initRouter(router, store)

  store.dispatch(appInit)
}

document.addEventListener("DOMContentLoaded", bootstrapApplication)
