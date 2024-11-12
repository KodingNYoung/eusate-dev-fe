"use client"

import { FC } from "@/utils/types"
import React, { HTMLProps, ReactNode } from "react"
import Button from "./Buttons"
import Icon from "../atoms/Icon"
import Typography from "../atoms/Typography"
import { useRouter } from "next/navigation"
import Toast from "../organisms/Toast"

type Props = Omit<HTMLProps<HTMLDivElement>, "title"> & {
  hasBackBtn?: boolean
  title: ReactNode
  subtitle: ReactNode
  toast?: boolean
}

const AuthHeader: FC<Props> = ({
  hasBackBtn,
  title,
  subtitle,
  toast,
  ...props
}) => {
  const router = useRouter()
  return (
    <header {...props}>
      {hasBackBtn && (
        <Button
          variant="tetiary"
          size="mini"
          className="px-3 py-1.5 w-fit mb-10"
          startContent={<Icon name="icon-arrow-left" />}
          onClick={() => router.back()}
        >
          Back
        </Button>
      )}
      {toast && <Toast />}
      <Typography as="h2" className="text-bold-2xl sm:text-bold-4xl mb-3">
        {title}
      </Typography>
      <Typography
        as="span"
        variant="regular-sm"
        className="text-gray-500 flex items-center gap-2"
      >
        {subtitle}
      </Typography>
    </header>
  )
}

export default AuthHeader
