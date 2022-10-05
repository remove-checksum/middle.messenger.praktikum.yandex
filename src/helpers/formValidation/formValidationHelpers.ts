import { validators, InputFields } from "../../services"

type InputWithError = {
  input: HTMLInputElement
  label: HTMLLabelElement
  error: string | null
}

const inputsWithErrors = (form: HTMLFormElement) =>
  [...form.elements]
    .filter((e) => e instanceof HTMLInputElement)
    .map((input) => {
      if (!(input instanceof HTMLInputElement)) {
        throw new Error("No viable inputs")
      }
      const error = validators[input.name as InputFields](input.value)

      return {
        label: input.previousElementSibling,
        input,
        error,
      }
    }) as unknown as InputWithError[]

const onFormErrorSubmit = (form: HTMLFormElement) => {
  const elements = inputsWithErrors(form) as InputWithError[]
  elements.forEach(({ label, input, error }) => {
    if (error) {
      label.style.display = "initial"
      label.innerText = error
      label.classList.add("controlledInput__label_error")
      input.classList.add("controlledInput_error")
    } else {
      label.style.display = "none"
      label.innerText = ""
      label.classList.remove("controlledInput__label_error")
      input.classList.remove("controlledInput_error")
    }
  })

  return elements.every((e) => e.error !== "string")
}

export { onFormErrorSubmit }
