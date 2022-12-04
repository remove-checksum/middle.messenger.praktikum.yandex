import { Block } from "../../core/Block"
import "./controlled-input.css"
import { InputFieldName, validate } from "../../services"
import { UserCredentialsFieldName } from "../../models/forms"

export const INPUT_ERROR_CLASS = "controlledInput__input_error"
export const LABEL_ERROR_CLASS = "controlledInput__label_error"
export const FONT_SIZE_LABEL = "19px"
export const FONT_SIZE_ERROR_MESSAGE = "12px"

type InputType = "text" | "tel" | "password" | "email"

interface ControlledInputProps {
  hasLabel: boolean
  label?: string
  placeholder: string
  type: InputType
  name: UserCredentialsFieldName | string
  value?: string
  error?: true
  extraClass?: string
  extraInputclass?: string
  extraLabelClass?: string
  dontValidate?: boolean
  disabled?: boolean
  noAutocomplete?: boolean
}

export default class ControlledInput extends Block<ControlledInputProps> {
  static blockName = "ControlledInput"

  constructor(props: ControlledInputProps) {
    const validateCallback = () => {
      const { input } = this.getInputElements()
      const { dontValidate, name } = props

      if (dontValidate) {
        return
      }

      const error = validate(name as InputFieldName, input.value)

      if (error) {
        this.setError(error)
      } else {
        this.clearError()
      }
    }

    super({
      ...props,
      events: {
        blur: validateCallback,
        focus: validateCallback,
        input: validateCallback,
      },
    })
  }

  getInputElements = () => {
    const label = this.element?.querySelector("label") as HTMLLabelElement
    const input = this.element?.querySelector("input") as HTMLInputElement

    return { label, input }
  }

  setError = (error: string) => {
    const { label, input } = this.getInputElements()

    if (label instanceof HTMLLabelElement) {
      label.style.display = "initial"
      label.innerText = error
      label.style.fontSize = FONT_SIZE_ERROR_MESSAGE
      label.classList.add(LABEL_ERROR_CLASS)
    }

    input.classList.add(INPUT_ERROR_CLASS)
  }

  clearError = () => {
    const { label, input } = this.getInputElements()

    if (label instanceof HTMLLabelElement) {
      label.style.fontSize = FONT_SIZE_LABEL
      label.innerText = this.props.label || ""
      label.classList.remove(LABEL_ERROR_CLASS)
    }

    input.classList.remove(INPUT_ERROR_CLASS)
  }

  getInputValue = () => {
    const { input } = this.getInputElements()
    return input.value
  }

  setInputValue = (newValue: string) => {
    this.getInputElements().input.value = newValue
  }

  render(): string {
    return /* html */ `
        <div class="controlledInput {{extraClass}}">
          {{#if hasLabel}}
           <label
            for="{{name}}"
            class="controlledInput__label {{extraLabelClass}}">
            {{label}}
          </label>
          {{/if}}

          <input
            type="{{type}}"
            name="{{name}}"
            id="{{name}}"
            placeholder="{{placeholder}}"
            value="{{value}}"
            class="controlledInput__input {{extraInputClass}}"
            {{#if disabled}}disabled{{/if}}
            autocomplete="{{#if noAutocomplete}}off{{else}}on{{/if}}"
            >
            <span>{{error}}</span>
          </div>
      `
  }
}
