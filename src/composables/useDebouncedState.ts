import { ref, customRef, type Ref, type UnwrapRef } from 'vue'

const createDebouncedFunction = <T>(
  fn: (value: T) => void,
  delay: number = 300
) => {
  let timeout: ReturnType<typeof setTimeout>
  return (value: T) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(value), delay)
  }
}

const useDebouncedState = <T>(
  initialValue: T,
  delay: number = 300
): Ref<UnwrapRef<T>> => {
  const valueRef = ref<UnwrapRef<T>>(initialValue as UnwrapRef<T>)

  return customRef<UnwrapRef<T>>((track, trigger) => {
    const setDebouncedValue = createDebouncedFunction<UnwrapRef<T>>(value => {
      valueRef.value = value
      trigger()
    }, delay)

    return {
      get() {
        track()
        return valueRef.value
      },
      set(value: UnwrapRef<T>) {
        setDebouncedValue(value)
      }
    }
  })
}

export default useDebouncedState
