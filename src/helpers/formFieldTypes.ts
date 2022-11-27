type PasswordChange = "old_password" | "new_password" | "repeat_new_password"

type SignIn = "login" | "password"

type SignUp =
  | "first_name"
  | "second_name"
  | "login"
  | "email"
  | "phone"
  | "password"
  | "password_repeat"

type UserCredentials =
  | "email"
  | "login"
  | "first_name"
  | "second_name"
  | "display_name"
  | "phone"

export { PasswordChange, SignIn, SignUp, UserCredentials }
