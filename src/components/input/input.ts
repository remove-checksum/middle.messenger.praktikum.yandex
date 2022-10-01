import { Block } from "../../core"
import "./input.css"

interface InputProps {
  label: string
  hasLabel: boolean
  placeholder: string
  name: string
  value?: string
  error?: true
  small?: true
  extraClass?: string
  onFocus: (e: InputEvent) => void
  onBlur: (e: InputEvent) => void
}

export class Input extends Block<InputProps> {
  constructor(props) {
    super({ ...props, events: { focus: props.onFocus, blur: props.onBlur } })
  }

  render(): string {
    const { hasLabel, error, small, extraClass } = this.props

    return hasLabel
      ? /*html*/ `
      <div class="input__wrapper">
        <label class="input__label
          ${error && "input__label_error"}"
          for="{{name}}">
          {{label}}
        </label>
        <input class="input
          ${small && "input_small"}
          ${error && "input_error"}
          ${extraClass ? extraClass : ""}"
          type="{{type}}"
          placeholder="{{placeholder}}"
          id="{{name}}"
          name="{{name}}"
          value="{{value}}"
        />
      </div>
    `
      : /*html*/ `
      <input class="input
          ${small && "input_small"}
          ${error && "input_error"}
          ${extraClass ? extraClass : ""}"
          type="{{type}}"
          placeholder="{{placeholder}}"
          id="{{name}}"
          name="{{name}}"
          value="{{value}}"
        />
    `
  }
}
