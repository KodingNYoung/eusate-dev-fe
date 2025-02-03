import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import AppTooltip from "@/components/molecules/Tooltip"
import { cls } from "@/utils/helpers"
import { FC, TableColumn } from "@/utils/types"
import React, { ReactNode } from "react"

type Props = Omit<TableColumn, "render" | "id"> & { value: ReactNode | null }

const RowAccordionItem: FC<Props> = ({ title, value, tooltip }) => {
  return (
    <div className="flex items-center justify-between px-3 py-3.5 rounded odd:bg-gray-25 ">
      <Typography
        variant="medium-xs"
        className="flex items-center gap-1 text-gray-600"
      >
        <span className="leading-none">{title}</span>
        {tooltip && (
          <AppTooltip
            placement="right"
            trigger="click"
            content={tooltip.content}
            classNames={{
              ...tooltip.classNames,
              content: cls("p-3", tooltip.classNames?.content),
            }}
          >
            <button>
              <Icon name="icon-help" size={16} />
            </button>
          </AppTooltip>
        )}
      </Typography>
      <span>{value}</span>
    </div>
  )
}

export default RowAccordionItem
