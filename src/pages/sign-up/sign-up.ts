import { Block } from "../../core"
import { BlockProps } from "../../core/Block"
import "./sign-up.css"
import signupData from "./sign-up.json"
import { onFormErrorSubmit } from "../../helpers"

interface SignUpPageProps extends BlockProps {
  signUp: typeof signupData
}

export class SignUpPage extends Block<SignUpPageProps> {
  static blockName = "SignUpPage"

  constructor(props: SignUpPageProps) {
    super({
      ...props,
      signUp: signupData,
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault()
          if (!(e.target instanceof HTMLFormElement)) {
            return
          }
          const valid = onFormErrorSubmit(e.target)
          if (valid) {
            const formEntries = Array.from(new FormData(e.target).entries())

            const pretty = formEntries.reduce((acc, [name, value]) => {
              Reflect.set(acc, name, value)
              return acc
            }, {})
            console.table(pretty)
            window.location.hash = "#chat"
          }
        },
      },
    })
  }

  render() {
    return /* html */ `
      {{#PageLayout}}
        <section class="signupCard">
            <h1 class="signupCard__heading">Регистрация</h1>
            <form action="#" class="signupForm">
              <ul class="signupForm__wrapper">
                {{#each signUp.rows as |row|}}
                <li class="signupForm__row">
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
              {{{ Button
                text="Зарегистрироваться"
                type="submit"
                extraClass="signupForm__button"
              }}}
              {{{ Link
                router=false
                to="#sign-in"
                extraClass="signupForm__link"
                text="Войти"
              }}}
            </form>
        </section>
      {{/PageLayout}}
    `
  }
}
