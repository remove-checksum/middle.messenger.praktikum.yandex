import { Block } from "./Block"

export function renderDOM(selector: string, block: Block) {
  const root = document.querySelector(selector)

  if (!root) {
    throw new Error("No root element")
  }

  root.innerHTML = ""
  root.appendChild(block.getContent())
  console.log(block.getContent())
}
