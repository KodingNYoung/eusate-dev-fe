import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import Button from "@/components/molecules/Buttons"
import { FILE_ICON_MAP } from "@/utils/constants"
import { formatFileSize, getFileExtension } from "@/utils/helpers"
import { FC, FileExtension } from "@/utils/types"
import dayjs from "dayjs"
import Image from "next/image"
import React, { useMemo } from "react"

type Props = {
  file: File
  onRemove: () => void
}

const FileItem: FC<Props> = ({ file, onRemove }) => {
  const lastFormatted = dayjs(file.lastModified)
  const size = formatFileSize(file.size)

  const image = useMemo(() => {
    const ext = getFileExtension(file) as FileExtension
    return FILE_ICON_MAP[ext]
  }, [file])

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
        <Typography className="text-semibold-base truncate">
          {file.name}
        </Typography>
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
