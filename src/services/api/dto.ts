/* --------- AUTH --------- */

export type GetUserDto = {
  id: number
  first_name: string
  second_name: string
  dispay_name: string
  login: string
  email: string
  phone: string
  avatar: string
}

export type SignUpDto = {
  id: number
}

export type ApiErrorDto = {
  reason: string
}

/* --------- CHAT --------- */

type UserPublicInfo = Pick<
  GetUserDto,
  "first_name" | "second_name" | "avatar" | "email" | "login" | "phone"
>

type LastMessage = {
  user: UserPublicInfo
  time: string
  content: string
}

export type ChatDto = {
  id: number
  title: string
  avatar: string
  unread_count: number
  last_message: LastMessage
}

export type ChatDeletedDto = {
  userId: number
  result: {
    id: number
    title: string
    avatar: string
  }
}

export type ChatUserDto = {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string
  role: "admin" | "user"
}

export type ChatAddUsersDto = {
  users: number[]
  chatId: number
}

export type ChatRemovedUsersDto = {
  users: number[]
  chatId: number
}

export type ChatTokenDto = {
  token: string
}

/* --------- MESSAGES --------- */

export type MessageDto = {
  chat_id: number
  time: string
  type: string
  user_id: number
  content: string
  file?: {
    id: number
    user_id: number
    path: string
    filename: string
    content_type: string
    content_size: number
    upload_date: string
  }
}
