import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import { getFileExtension, truncateWord } from "@/utils/helpers"
import React, { FC, useMemo } from "react"

type Props = {
  file: File
  onRemove: () => void
}

const FileItem: FC<Props> = ({ file, onRemove }) => {
  const { name } = file
  const ext = useMemo(() => {
    return getFileExtension(file)
  }, [])

  return (
    <div className="flex items-center gap-x-4 bg-gray-900 p-2.5 rounded-x20">
      <Icon size={20} name="icon-document-text" className="text-gray-300" />

      <Typography className="text-white text-medium-sm">
        {truncateWord(name, 8)}
        <span className="text-gray-300">{ext}</span>
      </Typography>

      <Icon
        size={20}
        onClick={() => onRemove()}
        name="icon-close-circle"
        className="text-gray-300 leading-none cursor-pointer"
      />
    </div>
  )
}

export default FileItem
