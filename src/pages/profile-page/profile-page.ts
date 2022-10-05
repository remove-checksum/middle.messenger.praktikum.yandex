import { Block } from "../../core"
import "./profile-page.css"
import userChangeData from "./user-data.json"
import passwordChangeData from "./password-change.json"
import { UserCredentialsFields } from "../../models/forms/user-credentials-change"

const userDisplayName = userChangeData.fields.display_name.value
const userFields = userChangeData.fields
const passwordFields = passwordChangeData.fields

const { avatar } = userChangeData
const avatarData = {
  url: avatar.url,
  inputLabel: avatar.label,
}

interface ProfilePageProps {
  avatarData: typeof avatarData
  fields: typeof userFields | typeof passwordFields
  heading: string
  inactive: boolean
  logout: VoidFunction
  toggleCredentialsChange: VoidFunction
  togglePasswordChange: VoidFunction
  endRedacting: VoidFunction
}

// has to be type, otherwise 'index signature is missing in type' error
type ProfilePageRefs = {
  credentialsButtonRef: Block
  passwordButtonRef: Block
  logoutButtonRef: Block
  endRedactingButtonRef: Block
}

export class ProfilePage extends Block<ProfilePageProps, ProfilePageRefs> {
  static blockName = "ProfilePage"

  constructor(props: ProfilePageProps) {
    super({
      ...props,
      inactive: true,
      fields: userFields,
      heading: userDisplayName,
      avatarData,
      toggleCredentialsChange: () => {
        this.setProps({
          fields: userFields,
          inactive: !this.props.inactive,
        })
      },
      endRedacting: () => {
        const form = this.getContent().querySelector("form")
        if (!form) {
          console.error("No form element found")
          return
        }
        const fd = new FormData(form).entries()
        const confirmMessage = Array.from(fd).reduce((acc, [key, value]) => {
          acc[key] = value
          return acc
        }, {} as EmptyObject) as Record<UserCredentialsFields, string>
        console.table(confirmMessage)

        this.setProps({ inactive: !this.props.inactive })
      },
      togglePasswordChange: () => {
        this.setProps({
          fields: passwordFields,
          inactive: !this.props.inactive,
        })
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
          <h2 class="profilePage__username">{{heading}}</h2>
          <form action="#">
            {{{ RedactableRows fields=fields inactive=inactive }}}
            <div class="profilePage__action-buttons">
              {{#if inactive}}
                {{{ Button text="Изменить данные"
                  extraClass="profilePage__button"
                  onClick=toggleCredentialsChange
                  ref=credentialsButtonRef
                }}}
                {{{ Button text="Изменить пароль"
                  extraClass="profilePage__button"
                  onClick=togglePasswordChange
                  ref=passwordButtonRef
                }}}
                {{{ Button text="Выйти"
                  kind="warning"
                  extraClass="profilePage__button"
                  onClick=logout
                  ref=logoutButtonRef
                }}}
              {{else}}
                {{{ Button text="Сохранить"
                  extraClass="profilePage__button"
                  onClick=endRedacting
                  ref=endRedactingButtonRef
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
