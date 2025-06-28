import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import { FILE_ICON_MAP } from "@/utils/constants"
import { formatFileSize, kbToByte } from "@/utils/helpers"
import { AttachmentMetadata, FC } from "@/utils/types"
import Image from "next/image"
import Link from "next/link"
import React from "react"

type Props = {
  attachment: AttachmentMetadata
}

const AttachmentItem: FC<Props> = ({ attachment }) => {
  return attachment ? (
    <div className="flex items-center gap-3 border border-gray-50 p-4 rounded-x20">
      <Image
        src={FILE_ICON_MAP[attachment.extension]}
        width={32}
        height={32}
        className="size-8"
        alt="file type"
      />
      <div className="flex flex-col gap-1">
        <Typography
          as="span"
          className="w-full text-medium-sm text-gray-900 grid"
        >
          <span className="truncate w-fit max-w-full">{attachment.name}</span>
        </Typography>
        <div className="flex items-center justify-start gap-2">
          {attachment.size_kb !== undefined && (
            <Typography as="span" className="text-medium-xs text-gray-400">
              {formatFileSize(kbToByte(attachment.size_kb))}
            </Typography>
          )}
          <Link
            href={attachment.url}
            download
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-medium-xs text-gold-600"
          >
            <Icon name="icon-download" size={14} />{" "}
            <span className="underline">Download</span>
          </Link>
        </div>
      </div>
    </div>
  ) : null
}

export default AttachmentItem
