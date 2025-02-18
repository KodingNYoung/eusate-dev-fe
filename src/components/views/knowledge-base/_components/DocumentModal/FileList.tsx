import { FC } from "@/utils/types"
import React from "react"
import FileItem from "./FileItem"

type Props = {
  files: File[]
  removeFile: (idx: number) => void
}

const FileList: FC<Props> = ({ files, removeFile }) => {
  return (
    <div className="grid gap-6 pt-6">
      {files.map((file, idx) => (
        <FileItem file={file} key={idx} onRemove={() => removeFile(idx)} />
      ))}
    </div>
  )
}

export default FileList
