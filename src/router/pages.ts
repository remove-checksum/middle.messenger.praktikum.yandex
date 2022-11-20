import {
  ChatPage,
  ProfilePage,
  SignUpPage,
  NotFoundPage,
  ServerErrorPage,
  SignInPage,
} from "../pages"

import { BlockConstructable } from "../core"

export const Page = {
  SignIn: "/sign-in",
  SignUp: "/sign-up",
  Chat: "/chats",
  Profile: "/profile",
  NotFound: "/not-found",
  ServerError: "/server-error",
} as const

export type Page = typeof Page[keyof typeof Page]

const PageHash = {
  [Page.SignIn]: SignInPage,
  [Page.SignUp]: SignUpPage,
  [Page.Chat]: ChatPage,
  [Page.Profile]: ProfilePage,
  [Page.NotFound]: NotFoundPage,
  [Page.ServerError]: ServerErrorPage,
}

export const getBlockByPage = (page: Page): BlockConstructable => PageHash[page]
