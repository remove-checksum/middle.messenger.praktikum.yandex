import { Block } from "../../core"
import "./sign-in.css"

export class SignInPage extends Block {
  static blockName = "SignIn"

  constructor(props) {
    super({
      ...props,
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault()
          console.log(e)

          console.log({ ...new FormData(e.target) })
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
            <a href="../sign-up/sign-up" class="signinForm__link">Зарегистрироваться</a>
          </form>
        </section>
      {{/PageLayout}}
    `
  }
}
