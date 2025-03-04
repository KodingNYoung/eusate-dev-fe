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
  onSelect,
}) => {
  return (
    <div
      className={cls(
        !isLast &&
          cls(
            "max-w-[151px] flex-1 relative after:absolute after:left-1 after:right-0 after:top-1/2 after:h-px",
            isDone ? "after:bg-black" : "after:bg-gray-50"
          )
      )}
    >
      <button
        className={cls(
          "size-8 flex justify-center items-center rounded-full relative z-1 border",
          isDone ? "bg-black" : "bg-white ",
          isActive || isDone
            ? "border-black"
            : "border-gray-50 cursor-not-allowed"
        )}
        onClick={onSelect}
      >
        <Typography
          variant="medium-base"
          className={cls(
            "!leading-none",
            isDone ? "text-white" : isActive ? "text-black" : "text-gray-500"
          )}
        >
          {isDone && !isActive ? (
            <Icon name="icon-tick-circle-bold" size={24} />
          ) : (
            sn
          )}
        </Typography>
      </button>
    </div>
  )
}

export default DevSpaceModalStep
