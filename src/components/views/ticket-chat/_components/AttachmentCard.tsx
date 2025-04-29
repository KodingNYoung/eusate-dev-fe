import Image from "next/image"
import Icon from "@/components/atoms/Icon"
import doc from "@/assets/images/file-doc.svg"
import gif from "@/assets/images/file-gif.svg"
import jpg from "@/assets/images/file-jpg.svg"
import mp3 from "@/assets/images/file-mp3.svg"
import pdf from "@/assets/images/file-pdf.svg"
import png from "@/assets/images/file-png.svg"
import txt from "@/assets/images/file-txt.svg"
import xls from "@/assets/images/file-xls.svg"
import { AllowedFileExt, FC } from "@/utils/types"
import Typography from "@/components/atoms/Typography"
import React, { useEffect, useMemo, useState } from "react"
import { formatFileSize, truncateWord } from "@/utils/helpers"

type Props = {
  file: File
}

const fileIconMap: { [key in AllowedFileExt]: string } = {
  doc: doc,
  docx: doc,
  gif: gif,
  jpeg: jpg,
  jpg: jpg,
  mp3: mp3,
  pdf: pdf,
  png: png,
  txt: txt,
  xls: xls,
}

const AttachmentCard: FC<Props> = ({ file }) => {
  const size = formatFileSize(file.size)

  const image = useMemo(() => {
    const ext = file.type.split("/")[1]
    return fileIconMap[ext as keyof typeof fileIconMap] || doc
  }, [file.name])

  const [url, setUrl] = useState("")

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file)
    setUrl(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  return (
    <div className="flex items-center gap-4 border border-gray-50 rounded-x20 p-4 ">
      <Image
        src={image}
        width={56}
        height={56}
        className="size-12"
        alt="file type"
      />
      <div className="grid gap-1 flex-1">
        <Typography className="text-medium-sm text-gray-900 font-[500] truncate">
          {truncateWord(file.name, 18)}
        </Typography>

        <div className="flex items-center gap-4">
          <Typography className="text-gray-400 text-medium-xs">
            {size}
          </Typography>

          <a
            href={url}
            download={file.name}
            className="flex cursor-pointer items-center medium-xs gap-x-0.5 text-gold-600"
          >
            <Icon name="icon-download" />
            <Typography className="underline text-medium-xs">
              Download
            </Typography>
          </a>
        </div>
      </div>
    </div>
  )
}

export default AttachmentCard
