import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import { truncateWord } from "@/utils/helpers"
import { AttachmentMetadata } from "@/utils/types"
import React, { FC } from "react"

type Props = {
  file: AttachmentMetadata
  onRemove: () => void
}

const FileItem: FC<Props> = ({ file, onRemove }) => {
  return (
    <div className="flex items-center gap-2 bg-gray-900 p-2 rounded-x20 w-fit mt-1 ml-1">
      <Icon size={20} name="icon-document-text" className="text-gray-300" />
      <Typography className="text-white text-medium-xs">
        {truncateWord(file.name, 8)}
        <span className="text-gray-400">{file.extension}</span>
      </Typography>
      <button onClick={onRemove} className="leading-none cursor-pointer">
        {file.loading ? (
          "l"
        ) : file.error ? (
          "e"
        ) : (
          <Icon size={16} name="icon-close-circle" className="text-gray-300" />
        )}
      </button>
    </div>
  )
}

export default FileItem
