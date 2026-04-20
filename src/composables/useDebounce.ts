import { ref, watch, type Ref } from 'vue'

export function useDebounce<T>(value: () => T, delay = 500): Ref<T> {
  const debouncedValue = ref<T>(value()) as Ref<T>

  watch(value, (newVal, _oldVal, onCleanup) => {
    const timer = setTimeout(() => {
      debouncedValue.value = newVal
    }, delay)

    onCleanup(() => clearTimeout(timer))
  })

  return debouncedValue
}
