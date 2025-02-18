import Logo from "@/components/atoms/Logo"
import Typography from "@/components/atoms/Typography"
import { FC, SateMessage } from "@/utils/types"
import React, { useEffect, useMemo, useState } from "react"
import MsgPageIndicator from "./MsgPageIndicator"
import CopyButton from "./CopyButton"
import { cls } from "@/utils/helpers"
import ChatLoader from "@/components/atoms/ChatLoader"
import RegenerateButton from "./RegenerateButton"
import FeedbackButton from "./FeedbackButton"
import { FeedbackKind } from "../utils"

type Props = {
  responses: SateMessage[]
  msgHistoryCode: string
  userMessageText: string
  setCanGoToLast?: (val: boolean) => void
}

const SateResponseBox: FC<Props> = ({
  responses,
  msgHistoryCode,
  userMessageText,
  setCanGoToLast,
}) => {
  const [currResponse, setCurrResponse] = useState(0)

  const response = useMemo(() => {
    return responses[currResponse] || { response: "", isLoading: false }
  }, [responses, currResponse])

  useEffect(() => {
    setCurrResponse(responses.length > 0 ? responses.length - 1 : 0)
  }, [responses])

  return (
    <div className="grid gap-4">
      <div className="grid gap-2.5">
        <div className="size-10 bg-black rounded-full flex justify-center items-center px-2">
          <Logo type="icon-white" />
        </div>
        <div
          className={cls(
            "bg-gold-50 w-fit",
            response.isLoading
              ? "px-3 py-2 rounded-xl"
              : "py-3 px-6 rounded-x20"
          )}
        >
          {response.isLoading ? (
            <ChatLoader className="w-8" />
          ) : (
            <Typography className="text-medium-base whitespace-break-spaces">
              {response.response}
            </Typography>
          )}
        </div>
      </div>
      <div className="flex gap-3 px-3 py-2">
        <MsgPageIndicator
          totalMsgs={responses.length}
          currentIdx={currResponse}
          goToMsg={setCurrResponse}
          loading={response.isLoading}
        />
        <RegenerateButton
          historyCode={msgHistoryCode}
          userMessageId={response.playground_user_message}
          userMessageText={userMessageText}
          setCanGoToLast={setCanGoToLast}
        />
        <CopyButton response={response.response} loading={response.isLoading} />
        <FeedbackButton
          kind={FeedbackKind.LIKE}
          historyCode={msgHistoryCode}
          userMessageId={response.playground_user_message}
          response={response}
          loading={response.isLoading}
        />
        <FeedbackButton
          kind={FeedbackKind.DISLIKE}
          historyCode={msgHistoryCode}
          userMessageId={response.playground_user_message}
          response={response}
          loading={response.isLoading}
        />
      </div>
    </div>
  )
}

export default SateResponseBox
