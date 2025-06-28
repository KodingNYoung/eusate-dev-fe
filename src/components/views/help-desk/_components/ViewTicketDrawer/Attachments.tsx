import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import { AttachmentMetadata, FC } from "@/utils/types"
import React from "react"
import AttachmentItem from "./AttachmentItem"

type Props = { attachments: AttachmentMetadata[] }

const Attachments: FC<Props> = ({ attachments }) => {
  return (
    <section className="py-5 px-8 border-b border-gray-50">
      <header className="flex items-center gap-2 text-gray-400 mb-3 !leading-none">
        <Icon name="icon-attach-square" size={20} />
        <Typography className="text-medium-sm">
          Attachments ({attachments.length})
        </Typography>
      </header>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(210px,_1fr))] gap-3">
        {attachments.map((attachment, idx) => (
          <AttachmentItem attachment={attachment} key={idx} />
        ))}
      </div>
    </section>
  )
}

export default Attachments
