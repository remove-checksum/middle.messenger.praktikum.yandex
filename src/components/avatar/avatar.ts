import { Block } from "../../core"
import avatarFallback from "../../assets/avatar_not_found.png"
import "./avatar.css"

interface AvatarProps {
  avatarUrl: string
  onImageClick: VoidFunction
}

export class Avatar extends Block<AvatarProps> {
  static blockName = "Avatar"

  constructor(props: AvatarProps) {
    super({
      avatarUrl: props.avatarUrl || avatarFallback,
      onImageClick: props.onImageClick,
      events: {
        click: (e) => {
          const isAvatarOverlay =
            e.target instanceof HTMLDivElement &&
            e.target.classList.contains("avatar__overlay")
          if (isAvatarOverlay) {
            this.props.onImageClick()
          }
        },
      },
    })
  }

  render(): string {
    return /* html */ `
      <picture class="avatar">
          <div class="avatar__overlay">
            <span class="avatar__labelText">
              Выберите аватар
            </span>
          </div>
        <img src="{{avatarUrl}}" alt="Аватар пользователя" class="avatar__image" />
      </picture>
    `
  }
}
