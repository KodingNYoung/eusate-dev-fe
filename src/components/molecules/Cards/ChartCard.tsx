import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import { cls } from "@/utils/helpers"
import { FC, TWClassNames } from "@/utils/types"
import React, { ReactNode } from "react"

type Slots = "root" | "header" | "h3" | "main" | "footer" | "button"

type Props = {
  title: ReactNode
  classNames?: { [slot in Slots]?: TWClassNames }
  hideTrendAnalysis?: boolean
}

const ChartCard: FC<Props> = ({
  children,
  title,
  classNames,
  hideTrendAnalysis,
}) => {
  return (
    <div
      className={cls(
        "border border-gray-50 py-1.5 flex flex-col gap-2.5 rounded-x10",
        classNames?.root
      )}
    >
      <header
        className={cls("px-6 py-4 border-b border-gray-50", classNames?.header)}
      >
        <Typography
          as="h3"
          className={cls("text-semibold-base text-gray-900", classNames?.h3)}
        >
          {title}
        </Typography>
      </header>
      <main
        className={cls(
          "px-6 py-3.5 flex flex-col gap-2.5 flex-1",
          classNames?.main
        )}
      >
        {children}
      </main>
      {!hideTrendAnalysis && (
        <footer
          className={cls(
            "border-t border-gray-50 pt-2 pb-1 flex items-center justify-center",
            classNames?.footer
          )}
        >
          <button
            className={cls(
              "flex items-center justify-center gap-1",
              classNames?.button
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

export default ChartCard
