import { cls } from "@/utils/helpers"
import { FC, TWClassNames } from "@/utils/types"
import React, { HTMLProps } from "react"

type Props = HTMLProps<HTMLInputElement> & {
  classNames?: { [slot in "root" | "input"]?: TWClassNames }
}

const FileUploadButton: FC<Props> = ({
  children,
  className,
  classNames,
  name,
  id,
  ...props
}) => {
  return (
    <label
      htmlFor={id || name || "file"}
      className={cls("relative", className, classNames?.root)}
    >
      <input
        type="file"
        id={id || name || "file"}
        name={name}
        className={cls(
          "absolute top-0 left-0 w-full h-full opacity-0",
          classNames?.input
        )}
        {...props}
      />
      {children}
    </label>
  )
}

export default FileUploadButton
