import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import { fileIconMap } from "@/components/views/knowledge-base/_components/DocumentModal/FileItem"
import { formatFileSize } from "@/utils/helpers"
import { FC } from "@/utils/types"
import Image from "next/image"
import Link from "next/link"
import React, { useMemo } from "react"

type Props = {
  url: string
  size?: number // size in bytes
}

const AttachmentItem: FC<Props> = ({ url, size }) => {
  const { filename, ext } = useMemo(() => {
    const filenameSplit = url.split("/").pop()?.split(".")
    const ext = filenameSplit?.pop() as keyof typeof fileIconMap

    return {
      filename: filenameSplit?.join("."),
      ext,
    }
  }, [url])

  return (
    <div className="flex items-center gap-3 border border-gray-50 p-4 rounded-x20">
      <Image
        src={fileIconMap[ext]}
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
          <span className="truncate w-fit max-w-full">
            {filename}.{ext}
          </span>
        </Typography>
        <div className="flex items-center justify-start">
          {size !== undefined && (
            <Typography as="span" className="text-medium-xs text-gray-400">
              {formatFileSize(221232)}
            </Typography>
          )}
          <Link
            href={url}
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
  )
}

export default AttachmentItem
