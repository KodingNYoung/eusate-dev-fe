"use client"

import { FC } from "@/utils/types"
import React from "react"
import Button, { ButtonProps } from "."
import { useFormStatus } from "react-dom"

type Props = Omit<ButtonProps, "type">

const SubmitButton: FC<Props> = ({ children, loading, ...props }) => {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" loading={pending || loading} {...props}>
      {children}
    </Button>
  )
}

export default SubmitButton
