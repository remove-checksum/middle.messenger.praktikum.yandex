export function queryStringify(data: EmptyObject) {
  const queryPairs = Object.entries(data)
    .map(([key, value]) => `${key}=${value}`)
    .join("&")

  return `?${queryPairs}`
}
