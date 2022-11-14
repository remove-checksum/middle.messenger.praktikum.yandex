import { AppState } from "./store"

const toKeyvalString = (hash: AnyObject) =>
  Object.entries(hash)
    .map(([key, val]) => {
      let displayVal = val

      if (val && val.blockName) {
        // val block
        displayVal = val.blocnName
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
    toKeyvalString(nextState)
  )
}
