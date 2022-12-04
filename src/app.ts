import { registerComponents } from "./helpers"
import { PathRouter } from "./core/Router"
import { Store } from "./core/Store"
import { initRouter } from "./router/router"
import { AppState, initialAppState } from "./store/store"
import { appInit } from "./store/actions/Init"
import "./shared/main.css"

registerComponents()

const bootstrapApplication = () => {
  const router = new PathRouter()
  const store = new Store<AppState>(initialAppState)

  window.__internals = {
    router,
    store,
  }

  initRouter(router, store)

  store.dispatch(appInit)
}

document.addEventListener("DOMContentLoaded", bootstrapApplication)
