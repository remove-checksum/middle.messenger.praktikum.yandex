import { Block } from "../../../core"
import { BlockProps } from "../../../core/Block"
import "./base-input.css"

interface BaseInputProps extends BlockProps {
  type: string
  placeholder: string
  id: string
  name: string
  value: string
  disabled: boolean
  onFocus?: (e: FocusEvent) => void
  onBlur?: (e: FocusEvent) => void
}

interface BaseInputExternalProps {
  type: string
  placeholder: string
  id: string
  name: string
  value: string
  disabled: boolean
  onFocus?: EventListener
  onBlur?: EventListener
}

export class BaseInput extends Block<BaseInputProps> {
  static blockName = "BaseInput"

  constructor(props: BaseInputExternalProps) {
    const { onFocus, onBlur } = props
    super({ ...props, events: { focus: onFocus, blur: onBlur } })
  }

  render(): string {
    return /* html */ `
      <input class="controlledInput {{extraClass}} {{#if error}}controlledInput_error{{/if}}"
        type="{{type}}"
        placeholder="{{placeholder}}"
        id="{{id}}"
        name="{{name}}"
        value="{{value}}"
        {{#if disabled}}disabled{{/if}}
      />
  `
  }
}
