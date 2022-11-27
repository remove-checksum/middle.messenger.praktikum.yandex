type PasswordChangeFieldName =
  | "old_password"
  | "new_password"
  | "repeat_new_password"

type SignInFieldName = "login" | "password"

type SignUpFieldName =
  | "first_name"
  | "second_name"
  | "login"
  | "email"
  | "phone"
  | "password"
  | "password_repeat"

type UserCredentialsFieldName =
  | "email"
  | "login"
  | "first_name"
  | "second_name"
  | "display_name"
  | "phone"

export {
  PasswordChangeFieldName,
  SignInFieldName,
  SignUpFieldName,
  UserCredentialsFieldName,
}
