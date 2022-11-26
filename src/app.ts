import { renderDOM, registerComponent } from "./core"
import * as Components from "./components"
import { PageLayout } from "./layouts"
import * as Pages from "./pages"
import { routes, Routes } from "./routes"
import "./shared/main.css"

const allComponents = [
  ...Object.values(Components),
  ...Object.values(Pages),
  PageLayout,
]

// @ts-expect-error 'every block generic should be instantiated with its props'
allComponents.forEach((component) => registerComponent(component))

document.addEventListener("DOMContentLoaded", () => {
  // const route = window.location.hash as Routes
  // const CurrentPage = routes[route] || Pages.SignInPage
  // console.log(route, CurrentPage)
  renderDOM("#app", new Pages.SignInPage({}))

  window.addEventListener("hashchange", () => {
    const route = window.location.hash as Routes
    const CurrentPage = routes[route] || Pages.SignInPage
    // @ts-expect-error 'every block generic should be instantiated with its props'
    renderDOM("#app", new CurrentPage({}))
  })
})
