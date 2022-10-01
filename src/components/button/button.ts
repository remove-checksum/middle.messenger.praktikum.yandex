import { Block } from "../../core"
import "./button.css"

type ButtonKind = "warning" | "secondary"

interface ButtonProps {
  text: string
  kind?: ButtonKind
  small?: boolean
  extraClass?: string
  onClick?: (e: MouseEvent) => void
}

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({ ...props, events: { click: props.onClick } })
  }

  render(): string {
    const { kind, small, extraClass = "" } = this.props

    return /*html*/ `
      <button class="button
        ${kind ? `button_${kind}` : ""}
        ${small ? "button_small" : ""}
        ${extraClass}"
        type="{{type}}">
        {{text}}
      </button>
    `
  }
}
