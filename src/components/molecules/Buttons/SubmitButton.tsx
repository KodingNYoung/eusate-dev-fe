"use client"

import { FC } from "@/utils/types"
import React from "react"
import Button, { ButtonProps } from "."
import { useFormStatus } from "react-dom"
import { cls } from "@/utils/helpers"

type Props = Omit<ButtonProps, "type">

const SubmitButton: FC<Props> = ({
  children,
  loading,
  classNames,
  ...props
}) => {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      size="xl"
      loading={pending || loading}
      classNames={{
        root: cls("py-4.5", classNames?.root),
        label: cls("", classNames?.label),
      }}
      {...props}
    >
      {children}
    </Button>
  )
}

export default SubmitButton
