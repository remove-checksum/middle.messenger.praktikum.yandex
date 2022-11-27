import { Block } from "../../core"
import "./file-input.css"

interface FileInputProps {
  onFileSubmit: (file: File) => void
}

interface FileInputState {
  selectedFile: File | null
  selectedFileName: string
}

export class FileInput extends Block<FileInputProps & FileInputState> {
  static blockName = "FileInput"

  constructor(props: FileInputProps) {
    super({
      ...props,
      selectedFile: null,
      selectedFileName: "",
      events: {
        click: () => {
          this.triggerFileInput()
        },
        change: (e: Event) => {
          this.setFileName()
          e.stopPropagation()
        },
        input: (e) => {
          e.stopPropagation()
        },
      },
    })
  }

  getFileElement = () =>
    this.getContent().querySelector("input[type=file]") as HTMLInputElement

  setFileName = () => {
    const { files } = this.getFileElement()

    if (files && files[0]) {
      const selectedFile = files[0]

      this.setProps({ selectedFile, selectedFileName: selectedFile.name })
    }
  }

  triggerFileInput = () => {
    this.getFileElement().click()
  }

  render() {
    return /* html */ `
    <div class="fileInput">
      <input type="file" class="fileInput__input" accept="image/*">
      {{#if selectedFile }}
        <span class="fileInput__selectedName">{{selectedFileName}}</span>
      {{/if}}
      <button class="fileInput__button link" type="button">Выберите файл</button>
    </div>
    `
  }
}
