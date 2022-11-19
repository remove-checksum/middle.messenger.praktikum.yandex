import { Block } from "../../core"
import "./profile-page.css"
import userChangeData from "./user-data.json"
import passwordChangeData from "./password-change.json"
import { printFormData } from "../../helpers/formHelpers/formHelpers"
import { StoreContext, withStore } from "../../hoc/withStore"
import { AuthActions } from "../../store/actions"
import { User } from "../../services/api/User"

const userDisplayName = userChangeData.fields.display_name.value
const userFields = userChangeData.fields
const passwordFields = passwordChangeData.fields

const { avatar } = userChangeData
const avatarData = {
  url: avatar.url,
  inputLabel: avatar.label,
}

interface ProfilePageProps {
  user: User
}

interface ProfilePageState {
  redactable: boolean
  fields: typeof userFields | typeof passwordFields
  logout: VoidFunction
  toggleCredentialsChange: VoidFunction
  togglePasswordChange: VoidFunction
  endRedacting: VoidFunction
}

export class ProfilePage extends Block<
  ProfilePageState & StoreContext & ProfilePageProps
> {
  static blockName = "ProfilePage"

  constructor(props: ProfilePageProps & StoreContext) {
    super({
      ...props,
      redactable: true,
      fields: userFields,
      toggleCredentialsChange: () => {
        this.setProps({
          fields: userFields,
          redactable: !this.props.redactable,
        })
      },
      endRedacting: () => {
        const form = this.getContent().querySelector("form") as HTMLFormElement

        const formInvalid = Array.from(form.elements).some((element) =>
          element.classList.contains("controlledInput__input_error")
        )
        if (!formInvalid) {
          printFormData(form)
        }

        this.setProps({ redactable: !this.props.redactable })
      },
      togglePasswordChange: () => {
        this.setProps({
          fields: passwordFields,
          redactable: !this.props.redactable,
        })
      },
      logout: () => {
        this.props.store.dispatch(AuthActions.signOut)
      },
    })
  }

  render() {
    return /* html */ `
      {{#PageLayout}}
        <section class="profilePage">
          <button class="closeButton profilePage__close-button">
            <i class="ph-x closeButton__icon"></i>
          </button>
          {{{ Avatar inputLabel=avatarData.inputLabel inputName="avatar" imgUrl=avatarData.url }}}
          <h2 class="profilePage__username">{{ user.display_name }}</h2>
          <form action="#">
            {{{ RedactableRows fields=fields inactive=redactable }}}
            <div class="profilePage__action-buttons">
              {{#if redactable}}
                {{{ Button text="Изменить данные"
                  extraClass="profilePage__button"
                  onClick=toggleCredentialsChange
                }}}
                {{{ Button text="Изменить пароль"
                  extraClass="profilePage__button"
                  onClick=togglePasswordChange
                }}}
                {{{ Button text="Выйти"
                  kind="warning"
                  extraClass="profilePage__button"
                  onClick=logout
                }}}
              {{else}}
                {{{ Button text="Сохранить"
                  extraClass="profilePage__button"
                  onClick=endRedacting
                  type="submit"
                }}}
              {{/if}}
            </div>
          </form>
        </section>
      {{/PageLayout}}
    `
  }
}

export default withStore(ProfilePage, (state) => ({
  user: state.user,
}))
