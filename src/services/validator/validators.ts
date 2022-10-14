import errorMessages from "./errorMessages.json"
import { from, upto, notEmpty } from "./helpers"
import { MATCHERS } from "./matchers"

export interface Validator {
  (value: string): string | null
}

const passwordValidator: Validator = (value) => {
  const valid =
    from(8)(value) && upto(40)(value) && MATCHERS.PASSWORD.test(value)

  return valid ? "" : errorMessages.password.characters
}

const nameValidator: Validator = (value) => {
  const valid = notEmpty(value) && upto(20)(value) && MATCHERS.NAME.test(value)

  return valid ? "" : errorMessages.name.characters
}

const loginValidator: Validator = (value) => {
  const valid = from(3)(value) && upto(20)(value) && MATCHERS.LOGIN.test(value)

  return valid ? "" : errorMessages.login.characters
}

const emailValidator: Validator = (value) => {
  const valid = upto(40)(value) && MATCHERS.EMAIL.test(value)
  return valid ? "" : errorMessages.email.characters
}

const phoneValidator: Validator = (value) => {
  const valid = from(10)(value) && upto(15)(value) && MATCHERS.PHONE.test(value)
  return valid ? "" : errorMessages.phone.characters
}

const messageValidator: Validator = (value) => {
  const valid = notEmpty(value)
  return valid ? "" : errorMessages.message.empty
}

const displayNameValidator: Validator = (value) => {
  const valid = upto(20)(value) && notEmpty(value)
  return valid ? "" : errorMessages.display_name.empty
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
