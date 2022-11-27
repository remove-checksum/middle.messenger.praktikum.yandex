import { Block } from "../../core"
import "./500.css"

export default class ServerErrorPage extends Block {
  static blockName = "ServerErrorPage"

  render() {
    return /* html */ `
      {{#PageLayout}}
        <div class="errorPage">
          <h1 class="errorPage__code">500</h1>
          <h2 class="errorPage__subheading">Ошибка на сервере</h2>
          {{{ Link to="/chat" text="Назад к чатам" }}}
        </div>
      {{/PageLayout}}
    `
  }
}
