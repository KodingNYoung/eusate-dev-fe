import { FC } from "@/utils/types"
import React, { HTMLProps, useState } from "react"
import Tooltip from "../Tooltip"
import { copy } from "@/utils/helpers"

type Props = Omit<HTMLProps<HTMLButtonElement>, "type"> & {
  text: string
}

const CopyButton: FC<Props> = ({ children, className, text, ...props }) => {
  const [tooltip, setTooltip] = useState(false)
  return (
    <Tooltip
      isOpen={tooltip}
      content="Copied"
      trigger="click"
      classNames={{ content: "rounded-lg p-1.5 text-gray-100" }}
    >
      <button
        className={className}
        onClick={() => {
          copy(text)
          setTooltip(true)
          setTimeout(() => {
            setTooltip(false)
          }, 1000)
        }}
        type="button"
        {...props}
      >
        {children}
      </button>
    </Tooltip>
  )
}

export default CopyButton
