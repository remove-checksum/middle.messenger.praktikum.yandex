export function formatUTC(utc: string) {
  const date = new Date(utc)

  return `${date.getHours()}:${date.getMinutes()}`
}
