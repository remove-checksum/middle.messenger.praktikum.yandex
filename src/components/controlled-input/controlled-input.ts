import { Block } from "../../core"
import "./controlled-input.css"
import { validators } from "../../services"
import { UserCredentialsFields } from "../../models/forms"

interface ControlledInputProps {
  label: string
  hasLabel: boolean
  placeholder: string
  type: string
  name: UserCredentialsFields
  value?: string
  error?: true
  small?: true
  extraClass?: string
  disabled: boolean
  onFocus: (e: FocusEvent) => void
  onBlur: (e: FocusEvent) => void
  onInput: (e: InputEvent) => void
}

interface ControlledInputExternalProps {
  label: string
  hasLabel: boolean
  placeholder: string
  type: string
  name: UserCredentialsFields
  value?: string
  error?: true
  small?: true
  extraClass?: string
  disabled: boolean
  onFocus: (e: FocusEvent) => void
  onBlur: (e: FocusEvent) => void
  onInput: (e: InputEvent) => void
}

interface ControlledInputRefs extends AnyObject {
  inputRef: Block<EmptyObject>
  labelRef: Block<EmptyObject>
}

export class ControlledInput extends Block<
  ControlledInputProps,
  ControlledInputRefs
> {
  static blockName = "ControlledInput"

  constructor(props: ControlledInputExternalProps) {
    super({
      ...props,
      onBlur: (e: FocusEvent) => {
        if (!(e.target instanceof HTMLInputElement)) {
          console.error("Focus target not InputElement")
          return
        }

        const error = this.validate(e.target.value, props.name)

        if (error) {
          this.setErrorState(error)
        } else {
          this.removeErrorState()
        }
      },
      onFocus: (e: FocusEvent) => {
        if (!(e.target instanceof HTMLInputElement)) {
          console.error("Focus target not InputElement")
          return
        }

        const error = this.validate(e.target.value, props.name)

        if (error) {
          this.setErrorState(error)
        } else {
          this.removeErrorState()
        }
      },
      onInput: (e: InputEvent) => {
        if (!(e.target instanceof HTMLInputElement)) {
          console.error("Focus target not InputElement")
          return
        }

        const error = this.validate(e.target.value, props.name)
        if (error) {
          this.setErrorState(error)
        } else {
          this.removeErrorState()
        }
      },
    })
  }

  setErrorState(error: string) {
    const label = this.refs.labelRef.element

    if (label instanceof HTMLLabelElement) {
      label.style.display = "initial"
      label.innerText = error
      label.classList.add("controlledInput__label_error")
    }

    this.refs.inputRef.element?.classList.add("controlledInput_error")
  }

  removeErrorState() {
    const label = this.refs.labelRef.element

    if (label instanceof HTMLLabelElement) {
      label.style.display = "none"
      label.innerText = ""
      label.classList.remove("controlledInput__label_error")
    }

    this.refs.inputRef.element?.classList.remove("controlledInput_error")
  }

  validate(value: string, name: UserCredentialsFields) {
    return validators[name](value)
  }

  render(): string {
    return /* html */ `
        <div class="controlledInput__wrapper">
          {{{ InputLabel for=name error=error label="" ref="labelRef" }}}
          {{{ BaseInput
            name=name
            type=type
            id=name
            placeholder=placeholder
            error=error
            value=value
            extraClass=extraClass
            ref="inputRef"
            onFocus=onFocus
            onBlur=onBlur
            onInput=onInput
            disabled=disabled
          }}}
        </div>
      `
  }
}
