import { Block } from "../../core"
import "./sign-up.css"
import signupData from "./sign-up.json"

export class SignUpPage extends Block {
  static blockName = "SignUpPage"

  constructor(props) {
    super({
      ...props,
      signUp: signupData,
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault()
          const fd = new FormData(e.target)
          fd.forEach(([fieldName, fieldValue]) => {
            console.log(`${fieldName}:${fieldValue}`)
          })
        },
      },
    })
  }

  render() {
    return /* html */ `
      {{#PageLayout}}
        <section class="signup-card">
            <h1 class="signup-card__heading">Регистрация</h1>
            <form action="#" class="signup-form">
              <ul class="signup-form__wrapper">
                {{#each signUp.rows as |row|}}
                <li class="signup-form__row">
                  {{#each row as |field|}}
                    {{{ ControlledInput
                      type=field.type
                      name=@key
                      hasLabel=true
                      label=field.label
                      placeholder=field.placeholder
                    }}}
                  {{/each}}
                  </li>
                {{/each}}
              </ul>
              {{{ Button text="Зарегистрироваться" type="submit" extraClass="signup-form__button" }}}
              <a href="../sign-in/sign-in" class="signup-form__link">Войти</a>
            </form>
        </section>
      {{/PageLayout}}
    `
  }
}
