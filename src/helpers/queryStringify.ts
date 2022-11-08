export function queryStringify(data: UnknownObject) {
  const queryPairs = Object.entries(data)
    .map(([key, value]) => `${key}=${value}`)
    .join("&")

  return `?${queryPairs}`
}
