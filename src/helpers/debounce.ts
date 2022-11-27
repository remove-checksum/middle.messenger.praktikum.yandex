interface Debounce {
  (fn: (...args: any) => any, time: number): ReturnType<typeof fn>
}

export const debounce: Debounce = (fn, time) => {
  let timer: number

  return function debouncedFunction(...args: unknown[]) {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn(...args)
    }, time)
  }
}
