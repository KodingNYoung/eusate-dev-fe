import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import Button from "@/components/molecules/Buttons"
import { formatFileSize } from "@/utils/helpers"
import { FC } from "@/utils/types"
import dayjs from "dayjs"
import Image from "next/image"
import React, { useMemo } from "react"
import doc from "@/assets/images/file-doc.svg"
import gif from "@/assets/images/file-gif.svg"
import jpg from "@/assets/images/file-jpg.svg"
import mp3 from "@/assets/images/file-mp3.svg"
import pdf from "@/assets/images/file-pdf.svg"
import png from "@/assets/images/file-png.svg"
import txt from "@/assets/images/file-txt.svg"
import xls from "@/assets/images/file-xls.svg"

type Props = {
  file: File
  onRemove: () => void
}
const fileIconMap = {
  doc: doc,
  docx: doc,
  gif: gif,
  jpg: jpg,
  mp3: mp3,
  pdf: pdf,
  png: png,
  txt: txt,
  xls: xls,
} as const

const FileItem: FC<Props> = ({ file, onRemove }) => {
  const lastFormatted = dayjs(file.lastModified)
  const size = formatFileSize(file.size)

  const image = useMemo(() => {
    const ext = file.name.split(".").pop()
    return fileIconMap[ext as keyof typeof fileIconMap]
  }, [file.name])

  return (
    <div className="border-b last-of-type:border-b-0 border-gray-50 flex items-center gap-4 pb-6">
      <Image
        src={image}
        width={56}
        height={56}
        className="size-12"
        alt="file type"
      />
      <div className="grid gap-1 flex-1">
        <Typography className="text-semibold-base">{file.name}</Typography>
        <Typography className="text-gray-300 text-medium-sm">
          {lastFormatted.format("DD MMM, YYYY")}{" "}
          <span className="text-gray-50">|</span>{" "}
          {lastFormatted.format("hh:mma")} • {size}
        </Typography>
      </div>
      <Button variant="errorText" className="border-none" onClick={onRemove}>
        <Icon name="icon-trash" size={28} />
      </Button>
    </div>
  )
}

export default FileItem
