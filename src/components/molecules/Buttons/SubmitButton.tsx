"use client"

import { FC } from "@/utils/types"
import React from "react"
import Button, { ButtonProps } from "."
import { useFormStatus } from "react-dom"
import { cls } from "@/utils/helpers"

type Props = Omit<ButtonProps, "type"> & { hideLoader?: boolean }

const SubmitButton: FC<Props> = ({
  children,
  loading,
  classNames,
  hideLoader,
  disabled,
  ...props
}) => {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      size="xl"
      loading={(pending && !hideLoader) || loading}
      disabled={pending || disabled || loading}
      data-loading={loading || pending}
      classNames={{
        root: cls("py-4.5 group/button", classNames?.root),
        label: cls(classNames?.label),
      }}
      {...props}
    >
      {children}
    </Button>
  )
}

export default SubmitButton
