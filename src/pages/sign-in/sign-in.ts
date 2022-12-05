import { Block } from "../../core/Block"
import { targetHelper } from "../../helpers"
import { formToFieldData } from "../../helpers/formHelpers/formHelpers"
import { SignInCredentials } from "../../services/api/Auth"
import { AuthActions } from "../../store/actions"
import { AppStore } from "../../store"

import "./sign-in.css"

interface SignInPageProps {
  store: AppStore
}

export default class SignInPage extends Block {
  static blockName = "SignIn"

  constructor(props: SignInPageProps) {
    super(props)

    this.setProps({
      events: {
        submit: targetHelper(HTMLFormElement, this.onFormSubmit),
        input: this.activateFormSubmit,
      },
    })
  }

  activateFormSubmit = () => {
    const inputs = Array.from(this.getContent().querySelectorAll("input"))
    const submitButton = this.getContent().querySelector("button[type=submit]")

    const isEveryInputValid = inputs.every((input) => {
      const inputFilled = Boolean(input.value)
      const inputErrored = input.classList.contains(
        "controlledInput__input_error"
      )
      return inputFilled && !inputErrored
    })

    if (isEveryInputValid) {
      submitButton?.removeAttribute("disabled")
    } else {
      submitButton?.setAttribute("disabled", "true")
    }
  }

  onFormSubmit = (e: SubmitEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement

    const credentials = formToFieldData(form) as SignInCredentials
    this.props.store.dispatch(AuthActions.signIn, credentials)
  }

  render() {
    return /* html */ `
      {{#PageLayout}}
        <section class="signinCard">
          <h1 class="signinCard__heading">Вход</h1>
          <form action="POST" class="signinForm">
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
            {{{ Button
              text="Войти"
              type="submit"
              extraClass="signinForm__button"
              disabled=formInvalid
            }}}
            {{{ Link
              to="/sign-up"
              extraClass="signinForm__link"
              text="Зарегистрироваться"
            }}}
          </form>
        </section>
      {{/PageLayout}}
    `
  }
}
