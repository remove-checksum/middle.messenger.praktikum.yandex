import Handlebars, { HelperOptions } from "handlebars"
import { BlockConstructable } from "./Block"

export function registerComponent<Props extends UnknownObject = AnyObject>(
  Component: BlockConstructable<Props>
) {
  // console.log(
  //   Component.blockName === "" ? Component.toString() : Component.blockName
  // )

  //   console.log({ Component: Component.blockName })

  Handlebars.registerHelper(
    Component.blockName,
    function componentFactory(
      this: Props,
      { hash: { ref, ...hash }, data, fn }: HelperOptions
    ) {
      const { children = {}, refs = {} } = data.root

      /**
       * Костыль для того, чтобы передавать переменные
       * внутрь блоков вручную подменяя значение
       */
      Object.keys(hash).forEach((key: keyof Props) => {
        if (this[key] && typeof this[key] === "string") {
          hash[key] = hash[key].replace(
            new RegExp(`{{${key as string}}}`, "i"),
            this[key]
          )
        }
      })

      const component = new Component(hash)

      children[component.id] = component

      if (ref) {
        refs[ref] = component
      }

      const contents = fn ? fn(this) : ""

      return `<div data-id="${component.id}">${contents}</div>`
    }
  )
}
