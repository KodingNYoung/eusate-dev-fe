import { ZodError } from "zod"
import {
  ErrorObjectType,
  FileExtension,
  FormState,
  PageLayers,
  PageLayersPath,
  TWClassNames,
} from "./types"
import { RefObject } from "react"
import { ROUTES } from "./constants"
import dayjs from "dayjs"
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

export const chunkFile = (file: File, chunkSizeInByte: number) => {
  const chunks = []
  let offset = 0

  while (offset < file.size) {
    const chunk = file.slice(offset, offset + chunkSizeInByte)
    const chunkFile = new File([chunk], file.name, {
      type: file.type,
      lastModified: file.lastModified,
    })
    chunks.push(chunkFile)
    offset += chunkSizeInByte
  }

  return chunks
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
  const lastPathSegment = pathname.split("/").slice(-1)[0]
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
