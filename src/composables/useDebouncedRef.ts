import { ref, customRef, type Ref, type UnwrapRef } from 'vue'

/**
 * Debounce a function execution by a given delay.
 *
 * @param fn - The function to debounce.
 * @param delay - The delay in milliseconds before executing the function.
 * @returns A debounced function.
 */
const debounce = <T>(
  fn: (value: T) => void,
  delay: number = 300
): ((value: T) => void) => {
  let timeout: ReturnType<typeof setTimeout>
  return (value: T) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(value), delay)
  }
}

/**
 * Custom Vue ref with debounced updates.
 *
 * @param initialValue - The initial value of the ref.
 * @param delay - The delay in milliseconds before updating the ref's value.
 * @returns A Vue ref with debounced value updates.
 */
const useDebouncedRef = <T>(
  initialValue: T,
  delay: number = 300
): Ref<UnwrapRef<T>> => {
  const state = ref<UnwrapRef<T>>(initialValue as UnwrapRef<T>)

  return customRef<UnwrapRef<T>>((track, trigger) => {
    const debouncedSetter = debounce<UnwrapRef<T>>(value => {
      state.value = value
      trigger()
    }, delay)

    return {
      get() {
        track()
        return state.value
      },
      set(value: UnwrapRef<T>) {
        debouncedSetter(value)
      }
    }
  })
}

export default useDebouncedRef
