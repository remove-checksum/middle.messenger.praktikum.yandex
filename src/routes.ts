import * as Pages from "./pages"

export const routes = {
  "/not-found": Pages.NotFoundPage,
  "/server-error": Pages.ServerErrorPage,
  "/chat": Pages.ChatPage,
  "/profile": Pages.ProfilePage,
  "/sign-in": Pages.SignInPage,
  "/sign-up": Pages.SignUpPage,
} as const

export type Routes = keyof typeof routes
