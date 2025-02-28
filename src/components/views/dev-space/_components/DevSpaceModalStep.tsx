import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import { cls } from "@/utils/helpers"
import { FC } from "@/utils/types"
import React from "react"

type Props = {
  sn: number
  isDone?: boolean
  isActive?: boolean
  isLast?: boolean
  onSelect?: () => void
}

const DevSpaceModalStep: FC<Props> = ({
  sn,
  isDone,
  isActive,
  isLast,
  children,
  onSelect,
}) => {
  return (
    <button
      type="button"
      className={cls(
        "flex items-center gap-4.5 border  border-gray-100 p-1 pr-4.5 rounded-[100px] relative min-w-[220px]",
        isActive
          ? "border-opacity-100 bg-gray-25"
          : "border-opacity-0 bg-white",
        !isLast && "mb-8"
      )}
      onClick={onSelect}
    >
      <div
        className={cls(
          "size-10 flex justify-center items-center rounded-full",
          isActive ? "bg-black" : isDone ? "bg-brand-gradient" : "bg-gray-50"
        )}
      >
        <Typography
          variant="medium-base"
          className={cls(
            "!leading-none",
            isActive || isDone ? "text-white" : "text-gray-600"
          )}
        >
          {isDone ? <Icon name="icon-tick-circle-bold" size={24} /> : sn}
        </Typography>
      </div>
      <Typography
        variant="semibold-sm"
        className={cls(isActive || isDone ? "text-gray-900" : "text-gray-300")}
      >
        {children}
      </Typography>
      {!isLast && (
        <span className="absolute top-full left-[22px] h-12 border-l border-dashed border-gray-100" />
      )}
    </button>
  )
}

export default DevSpaceModalStep
