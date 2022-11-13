export function targetHelper<T extends typeof HTMLElement, E extends Event>(
  elementToHandleOn: T,
  handler: (e: E) => void
) {
  return (e: E) => {
    if (e.target && e.target instanceof elementToHandleOn) {
      handler(e)
    }
  }
}
