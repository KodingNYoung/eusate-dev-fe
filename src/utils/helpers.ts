import { ZodError } from "zod"
import {
  ErrorObjectType,
  FormState,
  PageLayers,
  PageLayersPath,
  TWClassNames,
} from "./types"
import { RefObject } from "react"
import { ROUTES } from "./constants"

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
