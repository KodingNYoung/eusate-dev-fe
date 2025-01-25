import { JSONValue } from "@/utils/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useMemo } from "react"

type BatchParams = {
  key: string
  value: string | null
}[]

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

  //   set the values for a batch of search params
  const batchSet = useCallback(
    (batch: BatchParams) => {
      const url = new URLSearchParams(searchParams)
      batch.forEach((entry) => {
        if (entry.value === null) {
          url.delete(entry.key)
        } else {
          url.set(entry.key, entry.value)
        }
      })
      router.replace("?" + url.toString())
    },
    [searchParams]
  )

  return useMemo(
    () => ({
      get,
      set,
      batchSet,
      searchParams: searchParams.toString(),
    }),
    [get, set, batchSet, searchParams]
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
