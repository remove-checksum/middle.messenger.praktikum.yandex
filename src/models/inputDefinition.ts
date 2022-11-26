type InputType = "text" | "password" | "email" | "tel"

export interface InputDefinition {
  name: string
  label: string
  value?: string
  input_type: InputType
}
