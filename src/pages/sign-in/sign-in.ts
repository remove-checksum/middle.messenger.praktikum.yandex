import { Block } from "../../core"
import { onFormErrorSubmit } from "../../helpers/formHelpers/formHelpers"
import "./sign-in.css"
import { printFormData } from "../../helpers"

export class SignInPage extends Block {
  static blockName = "SignIn"

  constructor(props: UnknownObject) {
    super({
      ...props,
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault()
          const { target } = e
          if (target && target instanceof HTMLFormElement) {
            const valid = onFormErrorSubmit(target)
            if (valid) {
              printFormData(target)

              window.location.hash = "#chat"
            }
          }
        },
      },
    })
  }

  render() {
    return /* html */ `
      {{#PageLayout}}
        <section class="signinCard">
          <h1 class="signinCard__heading">Вход</h1>
          <form action="#" class="signinForm">
            {{{ ControlledInput
              hasLabel=true
              type="text"
              name="login"
              label="Логин"
              placeholder="Введите имя пользователя"
            }}}
            {{{ ControlledInput
              hasLabel=true
              type="password"
              name="password"
              label="Пароль"
              placeholder="Введите пароль"
            }}}
            {{{ Button text="Войти" type="submit" extraClass="signinForm__button" }}}
            {{{ Link
              router=false
              to="#sign-up"
              extraClass="signinForm__link"
              text="Зарегистрироваться"
            }}}
          </form>
        </section>
      {{/PageLayout}}
    `
  }
}
