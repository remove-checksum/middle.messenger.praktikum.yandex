interface IValidatorResult {
  valid: boolean
  errors: string[]
}

interface IValidator {
  (value: string): IValidatorResult
}

type IMatcher = (value: string) => boolean
type IValidatorRule = [IMatcher, string]

function validateWithErrors(
  rules: IValidatorRule[],
  value: string
): IValidatorResult {
  const errors: string[] = []
  rules.forEach(([validator, error]) => {
    if (!validator(value)) {
      errors.push(error)
    }
  })

  return {
    errors,
    valid: errors.length === 0,
  }
}

const notEmpty = (value: string) => value.length > 0
const longerThan = (len: number, value: string) => value.length > len
const notLongerThan = (len: number, value: string) => value.length <= len

const nameMatcher = /([a-zа-яё]*)(-?[a-zа-яё])([a-zа-яё]*)*$/i // english / russian / maybe hyphen in the middle

const loginMatcher = /^([a-zа-яё]*)((-|_)?[a-zа-яё]+)([a-zа-яё]*)*$/i // english / russian / maybe hyphen or underscore in the middle

const emailMatcher = /^[a-z]+@[a-z]+.[a-z]{2,}$/i // english / '@' in the middle / domain name > 2 after dot

const passwordMatcher = /^[a-z]*[A-Z]+[0-9]+[a-z]*$/i // english / numbers / at least one capital letter and number
const phoneMatcher = /^\+?([0-9])*/i // 10-15 numbers, may have '+' in the beginning

const errorMessages = {
  name: {
    characters: "Кириллица / латиница, -",
    tooLong: "Не длиннее 20 символов",
    empty: "Не может быть пустым",
  },
  login: {
    characters: "Кириллица / латиница, - _",
    tooLong: "Не длиннее 20 символов",
    tooShort: "Не короче 2 символов",
  },
  email: {
    characters: "Собака, в конце имя домена",
    empty: "Не может быть пустым",
    tooLong: "Не длиннее 40 символов",
  },
  password: {
    characters: "Латиница, одна заглавная буква и цифра",
    tooLong: "Не длиннее 40 символов",
    tooShort: "Не короче 8 символов",
  },
  phone: {
    characters: "Цифры, может начинаться с плюса",
    tooShort: "Не короче 10 цифр",
    tooLong: "Не длиннее 15 цифр",
  },
  message: {
    empty: "Не может быть пустым",
  },
  display_name: {
    empty: "Не может быть пустым",
    tooLong: "Не длиннее 20 символов",
  },
}

export const validators: Record<string, IValidator> = {
  first_name: (value) => {
    const under20 = notLongerThan.bind(null, 20)
    const nameMatches = nameMatcher.test.bind(nameMatcher)

    const rules: IValidatorRule[] = [
      [nameMatches, errorMessages.name.characters],
      [notEmpty, errorMessages.name.empty],
      [under20, errorMessages.name.tooLong],
    ]

    return validateWithErrors(rules, value)
  },

  second_name: (value) => {
    const under20 = notLongerThan.bind(null, 20)
    const nameMatches = nameMatcher.test.bind(nameMatcher)

    const rules: IValidatorRule[] = [
      [nameMatcher.test.bind(nameMatcher), errorMessages.name.characters],
      [notEmpty, errorMessages.name.empty],
      [under20, errorMessages.name.tooLong],
    ]

    return validateWithErrors(rules, value)
  },

  login: (value) => {
    const isNotTooShort = longerThan.bind(null, 7)
    const isNotTooLong = notLongerThan.bind(null, 20)
    const loginMatches = loginMatcher.test.bind(loginMatcher)

    const rules: IValidatorRule[] = [
      [loginMatches, errorMessages.login.characters],
      [isNotTooShort, errorMessages.login.tooShort],
      [isNotTooLong, errorMessages.login.tooLong],
    ]

    return validateWithErrors(rules, value)
  },

  email: (value) => {
    const isNotTooLong = notLongerThan.bind(null, 40)
    const emailMatches = emailMatcher.test.bind(emailMatcher)

    const rules: IValidatorRule[] = [
      [emailMatches, errorMessages.email.characters],
      [notEmpty, errorMessages.email.empty],
      [isNotTooLong, errorMessages.email.tooLong],
    ]

    return validateWithErrors(rules, value)
  },

  password: (value) => {
    const isNotTooShort = longerThan.bind(null, 7)
    const isNotTooLong = notLongerThan.bind(null, 40)
    const passwordMatches = passwordMatcher.test.bind(passwordMatcher)

    const rules: IValidatorRule[] = [
      [passwordMatches, errorMessages.password.characters],
      [isNotTooShort, errorMessages.password.tooShort],
      [isNotTooLong, errorMessages.password.tooLong],
    ]

    return validateWithErrors(rules, value)
  },
  phone: (value) => {
    const isNotTooShort = longerThan.bind(null, 9)
    const isNotTooLong = notLongerThan.bind(null, 15)
    const phoneMatches = phoneMatcher.test.bind(phoneMatcher)

    const rules: IValidatorRule[] = [
      [phoneMatches, errorMessages.phone.characters],
      [isNotTooShort, errorMessages.phone.tooShort],
      [isNotTooLong, errorMessages.phone.tooLong],
    ]

    return validateWithErrors(rules, value)
  },
  message: (value) => {
    const rules: IValidatorRule[] = [[notEmpty, errorMessages.message.empty]]

    return validateWithErrors(rules, value)
  },
  display_name: (value) => {
    const isNotTooLong = notLongerThan.bind(null, 20)
    const rules: IValidatorRule[] = [
      [notEmpty, errorMessages.display_name.empty],
      [isNotTooLong, errorMessages.display_name.tooLong],
    ]
    return validateWithErrors(rules, value)
  },
}
