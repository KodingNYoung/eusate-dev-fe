import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import Button from "@/components/molecules/Buttons"
import BottomDrawer from "@/components/molecules/Popups/BottomDrawer"
import { FC, TableColumn } from "@/utils/types"
import React, { ReactNode, useState } from "react"

type Props = Omit<TableColumn, "render" | "id"> & { value: ReactNode | null }

const RowAccordionItem: FC<Props> = ({ title, value, tooltip }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false)

  const close = () => setTooltipOpen(false)

  return (
    <div className="flex items-center justify-between px-3 py-3.5 rounded odd:bg-gray-25 ">
      <Typography
        variant="medium-xs"
        className="flex items-center gap-1 text-gray-600"
      >
        <span className="leading-none">{title}</span>
        {tooltip && (
          <button onClick={() => setTooltipOpen(true)}>
            <Icon
              name="icon-help"
              className="!text-regular-base !leading-none"
            />
          </button>
        )}
      </Typography>
      <span>{value}</span>
      {tooltip && (
        <BottomDrawer isOpen={tooltipOpen} close={close} title={tooltip?.title}>
          <div className="flex flex-col px-4 py-6 gap-9">
            <Typography
              variant="regular-xs"
              as="span"
              className="text-gray-500"
            >
              {tooltip?.subtitle}
            </Typography>
            <Button
              onClick={close}
              classNames={{
                root: "sm-gradient py-4.5 w-full",
                label: "text-semibold-sm",
              }}
            >
              Ok, got it!
            </Button>
          </div>
        </BottomDrawer>
      )}
    </div>
  )
}

export default RowAccordionItem
