import { Block } from "../../core"
import userPublicInfo from "./user-data.json"
import passwordChangeData from "./password-change.json"
import { StoreContext } from "../../hoc/withStore"
import { AuthActions, ProfileActions } from "../../store/actions"
import { User, UserPublicInfo } from "../../services/api/User"
import { AppState } from "../../store"
import { INPUT_ERROR_CLASS } from "../../components/controlled-input/controlled-input"
import { FileInput } from "../../components"
import { Page } from "../../router/pages"
import { ModalDispatch, ModalSpec } from "../../components/modal/modal"
import "./profile-page.css"

type FormType = "password" | "publicInfo"

const formTypeMap = {
  password: passwordChangeData.fields,
  publicInfo: userPublicInfo.fields,
} as const

type ProfilePageProps = {
  user: User
} & StoreContext

interface ProfilePageState {
  redactable: boolean
  fields: typeof formTypeMap[FormType]
  logout: VoidFunction
  toggleCredentialsChange: VoidFunction
  togglePasswordChange: VoidFunction
  endRedacting: VoidFunction
  modalSpec: ModalSpec | null
  openModal: ModalDispatch

  user: User
}

export default class ProfilePage extends Block<
  ProfilePageState & StoreContext
> {
  static blockName = "ProfilePage"

  constructor(props: ProfilePageProps) {
    super({
      store: props.store,
      user: props.user,
      redactable: true,
      modalSpec: null,
      openModal: () => {
        const block = new FileInput({
          onFileSubmit: this.submitAvatarChange,
        })

        this.setProps({
          modalSpec: {
            content: block,
            title: "Добавить аватар",
            buttonText: "Добавить",
            cancel: () => {
              this.setProps({ modalSpec: null })
            },
            confirm: () => {
              const file = block.getProps().selectedFile
              if (file) {
                this.submitAvatarChange(file)
                this.setProps({ modalSpec: null })
              }
            },
          },
        })
      },
      fields: formTypeMap.publicInfo,
      toggleCredentialsChange: () => {
        this.setProps({
          fields: formTypeMap.publicInfo,
          redactable: !this.props.redactable,
        })
      },
      endRedacting: () => {
        this.setProps({ redactable: !this.props.redactable })
      },
      togglePasswordChange: () => {
        this.setProps({
          fields: formTypeMap.password,
          redactable: !this.props.redactable,
        })
      },
      logout: () => {
        this.props.store.dispatch(AuthActions.signOut)
      },
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault()

          const isFormSubmitButton = e.submitter?.classList.contains(
            ".profilePage__submit"
          )

          if (this.props.redactable && isFormSubmitButton) {
            this.submitUserChange()
          }
        },
        input: (e) => {
          if (e.target instanceof HTMLInputElement) {
            this.canSubmit()
          }
        },
        click: (e) => {
          const isCloseButton =
            e.target instanceof HTMLButtonElement &&
            e.target.classList.contains("closeButton")
          const isSubmitButton =
            e.target instanceof HTMLButtonElement &&
            e.target.classList.contains("profilePage__submit")

          if (isCloseButton) {
            window.__internals.router.go(Page.Chat)
          }

          if (isSubmitButton) {
            this.submitUserChange()
          }
        },
      },
    })
  }

  getFormElements = () => {
    const submitButton = this.getContent().querySelector(
      "button.profilePage__submit"
    ) as HTMLButtonElement
    const cancelButton = this.getContent().querySelector(
      "button.profilePage__cancel"
    ) as HTMLButtonElement
    const form = this.getContent().querySelector(
      "form.profilePage__form"
    ) as HTMLFormElement

    const formInputs = Array.from(form.elements).filter(
      (element) => element instanceof HTMLInputElement
    ) as HTMLInputElement[]

    return { submitButton, cancelButton, form, formInputs }
  }

  canSubmit = () => {
    const { submitButton, formInputs } = this.getFormElements()

    const formType: FormType = formInputs.some(
      (input) => input.name === "new_password"
    )
      ? "password"
      : "publicInfo"

    const hasErrors = formInputs.some((input) =>
      input.classList.contains(INPUT_ERROR_CLASS)
    )

    const hasEmptyFields = formInputs.some((input) => input.value === "")
    const isIncompletePasswordForm = formType === "password" && hasEmptyFields
    const [newPassword, repeatNewPassword] = formInputs.filter((input) =>
      input.name.match("(new_password|repeat_new_password)")
    )

    const sameRepeatPassword =
      formType === "publicInfo" || newPassword.value === repeatNewPassword.value

    if (hasErrors || isIncompletePasswordForm || !sameRepeatPassword) {
      submitButton.setAttribute("disabled", "")
    } else {
      submitButton.removeAttribute("disabled")
    }
  }

  submitUserChange = () => {
    const { form } = this.getFormElements()

    const formData = Array.from(new FormData(form).entries()).reduce(
      (acc, [key, value]) => {
        if (typeof value === "string" && value !== "") {
          acc[key as keyof UserPublicInfo] = value
        }
        return acc
      },
      {} as UserPublicInfo
    )

    const isPasswordForm = "new_password" in formData

    if (isPasswordForm) {
      this.props.store.dispatch(ProfileActions.changePassword, formData)
    } else {
      this.props.store.dispatch(ProfileActions.changePublicInfo, formData)
    }
  }

  submitAvatarChange = (file: File) => {
    // FormData made from FormElement sends correct preflight request
    const form = document.createElement("form")
    form.method = "put"

    const formData = new FormData(form)

    formData.append("avatar", file, file.name)

    this.props.store.dispatch(ProfileActions.changeAvatar, { formData })
  }

  render() {
    return /* html */ `
      {{#PageLayout}}
        <section class="profilePage">
          <button class="closeButton profilePage__close-button">
            <i class="ph-x closeButton__icon"></i>
          </button>
          {{{ Avatar
            inputLabel="Выберите аватар"
            imgUrl=user.avatar
            onImageClick=openModal
          }}}
          <h2 class="profilePage__username">{{ user.display_name }}</h2>
          <form action="POST" class="profilePage__form">
            {{{ RedactableRows
              fields=fields
              inactive=redactable
              user=user
            }}}
            <div class="profilePage__action-buttons">
              {{#if redactable}}
                {{{ Button
                  text="Изменить данные"
                  extraClass="profilePage__button"
                  onClick=toggleCredentialsChange
                }}}
                {{{ Button
                  text="Изменить пароль"
                  extraClass="profilePage__button"
                  onClick=togglePasswordChange
                }}}
                {{{ Button
                  text="Выйти"
                  kind="warning"
                  extraClass="profilePage__button"
                  onClick=logout
                  type="button"
                }}}
              {{else}}
                {{{ Button
                  text="Сохранить"
                  extraClass="profilePage__button profilePage__submit"
                  onClick=endRedacting
                  type="submit"
                  disabled=true
                }}}
                {{{ Button
                  text="Отменить"
                  kind="secondary"
                  extraClass="profilePage__button profilePage__cancel"
                  onClick=endRedacting
                  type="button"
                }}}
              {{/if}}
              {{#if modalSpec}}
                {{{ Modal spec=modalSpec }}}
              {{/if}}
            </div>
          </form>
        </section>
      {{/PageLayout}}
    `
  }
}

export const mapProfilePageProps = (state: AppState) => ({
  user: state.user,
})
