import { Block } from "../../core"
import { ControlledInput, FileInput } from "../index"
import "./modal.css"

export type ModalVariant = "addUser" | "deleteUser" | "addFile" | "deleteChat"

interface ModalProps {
  variant: ModalVariant
  title: string
  buttonText: string
}

const variants = {
  addUser: {
    title: "Добавить пользователя",
    buttonText: "Добавить",
    content: new ControlledInput({
      placeholder: "Логин пользователя",
      name: "login",
      hasLabel: false,
      type: "text",
    }),
  },
  deleteUser: {
    title: "Удалить пользователя",
    buttonText: "Удалить",
    content: new ControlledInput({
      placeholder: "Логин пользователя",
      name: "login",
      hasLabel: false,
      type: "text",
    }),
  },
  addFile: {
    title: "Загрузите файл",
    buttonText: "Подтвердить",
    content: new FileInput(),
  },
  deleteChat: {
    title: "Удалить чат",
    buttonText: "Удалить",
    content: null,
  },
}

interface ModalProps {
  confirm: (e: Event) => void
  cancel: (e: Event) => void
  variant: ModalVariant
}

interface ModalState {
  title: string
  buttonText: string
  content: Nullable<HTMLElement>
  warning: boolean
}

export class Modal extends Block<ModalProps & ModalState> {
  static blockName = "Modal"

  constructor(props: ModalProps) {
    const { content, title, buttonText } = variants[props.variant]

    const replacer = content && content.getContent()

    super({
      ...props,
      content: replacer,
      title,
      buttonText,
      warning: props.variant === "deleteChat",
      events: {
        click: (e: MouseEvent) => {
          const isBackdrop = (e.target as HTMLElement).classList.contains(
            "modal__backdrop"
          )
          const isCloseButton = (e.target as HTMLElement).classList.contains(
            "modal__closeButton"
          )

          if (isBackdrop) {
            this.props.cancel(e)
          }

          if (isCloseButton) {
            this.props.cancel(e)
          }
        },
      },
    })
  }

  insertModalContent = () => {
    const stub = this.getContent().querySelector(
      `[data-stub="${this.id}-modal"]`
    )

    if (!stub) {
      return
    }

    if (this.props.content !== null) {
      stub.replaceWith(this.props.content)
    } else {
      stub.remove()
    }
  }

  componentDidMount(): void {
    this.insertModalContent()
  }

  render() {
    const { id } = this

    return /* html */ `
      <div class="modal">
        <div class="modal__backdrop">
          <div class="modal__content">
            <button class="modal__closeButton">
              <i class="ph-x modal__closeIcon"></i>
            </button>
            <h2 class="modal__heading">{{title}}</h2>
            <div data-stub="${id}-modal"></div>

            {{#if warning}}
              {{{ Button
                text=buttonText
                onClick=confirm
                extraClass="modal__confirmButton"
                kind="warning"
              }}}
            {{else}}
              {{{ Button
                text=buttonText
                onClick=confirm
                extraClass="modal__confirmButton"
              }}}
            {{/if}}
          </div>
        </div>
      </div>
    `
  }
}
