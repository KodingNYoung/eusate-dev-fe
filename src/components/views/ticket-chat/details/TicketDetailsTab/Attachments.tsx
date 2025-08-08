"use client"

import React from "react"
import NoContentFound from "../../_components/NoContentFound"
import { AttachmentMetadata, FC } from "@/utils/types"
import AttachmentItem from "@/components/views/help-desk/_components/ViewTicketDrawer/AttachmentItem"

type Props = {
  attachments: AttachmentMetadata[]
}

const Attachments: FC<Props> = ({ attachments }) => {
  return (
    <div className="h-full w-full p-6 py-5 flex flex-col gap-3 flex-1">
      {attachments.length ? (
        attachments.map((attachment, idx) => (
          <AttachmentItem key={idx} attachment={attachment} />
        ))
      ) : (
        <NoContentFound msg="No Attachments Found" />
      )}
    </div>
  )
}

export default Attachments
