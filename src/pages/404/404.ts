import { Block } from "../../core"
import "./404.css"

export class NotFoundPage extends Block<EmptyObject> {
  static blockName = "NotFoundPage"

  render() {
    return /* html */ `
      {{#PageLayout}}
        <div class="errorPage">
          <h1 class="errorPage__code">400</h1>
          <h2 class="errorPage__subheading">Не туда попали</h2>
          {{{ Link router=false to="#chat" text="Назад к чатам" }}}
        </div>
      {{/PageLayout}}
    `
  }
}
