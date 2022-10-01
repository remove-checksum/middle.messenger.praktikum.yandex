import { Block, renderDOM, registerComponent } from "./core"

import "./shared/main.css"

import { Button, Input } from "./components"

class App extends Block {
  constructor(props) {
    super({
      ...props,
      events: {
        focus: () => console.log("focused"),
      },
    })
  }

  render(): string {
    return /*html*/ `
    <div style="background-color: #123123;">
      <!-- {{{ Button text="sasa lele" onClick=onClick }}}
      {{{ Button text="king" kind="secondary" onClick=onClick }}}
      {{{ Button text="sasa lele" onClick=onClick }}} -->
      {{{ Input hasLabel=true name="input" placeholder="hello world" label="Error!" onFocus=onFocus onBlur=onBlur }}}
    </div>
    `
  }
}
registerComponent(Button, "Button")
registerComponent(Input, "Input")
// registerComponent(App, "App")

const app = new App({})

document.addEventListener("DOMContentLoaded", () => {
  renderDOM("#app", app)
})
