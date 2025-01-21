import { JSONValue } from "@/utils/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useMemo } from "react"

// Custom hook that builds on the useSearchParams to add the a `set` method
export const useQueryParams = () => {
  // hooks
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // functions
  // gets the value of a specific search parameter.
  const get = useCallback(
    (key: string): string | null => {
      return searchParams.get(key)
    },
    [searchParams]
  )
  // sets the value of a specific search parameter.
  const set = useCallback(
    (key: string, value: number | string | null) => {
      const url = new URLSearchParams(searchParams)
      if (value === null) {
        url.delete(key)
      } else {
        url.set(key, value.toString())
      }
      router.replace(pathname + "?" + url.toString())
    },
    [searchParams, pathname, router]
  )

  return useMemo(
    () => ({
      get,
      set,
      searchParams: searchParams.toString(),
    }),
    [get, set, searchParams]
  )
}

type Fn<T, K> = (...args: T[]) => K | void
// a custom debounce hook for functions
export const useDebounceCallback = <T = JSONValue, K = JSONValue>(
  fn: Fn<T, K>,
  delay: number
) => {
  let timer: NodeJS.Timeout
  return function (...args: T[]) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}
