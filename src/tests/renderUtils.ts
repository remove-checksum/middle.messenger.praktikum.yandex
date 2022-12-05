import { Store } from "../core/Store"
import { BlockConstructable } from "../core/Block"
import { AppState, initialAppState } from "../store"
import { PathRouter, renderDOM } from "../core"
import { initRouter } from "../router/router"
import { sleep } from "../helpers/sleep"

type RenderBlockConfig<T extends AnyObject = any> = {
  TargetBlock: BlockConstructable<T>
  props?: T
  storeState?: Partial<AppState>
}

export async function renderBlock({
  TargetBlock,
  props = {},
  storeState = initialAppState,
}: RenderBlockConfig) {
  const store = new Store({ ...initialAppState, ...storeState })
  const router = new PathRouter()

  window.__internals = { router, store }

  document.body.innerHTML = `<div id="app"></div>`

  renderDOM("#app", new TargetBlock(props))

  initRouter(router, store)

  await sleep()
}
