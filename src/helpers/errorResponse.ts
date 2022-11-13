import { ApiError } from "../services/api"

export function errorResponse(response): response is ApiError {
  return response?.reason
}
