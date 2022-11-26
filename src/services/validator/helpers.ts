const notEmpty = (value: string) => value.length > 0
const from = (limit: number) => (value: string) => value.length >= limit
const upto = (limit: number) => (value: string) => value.length <= limit

export { notEmpty, from, upto }
