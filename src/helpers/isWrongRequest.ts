import { ApiErrorDto } from "../services/api/dto"

export function withErrorReason(response: unknown): response is ApiErrorDto {
  return (
    typeof response === "object" && response !== null && "reason" in response
  )
}
