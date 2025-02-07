import { Conversation, DBResource } from "@/utils/types"

export type GetChatHistoryResponse = DBResource & {
  cleared: boolean
  user: string
  organisation: string
  conversations: Conversation[]
}
