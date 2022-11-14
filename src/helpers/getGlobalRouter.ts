export const getGlobalRouter = () => {
  const { router } = window.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
  if (!router) {
    throw new Error("Router not in global")
  }

  return router
}

export const getGlobalStore = () => {
  const { store } = window.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
  if (!store) {
    throw new Error("Router not in global")
  }

  return store
}
