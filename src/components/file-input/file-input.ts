import { Block } from "../../core"
import "./file-input.css"

interface FileInputProps {}

interface FileInputState {
  selectedFileName: Nullable<string>
}

export class FileInput extends Block<FileInputProps & FileInputState> {
  static blockName = "FileInput"

  constructor(props: FileInputProps) {
    super({
      ...props,
      selectedFileName: null,
      events: {
        click: (e: MouseEvent) => {
          const fileInput = this.element?.querySelector(
            "input[type=file]"
          ) as HTMLInputElement

          if (e.target instanceof HTMLButtonElement) {
            fileInput.click()
          }
        },
        change: ({ target }: Event) => {
          if (target instanceof HTMLInputElement) {
            if (target.files?.length) {
              const file = target.files[0]

              this.setProps({ selectedFileName: file.name })
            }
          }
        },
      },
    })
  }

  render() {
    return /* html */ `
    <div class="fileInput">
      <input type="file" class="fileInput__input">
      {{#if selectedFile}}
        <span class="fileInput__selectedName">{{selectedFile}}</span>
      {{/if}}
      <button class="fileInput__button link">Выберите файл</button>
    </div>
    `
  }
}
