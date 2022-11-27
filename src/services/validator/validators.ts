import errorMessages from "./errorMessages.json"
import { from, upto, notEmpty } from "./helpers"
import { MATCHERS } from "./matchers"

export interface Validator {
  (value: string): string
}

const passwordValidator: Validator = (value) => {
  const isValid =
    from(8)(value) && upto(40)(value) && MATCHERS.PASSWORD.test(value)

  return isValid ? "" : errorMessages.password.characters
}

const nameValidator: Validator = (value) => {
  const isValid =
    notEmpty(value) && upto(20)(value) && MATCHERS.NAME.test(value)

  return isValid ? "" : errorMessages.name.characters
}

const loginValidator: Validator = (value) => {
  const isValid =
    from(3)(value) && upto(20)(value) && MATCHERS.LOGIN.test(value)

  return isValid ? "" : errorMessages.login.characters
}

const emailValidator: Validator = (value) => {
  const isValid = upto(40)(value) && MATCHERS.EMAIL.test(value)
  return isValid ? "" : errorMessages.email.characters
}

const phoneValidator: Validator = (value) => {
  const isValid =
    from(10)(value) && upto(15)(value) && MATCHERS.PHONE.test(value)
  return isValid ? "" : errorMessages.phone.characters
}

const messageValidator: Validator = (value) => {
  const isValid = notEmpty(value)
  return isValid ? "" : errorMessages.message.empty
}

const displayNameValidator: Validator = (value) => {
  const isValid = upto(20)(value) && notEmpty(value)
  return isValid ? "" : errorMessages.display_name.empty
}

export {
  nameValidator,
  phoneValidator,
  emailValidator,
  loginValidator,
  passwordValidator,
  messageValidator,
  displayNameValidator,
}
