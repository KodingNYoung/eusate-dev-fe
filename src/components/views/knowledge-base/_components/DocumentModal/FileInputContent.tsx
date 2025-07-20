import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import Button from "@/components/molecules/Buttons"
import { FC } from "@/utils/types"
import React from "react"

const FileInputContent: FC = () => {
  return (
    <div className="grid gap-4 justify-items-center">
      <div className="size-14 flex items-center justify-center bg-gold-50 rounded-full ">
        <Icon name="icon-document-cloud" size={28} className="text-gradient" />
      </div>
      <div className="flex flex-col gap-0.5 items-center">
        <Typography className="text-regular-sm text-gray-600">
          <span className="text-gradient text-semibold-sm">
            Click to upload
          </span>{" "}
          or drag and drop
        </Typography>
        <Typography className="text-regular-xs text-gray-400">
          PDF, DOC or TXT
        </Typography>
      </div>
      <Typography
        as="div"
        variant="semibold-xs"
        className="after:flex-1 after:h-px after:bg-gray-50 before:flex-1 before:h-px before:bg-gray-50 text-gray-300 w-full flex items-center gap-2"
      >
        OR
      </Typography>
      <Button className="px-4.5 py-3" type="button">
        Browse Files
      </Button>
    </div>
  )
}

export default FileInputContent
