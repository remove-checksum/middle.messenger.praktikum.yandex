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

allComponents.forEach((component) => registerComponent(component))

document.addEventListener("DOMContentLoaded", () => {
  const route = window.location.pathname as Routes

  const CurrentPage = routes[route] || Pages.SignInPage

  renderDOM("#app", new CurrentPage({}))
})
