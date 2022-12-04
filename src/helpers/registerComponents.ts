import { registerComponent } from "../core"
import type { BlockConstructable } from "../core"
import * as Components from "../components"
import * as Layouts from "../layouts"

export const registerComponents = () => {
  Object.values({
    ...Layouts,
    ...Components,
  }).forEach((component) => {
    registerComponent(component as BlockConstructable<AnyObject>)
  })
}
