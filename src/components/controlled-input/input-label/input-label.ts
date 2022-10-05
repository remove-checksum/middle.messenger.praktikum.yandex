import { Block } from "../../../core"
import "./input-label.css"

interface InputLabelProps {
  for: string
  label: string
  error: boolean
}

export class InputLabel extends Block<InputLabelProps> {
  static blockName = "InputLabel"

  render(): string {
    return /* html */ `
      <label class="controlledInput__label {{#if error}}controlledInput__label_error{{/if}}"
        for="{{for}}">
        {{label}}
      </label>
    `
  }
}
