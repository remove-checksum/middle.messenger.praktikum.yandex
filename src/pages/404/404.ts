import { Block } from "../../core/Block"
import "./404.css"

export default class NotFoundPage extends Block {
  static blockName = "NotFoundPage"

  render() {
    return /* html */ `
      {{#PageLayout}}
        <div class="errorPage">
          <h1 class="errorPage__code">400</h1>
          <h2 class="errorPage__subheading">Не туда попали</h2>
          {{{ Link to="/chat" text="Назад к чатам" }}}
        </div>
      {{/PageLayout}}
    `
  }
}
