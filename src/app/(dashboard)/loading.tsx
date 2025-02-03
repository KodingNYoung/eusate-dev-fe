import { FC } from "@/utils/types"
import { Progress } from "@nextui-org/react"
import React from "react"

const PageLoading: FC = () => {
  return (
    <Progress
      isIndeterminate
      aria-label="Loading..."
      radius="none"
      size="sm"
      classNames={{
        base: "fixed left-0 top-0 w-full z-50",
        indicator: "bg-brand-gradient",
      }}
    />
  )
}

export default PageLoading
