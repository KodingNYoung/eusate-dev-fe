import { FC } from "@/utils/types"
import React from "react"
import Typography from "./Typography"
import { cls } from "@/utils/helpers"

type Props = {
  isError?: boolean
  isSuccess?: boolean
}

const HelperText: FC<Props> = ({ children, isError, isSuccess, className }) => {
  return (
    <Typography
      as="span"
      variant="regular-xs"
      data-error={isError}
      data-success={isSuccess}
      className={cls(
        "text-gray-500 data-[success=true]:text-success-600 data-[error=true]:text-error-500",
        className
      )}
    >
      {children}
    </Typography>
  )
}

export default HelperText
