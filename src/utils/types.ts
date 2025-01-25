import { HTMLProps, PropsWithChildren, ReactElement, ReactNode } from "react"
import { KnowledgeSourceTags, TwoFAMethods } from "./enums"
import { TableHeadTooltip } from "@/components/organisms/Table/TableHeadCell"
import { SHOW_FOR } from "./constants"

export type TWClassNames = HTMLProps<HTMLElement>["className"]

export type TypographyVariants =
  | "regular-xxs"
  | "regular-xs"
  | "regular-sm"
  | "regular-base"
  | "regular-lg"
  | "regular-xl"
  | "regular-2xl"
  | "regular-3xl"
  | "regular-4xl"
  | "regular-5xl"
  | "medium-xxs"
  | "medium-xs"
  | "medium-sm"
  | "medium-base"
  | "medium-lg"
  | "medium-xl"
  | "medium-2xl"
  | "medium-3xl"
  | "medium-4xl"
  | "medium-5xl"
  | "semibold-xxs"
  | "semibold-xs"
  | "semibold-sm"
  | "semibold-base"
  | "semibold-lg"
  | "semibold-xl"
  | "semibold-2xl"
  | "semibold-3xl"
  | "semibold-4xl"
  | "semibold-5xl"
  | "bold-xxs"
  | "bold-xs"
  | "bold-sm"
  | "bold-base"
  | "bold-lg"
  | "bold-xl"
  | "bold-2xl"
  | "bold-3xl"
  | "bold-4xl"
  | "bold-5xl"
  | "bold-6xl"
  | "bold-7xl"
  | "bold-8xl"
  | "bold-9xl"

export type LogoVariants =
  | "icon-gradient"
  | "icon-white"
  | "icon-black"
  | "full-white"
  | "full-black"
  | "full-gradient-white"
  | "full-gradient-black"

export type FC<PropsType = unknown> = {
  (
    props: { className?: TWClassNames } & PropsWithChildren<PropsType>, // These line automatically add `className` and `children` to all component using the `FC` type
    context?: unknown
  ): ReactElement | null
  displayName?: string
}
export type LayoutFC<
  ParamsType = { [paramsKey: string]: string | string[] | undefined },
> = {
  (
    props: PropsWithChildren<{ params?: ParamsType }>,
    context?: unknown
  ): ReactElement | null | Promise<ReactElement | null>
  displayName?: string
}

export type PageFC<
  ParamsType = { [paramsKey: string]: string | string[] | undefined },
  SearchParamsType = {
    [searchParamsKey: string]: string | string[] | undefined
  },
> = {
  (
    props: {
      params?: ParamsType
      searchParams?: SearchParamsType
    },
    context?: unknown
  ): ReactElement | null | Promise<ReactElement | null>
  displayName?: string
}
export type ErrorObjectType = {
  type: "request" | "validation"
  message?: string
  fields?: {
    [field: string]: string
  }
}

export type FormState<SP = unknown, EP = unknown> =
  | { redirectTo?: string }
  | (
      | {
          redirectTo?: string
          success: { message: string }
          payload?: SP
        }
      | {
          redirectTo?: string
          error: ErrorObjectType
          payload?: EP
        }
    )
export type JSONValue =
  | null
  | boolean
  | number
  | string
  | JSONValue[]
  | { [key: string]: JSONValue }

export type SessionPayload = {
  refreshToken?: string
  accessToken?: string
  tokenVerified?: boolean
  email: string
  userId?: string
  organisationId?: string
  isVerified?: boolean
  twofaMethod?: TwoFAMethods | null
  expiresAt?: Date
  shouldOnboard?: boolean
}

export type TableColumn<T = unknown> = {
  id: string | number
  title: ReactNode
  align?: "left" | "center" | "right" | "char" | "justify"
  render: (row: T) => ReactNode | null
  classNames?: {
    cell?: TWClassNames
    th?: TWClassNames
    td?: TWClassNames
  }
  tooltip?: Omit<TableHeadTooltip, "icon">
  showFor?: (typeof SHOW_FOR)[keyof typeof SHOW_FOR]
  clickable?: boolean
}

export type KnowledgeSource = {
  id: string
  organisation_id: string
  title: string
  published: boolean
  external: boolean
  tag: KnowledgeSourceTags
  file: string
  language: string
  date_created: string
  date_updated: string
  link: string | null
  question: string
  answer: string
  origin: string | null
  extension: string | null
}
