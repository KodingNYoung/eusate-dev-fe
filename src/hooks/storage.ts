import { CookieStorage } from "@/utils/classes"
import { CookieKeys, StorageKeys } from "@/utils/types"
import { useCallback, useEffect, useMemo, useState } from "react"

type StorageOptions<T> = {
  fallback?: T
  storage: Storage
}
export const useStorage = <T = unknown>(
  key: StorageKeys,
  options: StorageOptions<T> = { storage: localStorage }
) => {
  const [_value, setValue] = useState<T>()

  const set = useCallback(
    (value: T) => {
      if (value === _value) {
        return
      }
      setValue(value ?? options.fallback)
      if (value !== null) {
        options.storage.setItem(key, JSON.stringify(value))
      } else if (options.fallback !== undefined) {
        options.storage.setItem(key, JSON.stringify(options.fallback))
      } else if (options.fallback === undefined) {
        options.storage.removeItem(key)
      }
    },
    [_value, key]
  )

  const refetch = useCallback(() => {
    const inStorageValue = options.storage.getItem(key)
    try {
      if (inStorageValue) {
        const parsedValue = JSON.parse(inStorageValue) as T
        setValue(parsedValue)
      } else {
        throw new Error()
      }
    } catch {
      setValue(options.fallback)
    }
  }, [options, key])

  useEffect(() => {
    refetch()
  }, [key, options.fallback])

  return useMemo(
    () => ({
      data: _value,
      set,
      refetch,
    }),
    [_value, set, refetch]
  )
}

export function useCookie<T>(key: CookieKeys, fallback?: T) {
  const [_data, _setData] = useState<T>()

  const set = useCallback(
    (data: T, expires: Date | undefined) => {
      if (data === _data) return

      _setData(data ?? fallback)
      if (data !== null) {
        CookieStorage.set(key, JSON.stringify(data), expires)
      } else if (fallback !== undefined) {
        CookieStorage.set(key, JSON.stringify(fallback), expires)
      } else if (fallback === undefined) {
        CookieStorage.unset(key)
      }
    },
    [key]
  )

  const refetch = useCallback(() => {
    const inStorageValue = CookieStorage.get(key)
    console.log({ inStorageValue })
    try {
      if (inStorageValue) {
        const parsedValue = JSON.parse(inStorageValue) as T
        _setData(parsedValue)
      } else {
        throw new Error()
      }
    } catch {
      _setData(fallback)
    }
  }, [fallback, key])

  useEffect(() => {
    refetch()
  }, [fallback, key])

  return useMemo(() => ({ data: _data, set, refetch }), [_data, set, refetch])
}
