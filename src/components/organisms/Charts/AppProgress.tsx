import Typography from "@/components/atoms/Typography"
import { cls } from "@/utils/helpers"
import { FC, TWClassNames } from "@/utils/types"
import { Skeleton } from "@nextui-org/react"
import React, { ReactNode } from "react"

type Props = {
  color: string
  value: number
  height?: TWClassNames
  label?: ReactNode
  showValueLabel?: boolean
  loading?: boolean
  formatValue?: (value: number) => ReactNode
}

const AppProgress: FC<Props> = ({
  height = "h-[5px]",
  color,
  label,
  value,
  showValueLabel,
  formatValue,
  loading,
}) => {
  const isTailwinClass = color.includes("bg-")
  const valueEl = showValueLabel
    ? formatValue
      ? formatValue(value)
      : `(${value}%)`
    : null
  return (
    <div className={cls("grid gap-2.5")}>
      <div className="flex items-center justify-between">
        <Typography
          as="span"
          variant="semibold-sm"
          className="text-black whitespace-nowrap"
          // placeholder="label"
          loading={loading}
        >
          {label}
        </Typography>
        {showValueLabel ? (
          <Typography
            as="span"
            variant="semibold-sm"
            className="text-black whitespace-nowrap ml-auto"
            // placeholder="(0%)"
            loading={loading}
          >
            {valueEl}
          </Typography>
        ) : null}
      </div>
      <Skeleton isLoaded={!loading} className={cls("rounded-3xl", height)}>
        <div
          className={cls(
            "relative overflow-hidden w-full bg-[#F4F4F5] rounded-3xl",
            height
          )}
        >
          <div
            className={cls(
              "absolute top-0 h-full w-[calc(100%_+_2px)] z-1 rounded-[inherit] transition-all",
              isTailwinClass && color
            )}
            style={{
              background: isTailwinClass ? "" : color,
              left: `-${100 - value}%`,
            }}
          />
        </div>
      </Skeleton>
    </div>
  )
}

export default AppProgress
