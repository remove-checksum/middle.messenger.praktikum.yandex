import { Block, renderDOM, registerComponent } from "./core"

import "./shared/main.css"

import { Button, Input } from "./components"
import { Page } from "./layouts"

registerComponent(Button, "Button")
registerComponent(Input, "Input")

// registerComponent(App, "App")

const page = new Page({})

document.addEventListener("DOMContentLoaded", () => {
  renderDOM("#app", page)
})
