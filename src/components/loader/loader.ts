import { Block } from "../../core/Block"
import "./loader.css"

export default class Loader extends Block {
  static blockName = "Loader"

  render() {
    return /* html */ `
      <div class="loader">
        <i class="ph-gear"></i>
      </div>
    `
  }
}
