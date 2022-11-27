import { Block } from "../../core"
import "./loader.css"

export class Loader extends Block {
  static blockName = "Loader"

  render() {
    return /* html */ `
      <div class="loader">
        <i class="ph-gear"></i>
      </div>
    `
  }
}
