"server only"

import { Conversation, DBResource } from "@/utils/types"
import { getSession } from "../sessions"
import { sendAuthRequest } from "../request"
import { ERROR_CAUSES } from "@/utils/constants"

export type GetChatHistoryResponse = DBResource & {
  cleared: boolean
  user: string
  organisation: string
  conversations: Conversation[]
}

export const getPlaygroundChatHistory = async () => {
  try {
    const session = await getSession()
    const response = await sendAuthRequest<GetChatHistoryResponse>(
      `/api/v1/playground/${session?.organisationId}/messages/`
    )
    if ("shouldAuthenticate" in response) {
      throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
    }

    return { success: { message: "" }, data: response }
  } catch (err) {
    return {
      error: { message: err instanceof Error && err.message },
      shouldAuthenticate:
        err instanceof Error && err.cause === ERROR_CAUSES.SESSION_EXPIRED,
    }
  }
}
