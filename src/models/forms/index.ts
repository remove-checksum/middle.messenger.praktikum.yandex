type PasswordChangeFields =
  | "old_password"
  | "new_password"
  | "repeat_new_password"

type SignInFields = "login" | "password"

type SignUpFields =
  | "first_name"
  | "second_name"
  | "login"
  | "email"
  | "phone"
  | "password"
  | "password_repeat"

type UserCredentialsFields =
  | "email"
  | "login"
  | "first_name"
  | "second_name"
  | "display_name"
  | "phone"

export {
  PasswordChangeFields,
  SignInFields,
  SignUpFields,
  UserCredentialsFields,
}
