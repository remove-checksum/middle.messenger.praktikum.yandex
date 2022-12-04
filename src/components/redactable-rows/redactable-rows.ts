import { Block } from "../../core/Block"
import { InputDefinition } from "../../models/inputDefinition"
import { AuthService } from "../../services/api"
import { User, UserPublicInfo } from "../../services/api/User"
import "./redactable-rows.css"

interface InputDataProps {
  user: UserPublicInfo
  fields: Record<string, InputDefinition>
  inactive: boolean
}

export default class RedactableRows extends Block<InputDataProps> {
  static blockName = "RedactableRows"

  constructor(props: InputDataProps) {
    super({
      user: props.user,
      fields: props.fields,
      inactive: props.inactive,
    })
  }

  componentDidMount(): void {
    this.setDefaultValues()
  }

  setDefaultValues = () => {
    const rel = {
      first_name: "firstName",
      second_name: "secondName",
      display_name: "displayName",
      login: "login",
      email: "email",
      phone: "phone",
    }

    const inputs = this.getContent().querySelectorAll(
      "input.redactableRowsUserInfo__input"
    ) as NodeListOf<HTMLInputElement>

    AuthService.getUser()
      .then((user) => {
        inputs.forEach((input) => {
          // @ts-expect-error cannot index
          input.value = user[rel[input.name as keyof User]]
        })
      })
      .catch((error) => console.error(error))
  }

  render(): string {
    return /* html */ `
      <ul class="redactableRowsUserInfo">
        {{#each fields as |field|}}
          {{#if field.input_type}}
            <li class="redactableRowsUserInfo__row">
              <span class="redactableRowsUserInfo__text">{{field.label}}</span>
              {{{ ControlledInput
                hasLabel=true
                disabled=@root.inactive
                onFocus=@root.onFocus
                onBlur=@root.onBlur
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
