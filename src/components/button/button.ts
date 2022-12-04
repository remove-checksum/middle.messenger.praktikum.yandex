import { Block } from "../../core/Block"
import "./button.css"

type ButtonKind = "warning" | "secondary"

interface ButtonProps {
  text: string
  kind?: ButtonKind
  small?: boolean
  extraClass?: string
  disabled: boolean
  onClick: EventListener
  type?: "submit" | "button"
}

interface ButtonState {
  classNames: string
  text: string
  disabled: boolean
  type?: "submit" | "button"
}

export default class Button extends Block<ButtonState> {
  static blockName = "Button"

  constructor(props: ButtonProps) {
    const cn = `button
      ${props.small ? "button_small" : ""}
      ${props.kind ? `button_${props.kind}` : ""}
      ${props.extraClass ? props.extraClass : ""}
      `
      .trim()
      .split("\n")
      .join(" ")

    super({
      type: props.type,
      classNames: cn,
      disabled: props.disabled,
      text: props.text,
      events: { click: props.onClick },
    })
  }

  render(): string {
    return /* html */ `
      <button
        class="{{ classNames }}"
        type="{{ type }}"
        {{#if disabled}}disabled{{/if}}
        {{#if type}}type="{{ type }}"{{/if}}
        >
        {{text}}
      </button>
    `
  }
}
