export const getGlobalRouter = () => {
  const { router } = window.__internals
  if (!router) {
    throw new Error("Router not in global")
  }

  return router
}

export const getGlobalStore = () => {
  const { store } = window.__internals
  if (!store) {
    throw new Error("Router not in global")
  }

  return store
}
