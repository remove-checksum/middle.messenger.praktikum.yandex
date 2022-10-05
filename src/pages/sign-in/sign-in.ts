import { Block } from "../../core"
import { onFormErrorSubmit } from "../../helpers/formValidation/formValidationHelpers"
import "./sign-in.css"

type SignInPageRefs = {
  loginRef: Block
  passwordRef: Block
}

export class SignInPage extends Block<EmptyObject, SignInPageRefs> {
  static blockName = "SignIn"

  constructor(props: EmptyObject) {
    super({
      ...props,
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault()
          const { target } = e
          if (target) {
            const valid = onFormErrorSubmit(target as HTMLFormElement)
            if (valid) {
              window.location.pathname = "/chat"
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
              ref="loginRef"
            }}}
            {{{ ControlledInput
              hasLabel=true
              type="password"
              name="password"
              label="Пароль"
              placeholder="Введите пароль"
              ref="passwordRef"
            }}}
            {{{ Button text="Войти" type="submit" extraClass="signinForm__button" }}}
            <a href="/sign-up" class="signinForm__link">Зарегистрироваться</a>
          </form>
        </section>
      {{/PageLayout}}
    `
  }
}
