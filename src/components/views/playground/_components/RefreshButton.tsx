import Icon from "@/components/atoms/Icon"
import Button from "@/components/molecules/Buttons"
import { FC } from "@/utils/types"
import React from "react"

const RefreshButton: FC = () => {
  return (
    <Button
      variant="tetiaryText"
      size="mini"
      classNames={{
        root: "!border-0 focus:border-0 active:border-0",
        label: "!leading-none",
      }}
    >
      <Icon name="icon-refresh" size={20} />
    </Button>
  )
}

export default RefreshButton
