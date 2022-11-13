export type ApiErrorDto = {
  reason: string
}

export type UserDto = {
  id: number
  login: string
  first_name: string
  second_name: string
  display_name: string
  avatar: string
  phone: string
  email: string
}

export type LastMessage = {
  user: Omit<UserDto, "id" | "display_name">
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

export type ChatTokenDto = {
  token: string
}

export type ChatDeletedDto = {
  userId: number
  result: {
    id: number
    title: string
    avatar: string
  }
}

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
