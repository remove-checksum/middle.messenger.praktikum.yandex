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
  UserCredentialsFields,
  SignUpFields,
  PasswordChangeFields,
  SignInFields,
} from "../../models"

export type InputFields =
  | UserCredentialsFields
  | SignInFields
  | SignUpFields
  | PasswordChangeFields

export const validators: Record<inputNames, Validator> = {
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
