import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import { cls } from "@/utils/helpers"
import { FC, TWClassNames } from "@/utils/types"
import React, { ReactNode } from "react"

type Slots =
  | "root"
  | "main"
  | "title"
  | "value"
  | "unit"
  | "comparison"
  | "footer"
  | "footerBtn"
type Props = {
  removeFooter?: boolean
  classNames?: { [slot in Slots]?: TWClassNames }
  title?: string
  value?: ReactNode
  unit?: ReactNode
  change?: number
  timeframe?: string
  loading?: boolean
}

const MetricCard: FC<Props> = ({
  removeFooter,
  classNames,
  title = "TICKET VOLUME",
  value = "2,426",
  unit,
  change = 36,
  timeframe,
  loading,
}) => {
  return (
    <div
      className={cls(
        "border border-gray-50 py-1.5 grid gap-2.5 rounded-x10",
        classNames?.root
      )}
    >
      <div className={cls("py-4 px-6 flex flex-col gap-2.5", classNames?.main)}>
        <Typography
          as="h3"
          className={cls(
            "uppercase text-gray-400 text-regular-xs",
            classNames?.title
          )}
          loading={loading}
        >
          {title}
        </Typography>
        <div className="flex items-baseline justify-start gap-px">
          <Typography
            as="span"
            className={cls("text-bold-2xl text-black", classNames?.value)}
            loading={loading}
            placeholder="1000"
          >
            {value}
          </Typography>
          {unit && !loading ? (
            <Typography
              as="small"
              className={cls("text-medium-sm text-gray-400", classNames?.unit)}
              loading={loading}
              placeholder="%"
            >
              {unit}
            </Typography>
          ) : null}
        </div>
        {timeframe && (
          <Typography
            as="p"
            className={cls(
              "text-medium-xs text-gray-300",
              classNames?.comparison
            )}
            loading={loading}
          >
            <span
              className={cls(
                change > 0
                  ? "text-success-400"
                  : change < 0
                    ? "text-error-400"
                    : "font-semibold"
              )}
            >
              {change > 0 ? "+" : change < 0 ? "-" : ""} {Math.abs(change)}%
            </span>{" "}
            <span>vs {timeframe}</span>
          </Typography>
        )}
      </div>
      {!removeFooter && (
        <footer
          className={cls(
            "border-t border-gray-50 pt-2 pb-1 flex items-center justify-center",
            classNames?.footer
          )}
        >
          <button
            className={cls(
              "flex items-center justify-center gap-1",
              classNames?.footerBtn
            )}
          >
            <Icon name="icon-trend-up" size={16} className="text-gradient" />
            <Typography as="span" className="text-medium-xs text-gradient">
              AI trend analysis
            </Typography>
          </button>
        </footer>
      )}
    </div>
  )
}

export default MetricCard
