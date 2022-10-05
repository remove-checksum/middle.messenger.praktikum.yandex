const nameMatcher = /([a-zа-яё]*)(-?[a-zа-яё])([a-zа-яё]*)*$/i // english / russian / maybe hyphen in the middle
const loginMatcher = /^([a-zа-яё]*)((-|_)?[a-zа-яё]+)([a-zа-яё]*)*$/i // english / russian / maybe hyphen or underscore in the middle
const emailMatcher = /^[a-z]+@[a-z]+.[a-z]{2,}$/i // english / '@' in the middle / domain name > 2 after dot
const passwordMatcher = /^[a-z]*[A-Z]+[0-9]+[a-z]*$/i // english / numbers / at least one capital letter and number
const phoneMatcher = /^\+?([0-9])*/i // 10-15 numbers, may have '+' in the beginning

export {
  nameMatcher,
  loginMatcher,
  emailMatcher,
  passwordMatcher,
  phoneMatcher,
}
