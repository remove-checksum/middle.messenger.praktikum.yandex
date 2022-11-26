import { Block } from "../../core"
import { BlockProps } from "../../core/Block"
import "./button.css"

type ButtonKind = "warning" | "secondary"

interface ButtonProps extends BlockProps {
  text: string
  kind?: ButtonKind
  small?: boolean
  extraClass?: string
  events: {
    click: EventListener
  }
}

interface IncomingButtonProps {
  text: string
  kind?: ButtonKind
  small?: boolean
  extraClass?: string
  onClick: EventListener
}

export class Button extends Block<ButtonProps> {
  static blockName = "Button"

  constructor(props: IncomingButtonProps) {
    super({ ...props, events: { click: props.onClick } })
  }

  render(): string {
    return /* html */ `
      <button class="button
        {{#if kind}}
          button_{{kind}}
        {{/if}}
        {{#if small}}
          button_small
        {{/if}}
        {{#if extraClass}}
          {{extraClass}}
        {{/if}}"
        type="{{type}}">
        {{text}}
      </button>
    `
  }
}
