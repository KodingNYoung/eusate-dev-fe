import { HTMLProps, PropsWithChildren, ReactElement, ReactNode } from "react"
import {
  AiTones,
  KnowledgeSourceTags,
  MemberInviteStatus,
  MessageSenders,
  PermissionCodenames,
  ResourceSources,
  TwoFAMethods,
} from "./enums"
import { TableHeadTooltip } from "@/components/organisms/Table/TableHeadCell"
import {
  COOKIES_KEYS,
  FILE_ICON_MAP,
  SHOW_FOR,
  STORAGE_KEYS,
} from "./constants"
import {
  AuthLocation,
  AuthType,
  FunctionMethods,
  FunctionParamType,
  FunctionStatus,
  ParamsProvidedBy,
} from "@/components/views/dev-space/utils"
import {
  TicketPriority,
  TicketStatus,
  UserTemperament,
} from "@/components/views/help-desk/utils"
import { ApiKeyStatus } from "@/components/views/settings/utils"
import { IconNames } from "./iconNames"

export type TWClassNames = HTMLProps<HTMLElement>["className"]

export type TypographyVariants =
  | "caption-lg"
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
  | "full-gray"
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

export type ValueOf<K> = K[keyof K]

export type StorageKeys = ValueOf<typeof STORAGE_KEYS>
export type CookieKeys = ValueOf<typeof COOKIES_KEYS>

export type SessionPayload = {
  refreshToken?: string
  accessToken?: string
  tokenVerified?: boolean
  email: string
  userId?: string
  currentOrganisationId?: string
  ownedOrganisationId?: string
  isVerified?: boolean
  twofaMethod?: TwoFAMethods | null
  expiresAt?: Date
  shouldOnboard?: boolean
}

export type TableColumn<T = unknown> = {
  id: string | number
  title: ReactNode
  align?: "left" | "center" | "right" | "char" | "justify"
  render: (row: T, loading?: boolean) => ReactNode | null
  classNames?: {
    cell?: TWClassNames
    th?: TWClassNames
    td?: TWClassNames
  }
  tooltip?: Omit<TableHeadTooltip, "icon">
  showFor?: (typeof SHOW_FOR)[keyof typeof SHOW_FOR]
  clickable?: boolean
}
export type FileExtension = keyof typeof FILE_ICON_MAP

export type DBResource = {
  id: string
  date_created: string
  date_updated: string
}

export type KnowledgeSource = DBResource & {
  organisation_id: string
  title: string
  published: boolean
  external: boolean
  tag: KnowledgeSourceTags
  file: string
  language: string
  link: string | null
  question: string
  answer: string
  origin: string | null
  extension: string | null
  content?: string
  file_size_kb: number | null
}

export type UserMessage = DBResource & {
  message: string
  message_history_code: string
  user: string
  organisation: string
  playground_chat: string
}

export type SateMessage = DBResource & {
  liked: null | boolean
  response: string
  user_feedback?: string
  user: string
  organisation: string
  playground_chat: string
  playground_user_message: string
  shouldAnimate?: boolean
  isLoading?: boolean
}

export type PlaygroundSettings = {
  source: ResourceSources
  tone: AiTones
  top_p: number
  temperature: number
}

export type Conversation = {
  message_history_code: UserMessage["message_history_code"]
  messages: { user_message: UserMessage; sate_responses: SateMessage[] }[]
}

export type AuthConfig = {
  login_url: string
  auth_location: AuthLocation
  auth_type: AuthType
  organisation_id?: string
  /**
   * "X-API-KEY"| "Authorization" | string
   */
  header_name?: string
  /**
   * `${string}{token}${string}`| 'Bearer {token}'| 'Basic {token}'| 'ApiKey {token}'
   */
  header_value?: string
  query_name?: string
}

export type DevSpaceFunctionParam = {
  param: string
  description: string
  provided_by: ParamsProvidedBy
  type: FunctionParamType
  function_arg?: true
  value?: string
  code_name?: string
}
export type DSFunction = {
  name: string
  description: string
  method: FunctionMethods
  endpoint_url: string
  url_params?: DevSpaceFunctionParam[]
  query_params?: DevSpaceFunctionParam[]
  status: FunctionStatus
  organisation_id?: string
  auth_config_id?: string
}

export type TicketCustomer = {
  id: string
  current_temperament: UserTemperament
  temperaments: UserTemperament[]
}
export type TicketChannel = DBResource & {
  name: string
  logo: string
}

export type Ticket = DBResource & {
  organisation: string
  id_slug: string
  title: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  pinned: boolean
  customer: TicketCustomer
  attachments: AttachmentMetadata[]
  assignee: string | null
  channel: TicketChannel
}
export type TicketCommentAgent = {
  id: string
  name: string
  email: string
}
export type TicketComment = DBResource & {
  message: string
  ticket: string
  agent: TicketCommentAgent
}
export type AttachmentMetadata = {
  url: string
  name: string
  size_kb: number
  extension: FileExtension
  loading?: boolean
  error?: boolean
}

export type MessageType = DBResource & {
  message: string
  sender: MessageSenders
  is_attachment: boolean
  attachment_metadata: AttachmentMetadata | null
  ticket_chat: string
}

export type ApiKeysType = {
  token: string
  name: string
  expires_at: string | null
  status: ApiKeyStatus
  organisation: string
  user: {
    id: string
    username: string
    email: string
  }
}

export type PageLayersPath = {
  label: string
  icon?: IconNames
  link?: string
  id: number
}

export type PageLayers = {
  [path: string]: PageLayersPath[]
}

export type OrganisationType = DBResource & {
  owner: { email: string }
  name: string
  logo: string
  meta: {
    domain: string
    sector: string
    use_case: string
    company_size: string
  }
}
export type UserType = DBResource & {
  email: string
  username: string
  profile_picture: string
}
export type UserProfileType = UserType & {
  twofa_method: string
  verified: boolean
  organisations: OrganisationType[]
}

export type OrganisationUser = DBResource & {
  owner: boolean
  user: UserType
}
export type UserPermission = DBResource & {
  name: string
  code_name: PermissionCodenames
  module: string
  description: string
  child_permissions: Omit<UserPermission, "child_permissions">[]
}
export type MemberInviteType = DBResource & {
  id: string
  date_created: string
  date_updated: string
  invitee_email: string
  invitee_registered: string
  inviter_name: string
  status: MemberInviteStatus
  expired: boolean
  organisation: { id: string; name: string; logo: string }
  permissions: string[]
}
