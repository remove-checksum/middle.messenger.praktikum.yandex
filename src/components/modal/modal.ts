import { Block, BlockConstructable } from "../../core"
import { ControlledInput, FileInput } from "../index"
import "./modal.css"

export type ModalVariant =
  | "addUser"
  | "deleteUser"
  | "addFile"
  | "deleteChat"
  | "createChat"

const variants: VariantPropsMap = {
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
    warning: true,
  },
  addFile: {
    title: "Загрузите файл",
    buttonText: "Подтвердить",
    content: new FileInput({}),
  },
  deleteChat: {
    title: "Удалить чат",
    buttonText: "Удалить",
    warning: true,
  },
  createChat: {
    title: "Добавить чат",
    buttonText: "Добавить",
    content: new ControlledInput({
      placeholder: "Введите имя чата",
      name: "display_name",
      hasLabel: false,
      type: "text",
    }),
  },
}

export type ModalDispatch = (spec: ModalSpec | null) => void

export interface ModalSpec {
  title: string
  buttonText: string
  content: Block | null
  warning?: boolean
  confirm: (e: Event) => void
  cancel: (e: Event) => void
}

type ModalState = Omit<ModalSpec, "content"> & { content: HTMLElement | null }

interface ModalProps {
  spec: ModalSpec
}

export class Modal extends Block<ModalState> {
  static blockName = "Modal"

  constructor(props: ModalProps) {
    const {
      content = null,
      title,
      buttonText,
      warning = false,
      confirm,
      cancel,
    } = props.spec

    const replacer = content?.getContent() || null

    super({
      content: replacer,
      title,
      buttonText,
      warning,
      confirm,
      cancel,
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
    const { warning } = this.props

    return /* html */ `
      <div class="modal">
        <div class="modal__backdrop">
          <div class="modal__content">
            <button class="modal__closeButton">
              <i class="ph-x modal__closeIcon"></i>
            </button>
            <h2 class="modal__heading">{{title}}</h2>
            <div data-stub="${id}-modal"></div>
              {{{ Button
                text=buttonText
                onClick=confirm
                extraClass="modal__confirmButton"
                ${warning ? 'kind="warning"' : ""}
              }}}
          </div>
        </div>
      </div>
    `
  }
}
