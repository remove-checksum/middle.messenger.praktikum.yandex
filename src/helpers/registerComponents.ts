import { registerComponent, BlockConstructable } from "../core"
import * as Components from "../components"
import * as Layouts from "../layouts"
import * as Pages from "../pages"

export const registerComponents = () => {
  Object.values({
    ...Layouts,
    ...Components,
    ...Pages,
  }).forEach((component) => {
    registerComponent(component as BlockConstructable<AnyObject>)
  })
}
