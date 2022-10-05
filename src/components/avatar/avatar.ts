import { Block } from "../../core"
import "./avatar.css"

// @ts-expect-error 'resolving path to image
const catPictureUrl = new URL("../../assets/catpix.jpeg", import.meta.url)

interface AvatarProps {
  avatarUrl: string
  inputLabel: string
  inputName: string
}

export class Avatar extends Block<AvatarProps> {
  static blockName = "Avatar"

  constructor(props: AvatarProps) {
    const urlString = catPictureUrl as unknown as string

    super({ ...props, avatarUrl: urlString })
  }

  render(): string {
    return /* html */ `
      <picture class="avatar">
        <label class="avatar__overlay">
          <span class="avatar__label-text">
            {{inputLabel}}
          </span>
          <input class="avatar__input" type="file" name="{{inputName}}" />
        </label>
        <img src="{{avatarUrl}}" alt="Аватар пользователя" class="avatar__image" />
      </picture>
    `
  }
}
