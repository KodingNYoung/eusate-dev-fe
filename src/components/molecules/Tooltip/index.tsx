"use client"

import { cls } from "@/utils/helpers"
import { FC, TWClassNames } from "@/utils/types"
import React, { MouseEvent, ReactNode, useRef, useState } from "react"

type TooltipPosition = "top" | "bottom" | "left" | "right"
type Alignment = "start" | "center" | "end"
type PositionAlignment = `${TooltipPosition}-${Alignment}`
type Slots = "root" | "reference" | "tooltip"

type Props = {
  position?: TooltipPosition
  alignment?: Alignment
  reference?: ReactNode
  classNames?: { [slot in Slots]?: TWClassNames }
}

const positionClassNameMap: {
  [positionalign in PositionAlignment]: TWClassNames
} = {
  "top-start": "bottom-[calc(100%_+_10px)] left-0",
  "top-center": "bottom-[calc(100%_+_10px)] left-1/2 -translate-x-1/2",
  "top-end": "bottom-[calc(100%_+_10px)] right-0",
  "right-start": "left-[calc(100%_+_10px)] top-0",
  "right-center": "left-[calc(100%_+_10px)] top-1/2 -translate-y-1/2",
  "right-end": "left-[calc(100%_+_10px)] bottom-0",
  "bottom-start": "top-[calc(100%_+_10px)] left-0",
  "bottom-center": "top-[calc(100%_+_10px)] left-1/2 -translate-x-1/2",
  "bottom-end": "top-[calc(100%_+_10px)] right-0",
  "left-start": "right-[calc(100%_+_10px)] top-0",
  "left-center": "right-[calc(100%_+_10px)] top-1/2 -translate-y-1/2",
  "left-end": "right-[calc(100%_+_10px)] bottom-0",
}
const positionAltMap: {
  [positionalign in PositionAlignment]: PositionAlignment[]
} = {
  "top-start": ["top-start", "left-start", "bottom-start"],
  "top-center": ["top-center", "bottom-center"],
  "top-end": ["top-end", "right-start", "bottom-end"],
  "right-start": ["right-start", "top-end", "bottom-end"],
  "right-center": ["right-center", "top-end", "bottom-end"],
  "right-end": ["right-end", "bottom-end", "top-end"],
  "bottom-start": ["bottom-start", "left-end", "top-start"],
  "bottom-center": ["bottom-center", "top-center"],
  "bottom-end": ["bottom-end", "right-end", "top-end"],
  "left-start": ["left-start", "top-start", "bottom-start"],
  "left-center": ["left-center", "top-start", "bottom-start"],
  "left-end": ["left-end", "bottom-start", "top-start"],
}

const checkPositionValidity = (
  position: TooltipPosition,
  dimension: {
    target: DOMRect
    tooltip: DOMRect
    window: { width: number; height: number }
  }
) => {
  const { target, window, tooltip } = dimension
  if (position === "top" && target.top - 10 - tooltip.height < 0) {
    return false
  } else if (
    position === "bottom" &&
    target.bottom + 10 + tooltip.height > window.height
  ) {
    return false
  } else if (position === "left" && target.left - 10 - tooltip.width < 0) {
    return false
  } else if (
    position === "right" &&
    target.right + 10 + tooltip.width > window.width
  ) {
    return false
  }

  console.log({ position, target, tooltip, window })
  return true
}
const getValidPosition = (
  targetEl: Element,
  tooltipEl: Element | null,
  position: TooltipPosition,
  alignment: Alignment
) => {
  if (typeof window === "undefined" || !tooltipEl) return

  const target = targetEl.getBoundingClientRect()
  const tooltipRects = tooltipEl.getBoundingClientRect()
  const altPositions = positionAltMap[`${position}-${alignment}`]

  const validPosition = altPositions.find((positionAlignment) => {
    const position = positionAlignment.split("-")[0] as TooltipPosition
    console.log(position)
    return checkPositionValidity(position, {
      target,
      tooltip: tooltipRects,
      window: { height: innerHeight, width: innerWidth },
    })
  })
  return validPosition
}

const Tooltip: FC<Props> = ({
  position = "top",
  alignment = "center",
  reference,
  children,
  classNames,
}) => {
  const targetRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const [tooltipPositionClass, setTooltipPositionClass] = useState<string>()
  const [visible, setVisiblity] = useState(false)

  const handleTooltipDisplay = (e: MouseEvent<HTMLDivElement>) => {
    const validPosition =
      getValidPosition(
        e.currentTarget,
        tooltipRef.current,
        position,
        alignment
      ) || `${position}-${alignment}`
    const className = positionClassNameMap[validPosition]
    setTooltipPositionClass(className)
    setVisiblity(true)
    console.log({ className, validPosition })
  }

  return (
    <div
      ref={targetRef}
      onMouseEnter={handleTooltipDisplay}
      onMouseLeave={() => {
        setVisiblity(false)
        setTooltipPositionClass("")
      }}
      className={cls("relative w-fit border", classNames?.root)}
    >
      <div className={cls("relative whitespace-nowrap", classNames?.reference)}>
        {reference}
      </div>
      <div
        ref={tooltipRef}
        role="tooltip"
        className={cls(
          "absolute z-2 bg-black-100 text-white-100",
          visible ? "opacity-100" : "opacity-0 pointer-events-none",
          tooltipPositionClass,
          classNames?.tooltip
        )}
      >
        {children}
      </div>
    </div>
  )
}

export default Tooltip
