import Icon from "@/components/atoms/Icon"
import Spinner from "@/components/atoms/Spinner"
import Typography from "@/components/atoms/Typography"
import { cls, getFileNameWithoutExt, truncateWord } from "@/utils/helpers"
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
        {truncateWord(getFileNameWithoutExt(file.name), 8)}
        <span className="text-gray-400">{file.extension}</span>
      </Typography>
      <button
        onClick={onRemove}
        className="leading-none cursor-pointer group/button grid place-items-center [grid-template-areas:'allow']"
        data-loading={file.loading}
        data-error={file.error}
        title="Remove file"
      >
        <Spinner
          className={cls(
            "text-gray-300 h-full [grid-area:allow] invisible",
            "group-data-[loading=true]/button:visible group-data-[error=true]/button:invisible"
          )}
        />
        <Icon
          size={16}
          name="icon-danger-bold"
          className={cls(
            "text-red-500 block [grid-area:allow] invisible",
            "group-data-[error=true]/button:visible"
          )}
        />
        <Icon
          size={16}
          name="icon-close-circle"
          className={cls(
            "text-gray-300  block [grid-area:allow]",
            "group-data-[loading=true]/button:invisible group-data-[error=true]/button:invisible"
          )}
        />
      </button>
    </div>
  )
}

export default FileItem
