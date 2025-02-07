import Logo from "@/components/atoms/Logo"
import Typography from "@/components/atoms/Typography"
import { FC, SateMessage } from "@/utils/types"
import React, { useEffect, useState } from "react"
import MsgPageIndicator from "./MsgPageIndicator"
import RefreshButton from "./RefreshButton"
import CopyButton from "./CopyButton"
import LikeButton from "./LikeButton"
import DislikeButton from "./DislikeButton"

type Props = {
  responses: SateMessage[]
  msgHistoryCode: string
}

const SateResponseBox: FC<Props> = ({ responses }) => {
  const [currResponse, setCurrResponse] = useState(0)

  useEffect(() => {
    setCurrResponse(responses.length - 1)
  }, [responses])

  return (
    <div className="grid gap-4">
      <div className="grid gap-2.5">
        <div className="size-10 bg-black rounded-full flex justify-center items-center px-2">
          <Logo type="icon-white" />
        </div>
        <div className="bg-gold-50 rounded-x20 py-3 px-6">
          <Typography className="text-medium-base whitespace-break-spaces">
            {responses[currResponse]?.response}
          </Typography>
        </div>
      </div>
      <div className="flex gap-3 px-3 py-2">
        <MsgPageIndicator
          totalMsgs={responses.length}
          currentIdx={currResponse}
          goToMsg={setCurrResponse}
        />
        <RefreshButton />
        <CopyButton />
        <LikeButton />
        <DislikeButton />
      </div>
    </div>
  )
}

export default SateResponseBox
