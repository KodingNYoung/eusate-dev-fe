"use client"

import React from "react"
import NoContentFound from "../../_components/NoContentFound"
import { FC } from "@/utils/types"
import AttachmentItem from "@/components/views/help-desk/_components/ViewTicketDrawer/AttachmentItem"

type Props = {
  attachments: string[]
}

const Attachments: FC<Props> = ({ attachments }) => {
  return (
    <div className="custom-scrollbar w-full p-6 flex flex-col gap-3 overflow-y-auto flex-1">
      {attachments.length ? (
        attachments.map((url, idx) => <AttachmentItem key={idx} url={url} />)
      ) : (
        <NoContentFound msg="No Attachments Found" />
      )}
    </div>
  )
}

export default Attachments
