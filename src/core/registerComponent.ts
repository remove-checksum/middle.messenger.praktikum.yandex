import Handlebars, { HelperOptions } from "handlebars"
import { Block, BlockProps } from "./Block"

export interface BlockConstructable<Props extends BlockProps = AnyObject> {
  new (props: Props): Block<Props>
  blockName: string
}

export function registerComponent<Props extends UnknownObject = AnyObject>(
  Component: BlockConstructable<Props>
) {
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
