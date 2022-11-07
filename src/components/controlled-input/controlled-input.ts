import { Block } from "../../core"
import "./controlled-input.css"
import { validators } from "../../services"
import { UserCredentialsFields } from "../../models/forms"

type InputType = "text" | "tel" | "password" | "email"
interface ControlledInputProps {
  hasLabel: boolean
  label?: string
  placeholder: string
  type: InputType
  name: UserCredentialsFields
  value?: string
  error?: true
  extraClass?: string
  extraInputclass?: string
  extraLabelClass?: string
  dontValidate?: boolean
  disabled?: boolean
}

export class ControlledInput extends Block<ControlledInputProps> {
  static blockName = "ControlledInput"

  constructor(props: ControlledInputProps) {
    const validateCallback = () => {
      const { input } = this.getInputElements()
      const { dontValidate, name } = props

      const validator = validators[name]

      if (!validator || dontValidate) {
        return
      }

      const error = validator(input.value)

      if (error) {
        this.setErrorState(error)
      } else {
        this.removeErrorState()
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

  setErrorState = (error: string) => {
    const { label, input } = this.getInputElements()

    label.style.display = "initial"
    label.innerText = error
    label.style.fontSize = "12px"
    label.classList.add("controlledInput__label_error")
    input.classList.add("controlledInput__input_error")
  }

  removeErrorState = () => {
    const { label, input } = this.getInputElements()
    label.style.fontSize = "19px"
    label.innerText = this.props.label
    label.classList.remove("controlledInput__label_error")
    input.classList.remove("controlledInput__input_error")
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
            {{#if disabled}}disabled{{/if}}>
        </div>
      `
  }
}
