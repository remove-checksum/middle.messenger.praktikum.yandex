// prettier-ignore
const MATCHERS = {
  NAME: /([a-zа-яё]*)[a-zа-яё-]*([a-zа-яё]*)*$/i,    // english / russian / maybe hyphen in the middle
  LOGIN: /^([a-zа-яё]*)[a-zа-яё_-]*([a-zа-яё]*)*$/i, // english / russian / maybe hyphen or underscore in the middle
  EMAIL: /^[a-z0-9]+@[a-z0-9]+\.([a-z]){2,}$/i,      // english / '@' in the middle / domain name > 2 after dot
  PASSWORD: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/, // english / numbers / at least one capital letter and number
  PHONE: /^\+?([0-9])*$/i,                           // 10-15 numbers, may have '+' in the beginning
}

export { MATCHERS }
