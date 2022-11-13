import {
  messageValidator,
  Validator,
  nameValidator,
  phoneValidator,
  emailValidator,
  loginValidator,
  passwordValidator,
  displayNameValidator,
} from "./validators"
import {
  PasswordChangeFieldName,
  SignInFieldName,
  SignUpFieldName,
  UserCredentialsFieldName,
} from "../../models/forms"

export type InputFieldName =
  | PasswordChangeFieldName
  | SignInFieldName
  | SignUpFieldName
  | UserCredentialsFieldName
  | "message"

const validators: Record<InputFieldName, Validator> = {
  // user settings
  first_name: nameValidator,
  second_name: nameValidator,
  login: loginValidator,
  email: emailValidator,
  password: passwordValidator,
  password_repeat: passwordValidator,
  phone: phoneValidator,
  display_name: displayNameValidator,

  message: messageValidator,

  old_password: passwordValidator,
  new_password: passwordValidator,
  repeat_new_password: passwordValidator,
}

export const validate = <N extends InputFieldName>(
  name: N,
  value: string
): Nullable<string> => {
  const validatorForName = validators[name]
  if (!validatorForName) {
    throw new Error("No validator for given input name")
  }
  return validatorForName(value)
}
