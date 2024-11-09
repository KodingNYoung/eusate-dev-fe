import { FC } from "@/utils/types"
import React, { useState } from "react"
import Tooltip from "../Tooltip"
import { copy } from "@/utils/helpers"

type Props = {
  text: string
}

const CopyButton: FC<Props> = ({ children, className, text }) => {
  const [tooltip, setTooltip] = useState(false)

  return (
    <Tooltip
      content="Copied"
      classNames={{ tooltip: "rounded-lg p-1.5 text-gray-100" }}
      visible={tooltip}
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
      >
        {children}
      </button>
    </Tooltip>
  )
}

export default CopyButton
