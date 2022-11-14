import { AppState } from "./store"
import { ApiErrorDto } from "../services/api/dto"

const toReadable = (hash: AnyObject) =>
  Object.entries(hash)
    .map(([key, val]) => {
      let displayVal = val
      if (val && val.blockName) {
        // val block
        displayVal = val.blockName
      }

      if (typeof val === "object" && val !== null) {
        displayVal = JSON.stringify(val, null, 2)
      }

      return `${key}: ${displayVal}`
    })
    .reduce((message, item) => `${message}\n${item}`, "")

export function logStore(prevState: AppState, nextState: AppState) {
  console.log(
    "%cstore updated",
    "background-color: #cccddd; color: #112233",
    `\n--------OLD STATE----------------${toReadable(prevState)}`,
    `\n--------NEW STATE----------------${toReadable(nextState)}`
  )
}

export function checkForError(response: unknown): response is ApiErrorDto {
  return (
    typeof response === "object" && response !== null && "reason" in response
  )
}
