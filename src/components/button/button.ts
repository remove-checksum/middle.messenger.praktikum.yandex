import { Block } from "../../core"
import "./button.css"

type ButtonKind = "warning" | "secondary"

interface ButtonProps {
  text: string
  kind?: ButtonKind
  small?: boolean
  extraClass?: string
  disabled?: boolean
  onClick: EventListener
}

interface ButtonState {
  classNames: string
  text: string
  disabled: boolean
}
export class Button extends Block<ButtonState> {
  static blockName = "Button"

  constructor(props: ButtonProps) {
    const cn = `
      button
      ${props.small ? "button_small" : ""}
      ${props.kind ? `button_${props.kind}` : ""}
      ${props.extraClass ? props.extraClass : ""}
      `.trim()
    super({
      classNames: cn,
      disabled: props.disabled || false,
      text: props.text,
      events: { click: props.onClick },
    })
  }

  render(): string {
    return /* html */ `
      <button class="{{ classNames }}"
        type="{{ type }}"
        {{#if disabled}}disabled{{/if}}>
        {{text}}
      </button>
    `
  }
}
