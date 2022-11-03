import { Block } from "../../core"
import "./redactable-rows.css"
import { InputDefinition } from "../../models/inputDefinition"

interface InputDataProps {
  fields: Record<string, InputDefinition>
  inactive: boolean
}

interface InputValidationProps {
  isValid: boolean
  hasLabel: boolean
  label: string
}

type RedactableRowsProps = InputValidationProps & InputDataProps

export class RedactableRows extends Block<RedactableRowsProps> {
  static blockName = "RedactableRows"

  render(): string {
    return /* html */ `
      <ul class="redactableRowsUserInfo">
        {{#each fields as |field|}}
          {{#if field.input_type}}
            <li class="redactableRowsUserInfo__row">
              <span class="redactableRowsUserInfo__text">{{field.label}}</span>
              {{{ ControlledInput
                hasLabel=hasLabel
                disabled=@root.inactive
                onFocus=@root.onFocus
                onBlur=@root.onBlur
                label=label
                type=field.input_type
                placeholder=placeholder
                id=field.label
                name=field.name
                extraInputClass="redactableRowsUserInfo__input"
              }}}
          {{/if}}
        {{/each}}
      </ul>
    `
  }
}
