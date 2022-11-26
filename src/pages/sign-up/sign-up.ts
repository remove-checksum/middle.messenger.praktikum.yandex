import { Block } from "../../core"
import signupFormData from "./sign-up.json"
import { formToFieldData } from "../../helpers/formHelpers/formHelpers"
import { AuthActions } from "../../store/actions"
import { StoreContext } from "../../hoc/withStore"
import "./sign-up.css"

interface SignUpPageState {
  signUp: typeof signupFormData
}

export default class SignUpPage extends Block<StoreContext & SignUpPageState> {
  static blockName = "SignUpPage"

  constructor(props: StoreContext) {
    super({
      ...props,
      signUp: signupFormData,
    })

    this.setProps({
      events: {
        submit: this.onFormSubmit,
        input: this.onFormInput,
      },
    })
  }

  onFormSubmit = (e: SubmitEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement

    const credentials = formToFieldData(form)

    this.props.store.dispatch(AuthActions.signUp, credentials)
  }

  onFormInput = () => {
    this.checkRepeatPassword()
    this.activateFormSubmit()
  }

  checkRepeatPassword = () => {
    const [password, repeatPassword] = this.getContent().querySelectorAll(
      "input[type=password]"
    ) as NodeListOf<HTMLInputElement>
    const passwordsMatch = password.value === repeatPassword.value

    if (!passwordsMatch) {
      const label = repeatPassword.previousElementSibling as HTMLLabelElement
      const labelError = label.classList.contains(
        "controlledInput__label_error"
      )
      if (label && labelError) {
        label.innerText = "Пароли не совпадают"
      }
    }
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
                to="/sign-in"
                extraClass="signupForm__link"
                text="Войти"
              }}}
            </form>
        </section>
      {{/PageLayout}}
    `
  }
}
