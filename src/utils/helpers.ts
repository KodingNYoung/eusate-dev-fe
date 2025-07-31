import {
  ErrorObjectType,
  FileExtension,
  FormState,
  PageLayers,
  PageLayersPath,
  TWClassNames,
} from "./types"
import {
  SETTINGS_NAV_LINKS,
  SettingsNavLink,
} from "../components/templates/settings/utils"
import dayjs from "dayjs"
import { ZodError } from "zod"
import { RefObject } from "react"
import { ROUTES } from "./constants"
import calendar from "dayjs/plugin/calendar"

dayjs.extend(calendar)

export function cls(
  ...classNames: (TWClassNames | string | null | undefined | false)[]
) {
  const validClasses = classNames.filter((className) => !!className) as string[]
  return validClasses.join(" ")
}

export function formStateResponse<SP = unknown, EP = unknown>(
  formState?: FormState<SP, EP>
) {
  const state: FormState = {
    ...formState,
    error: undefined,
    success: undefined,
    redirectTo: undefined,
  }

  return {
    successResponse: (
      message: string,
      redirectTo?: string,
      payload?: SP
    ): FormState<SP, EP> => {
      return {
        ...state,
        success: { message },
        redirectTo,
        payload,
      }
    },
    errorResponse: (
      error: ErrorObjectType,
      redirectTo?: string,
      payload?: EP
    ): FormState<SP, EP> => {
      return {
        ...state,
        error,
        redirectTo,
        payload,
      }
    },
  }
}

export const extractZodErrors = (err: ZodError) => {
  return err.issues.reduce(
    (err, curr) => {
      const field = curr.path[0]
      return { ...err, [field]: curr.message }
    },
    {} as Record<string, string>
  )
}

export const getFormdataFromFormRef = (formRef: RefObject<HTMLFormElement>) => {
  const form = formRef.current

  return form ? new FormData(form) : undefined
}

export const copy = (text: string) => {
  navigator.clipboard.writeText(text)
}

export const copyObject = <T = unknown>(obj: T) => {
  return JSON.parse(JSON.stringify(obj)) as T
}

export const byteToKb = (bytes: number) => {
  return bytes / 1024
}

export const byteToMb = (bytes: number) => {
  return bytes / (1024 * 1024)
}

export const byteToGb = (bytes: number) => {
  return bytes / (1024 * 1024 * 1024)
}

export const kbToByte = (mb: number) => {
  return mb * 1024
}
export const mbToByte = (mb: number) => {
  return mb * 1024 * 1024
}
export const gbToByte = (mb: number) => {
  return mb * 1024 * 1024 * 1024
}

export const formatFileSize = (bytes: number) => {
  if (bytes < 1024) {
    return `${bytes}B`
  } else if (bytes < 1024 * 1024) {
    return `${byteToKb(bytes).toFixed(2)}KB`
  } else if (bytes < 1024 * 1024 * 1024) {
    return `${byteToMb(bytes).toFixed(2)}MB`
  } else {
    return `${byteToGb(bytes).toFixed(2)}GB`
  }
}

export const objToQuery = (obj: Record<string, string | number | boolean>) => {
  const query = new URLSearchParams()
  Object.keys(obj).forEach((key) => {
    const value = obj[key as keyof typeof obj]
    if (value !== undefined && value !== "") {
      query.set(key, value.toString())
    }
  })

  return query.toString()
}

export const pageLayerAdapter = (
  pathname: string,
  PAGE_LAYERS: PageLayers
): PageLayersPath[] => {
  const splittedPath = pathname.split("/")
  const lastPathSegment = splittedPath.slice(-1)[0]
  const secondToLast = splittedPath.slice(-2)[0]
  const firstThreeChar = lastPathSegment.slice(0, 3)

  if (firstThreeChar === "TIC") {
    return [
      {
        label: "Helpdesk",
        icon: "icon-ticket",
        link: ROUTES.HELP_DESK,
        id: 1,
      },
      { label: "#" + lastPathSegment, id: 2 },
    ]
  } else if (
    SETTINGS_NAV_LINKS.includes(lastPathSegment as SettingsNavLink) &&
    secondToLast === "settings"
  ) {
    return [
      {
        label: "Settings",
        icon: "icon-setting",
        link: ROUTES.SETTINGS,
        id: 1,
      },
      { label: capitalizeFirstLetter(lastPathSegment), id: 2 },
    ]
  }

  return PAGE_LAYERS[pathname] || []
}

export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return ""
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const truncateWord = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength) + "..."
}

export const getFileExtension = (file: File) => {
  return (file.name ? "." + file.name.split(".").pop() : "") as FileExtension
}
export const getFileNameWithoutExt = (filename: string) => {
  return filename ? filename.split(".").slice(0, -1).join(".") : ""
}
export const formatToMessageTime = (date: string) => {
  return dayjs(date).calendar(null, {
    sameDay: "h:mmA", // The same day ( Today at 2:30 AM )
    lastDay: "[Yesterday], h:mmA", // The day before ( Yesterday at 2:30 AM )
    lastWeek: "dddd, h:mmA", // Last week ( Last Monday at 2:30 AM )
    sameElse: "DD/MM/YYYY, h:mmA ", // Everything else ( 7/10/2011 )
  })
}
export const promptFileUpload = (
  accept = "*",
  multiple = false
): Promise<FileList | null> => {
  return new Promise((resolve) => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = accept
    input.multiple = multiple
    input.style.display = "none"
    input.onchange = () => {
      resolve(input.files)
    }
    document.body.appendChild(input)
    input.click()
    document.body.removeChild(input)
  })
}

export const hasSameBasePath = (a: string, b: string) => {
  const baseA = a.split("/")[1]
  const baseB = b.split("/")[1]
  return baseA && baseA === baseB
}

export const convertSecondsToTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0")
  const secs = (seconds % 60).toString().padStart(2, "0")

  return hours > 0 ? `${hours}:${minutes}:${secs}` : `${minutes}:${secs}`
}

export const formatComma = (num: number | string) => {
  if (!num) return num
  const [integer, decimal] = num.toString().split(".")
  const numArray = integer.split("")
  let strVal = ""
  while (numArray.length) {
    const threeVal = numArray.splice(-3).join("")
    strVal = (numArray.length ? "," : "") + threeVal + strVal
  }
  return decimal ? `${strVal}.${decimal}` : strVal
}

export const round = (num: number, dp: number = 2) => {
  const multiplier = Math.pow(10, dp || 0)
  return Math.round((num + Number.EPSILON) * multiplier) / multiplier
}
