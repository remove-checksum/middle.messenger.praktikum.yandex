export const Headers = {
  ContentType: {
    JSON: {
      "Content-Type": "application/json",
    },
    FormData: {
      "Content-Type": "multipart/formData",
    },
  },
} as const

export type ApiError = { reason: string }
