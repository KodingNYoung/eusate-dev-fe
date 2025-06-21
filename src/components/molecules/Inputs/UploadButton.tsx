import { FC } from "@/utils/types"
import React, { HTMLProps, useRef } from "react"
import Button, { ButtonProps } from "../Buttons"

export type UploadButtonProps = HTMLProps<HTMLInputElement> & {
  buttonProps?: ButtonProps
}

const UploadButton: FC<UploadButtonProps> = ({
  buttonProps,
  children,
  name,
  id,
  ...props
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <label htmlFor={id || name}>
      <input
        {...props}
        id={id || name}
        name={name}
        ref={fileInputRef}
        type="file"
        hidden
      />
      <Button
        size="sm"
        variant="tetiary"
        className="px-3 py-2"
        {...buttonProps}
        onClick={(e) => {
          fileInputRef.current?.click()
          buttonProps?.onClick?.(e)
        }}
      >
        {children}
      </Button>
    </label>
  )
}

export default UploadButton
