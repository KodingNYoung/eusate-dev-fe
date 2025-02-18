import { CookieKeys } from "./types"

export class CookieStorage {
  static get(key: CookieKeys) {
    if (typeof window !== "undefined") {
      const value = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${key}=`))
        ?.split("=")[1]

      return value || null
    }

    return null
  }

  static set(key: CookieKeys, value: string, expires?: Date) {
    if (typeof window !== "undefined") {
      const expireDate = expires ? `; expires=${expires.toUTCString()}` : ""
      document.cookie = `${key}=${value}${expireDate}; Secure`
    }
  }

  static has(key: CookieKeys) {
    if (typeof window !== "undefined") {
      return document.cookie
        .split(";")
        .some((item) => item.trim().startsWith(`${key}=`))
    }

    return false
  }

  static unset(key: CookieKeys) {
    if (typeof window !== "undefined") {
      document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`
    }
  }
}
