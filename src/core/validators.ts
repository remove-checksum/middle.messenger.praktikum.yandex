interface IValidator {
  (value: string): boolean
}

const notEmpty = (value: string) => value.length > 0
const longerThan = (value: string, len: number) => value.length > len
const notLongerThan = (value: string, len: number) => value.length <= len

const nameMatcher = /([a-zа-яё]*)(-[a-zа-яё]+)([a-zа-яё]*)*$/gi // english / russian / hyphen in the middle

const loginMatcher = /^([a-zа-яё]*)((-|_)[a-zа-яё]+)([a-zа-яё]*)*$/gi // english / russian / hyphen or underscore in the middle

const emailMatcher = /^[a-z]+@[a-z]+.[a-z]{2,}$/gi // english / '@' in the middle / domain name > 2 after dot

const passwordMatcher = /^[a-z]*[A-Z]+[0-9]+[a-z]*$/gi // english / numbers / at least one capital letter and number
const phoneMatcher = /^\+?([0-9]){10,15}/gi // 10-15 numbers, may have '+' in the beginning

export const validators: Record<string, IValidator> = {
  first_name: (value) => {
    return (
      nameMatcher.test(value) && notEmpty(value) && notLongerThan(value, 20)
    )
  },

  second_name: (value) => {
    return (
      nameMatcher.test(value) && notEmpty(value) && notLongerThan(value, 20)
    )
  },

  login: (value) => {
    return (
      loginMatcher.test(value) &&
      longerThan(value, 2) &&
      notLongerThan(value, 20)
    )
  },

  email: (value) => {
    return emailMatcher.test(value) && notLongerThan(value, 32)
  },

  password: (value) => {
    return (
      passwordMatcher.test(value) &&
      longerThan(value, 7) &&
      notLongerThan(value, 40)
    )
  },
  phone: (value) => {
    return phoneMatcher.test(value)
  },
  message: (value) => {
    return notEmpty(value)
  },
}
