import { Block } from "./Block"

export function renderDOM(selector: string, block: Block<any>) {
  const root = document.querySelector(selector)

  if (!root) {
    throw new Error("No root element")
  }

  root.innerHTML = ""
  const content = block.getContent()
  root.appendChild(content)
  block.dispatchComponentDidMount()
}
