"use client"

import { cls } from "@/utils/helpers"
import { FC, TWClassNames } from "@/utils/types"
import React, { ReactNode, useMemo, useRef } from "react"

export type TooltipPosition = "top" | "bottom" | "left" | "right"
export type TooltipAlignment = "start" | "center" | "end"
type PositionAlignment = `${TooltipPosition}-${TooltipAlignment}`
type Slots = "root" | "reference" | "tooltip"

export type TooltipProps = {
  position?: TooltipPosition
  alignment?: TooltipAlignment
  content?: ReactNode
  classNames?: { [slot in Slots]?: TWClassNames }
  visible: boolean
  close?: () => void
}

const positionClassNames: {
  [positionalign in PositionAlignment]: TWClassNames
} = {
  "top-start": "bottom-[calc(100%_+_12px)] left-0 ",
  "top-center": "bottom-[calc(100%_+_12px)] left-1/2 -translate-x-1/2",
  "top-end": "bottom-[calc(100%_+_12px)] right-0 ",
  "right-start": "left-[calc(100%_+_12px)] top-0",
  "right-center": "left-[calc(100%_+_12px)] top-1/2 -translate-y-1/2",
  "right-end": "left-[calc(100%_+_12px)] bottom-0",
  "bottom-start": "top-[calc(100%_+_12px)] left-0",
  "bottom-center": "top-[calc(100%_+_12px)] left-1/2 -translate-x-1/2",
  "bottom-end": "top-[calc(100%_+_12px)] right-0",
  "left-start": "right-[calc(100%_+_12px)] top-0",
  "left-center": "right-[calc(100%_+_12px)] top-1/2 -translate-y-1/2",
  "left-end": "right-[calc(100%_+_12px)] bottom-0",
}
const arrowClassNames = {
  "top-start":
    "after:top-full after:left-3 after:border-y-[10px] after:border-x-[5px] after:border-[color:black_transparent_transparent_transparent]",
  "top-center":
    "after:top-full after:left-1/2 after:-translate-x-1/2 after:border-y-[10px] after:border-x-[5px] after:border-[color:black_transparent_transparent_transparent]",
  "top-end":
    "after:top-full after:right-3 after:border-y-[10px] after:border-x-[5px] after:border-[color:black_transparent_transparent_transparent]",
  "right-start":
    "after:right-full after:top-3 after:border-x-[10px] after:border-y-[5px] after:border-[color:transparent_black_transparent_transparent]",
  "right-center":
    "after:right-full after:top-1/2 after:-translate-y-1/2 after:border-x-[10px] after:border-y-[5px] after:border-[color:transparent_black_transparent_transparent]",
  "right-end":
    "after:right-full after:bottom-3 after:border-x-[10px] after:border-y-[5px] after:border-[color:transparent_black_transparent_transparent]",
  "bottom-start":
    "after:bottom-full after:left-3 after:border-y-[10px] after:border-x-[5px] after:border-[color:transparent_transparent_black_transparent]",
  "bottom-center":
    "after:bottom-full after:left-1/2 after:-translate-x-1/2 after:border-y-[10px] after:border-x-[5px] after:border-[color:transparent_transparent_black_transparent]",
  "bottom-end":
    "after:bottom-full after:right-3 after:border-y-[10px] after:border-x-[5px] after:border-[color:transparent_transparent_black_transparent]",
  "left-start":
    "after:left-full after:top-3 after:border-x-[10px] after:border-y-[5px] after:border-[color:transparent_transparent_transparent_black]",
  "left-center":
    "after:left-full after:top-1/2 after:-transalte-y-1/2 after:border-x-[10px] after:border-y-[5px] after:border-[color:transparent_transparent_transparent_black]",
  "left-end":
    "after:left-full after:bottom-3 after:border-x-[10px] after:border-y-[5px] after:border-[color:transparent_transparent_transparent_black]",
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

  return true
}
const getValidPosition = (
  targetEl: Element | null,
  tooltipEl: Element | null,
  position: TooltipPosition,
  alignment: TooltipAlignment
) => {
  if (typeof window === "undefined" || !tooltipEl || !targetEl) return

  const target = targetEl.getBoundingClientRect()
  const tooltipRects = tooltipEl.getBoundingClientRect()
  const altPositions = positionAltMap[`${position}-${alignment}`]

  const validPosition = altPositions.find((positionAlignment) => {
    const position = positionAlignment.split("-")[0] as TooltipPosition
    return checkPositionValidity(position, {
      target,
      tooltip: tooltipRects,
      window: { height: innerHeight, width: innerWidth },
    })
  })
  return validPosition
}

const Tooltip: FC<TooltipProps> = ({
  position = "top",
  alignment = "center",
  content,
  children,
  classNames,
  visible,
  close,
}) => {
  const targetRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const hideTimer = useRef<NodeJS.Timeout>()

  const validPosition = useMemo(() => {
    if (visible) {
      clearTimeout(hideTimer.current)
      const validPosition =
        getValidPosition(
          targetRef.current,
          tooltipRef.current,
          position,
          alignment
        ) || `${position}-${alignment}`

      return validPosition
    }
  }, [visible, position, alignment])

  return (
    <div ref={targetRef} className={cls("relative w-fit", classNames?.root)}>
      <div className={cls("relative whitespace-nowrap", classNames?.reference)}>
        {children}
      </div>
      {visible && (
        <div>
          {close && (
            <div
              className="fixed z-3 top-0 left-0 w-screen h-screen"
              onClick={close}
            />
          )}
          <div
            ref={tooltipRef}
            role="tooltip"
            className={cls(
              "absolute z-4 bg-black-100 text-white-100 text-regular-sm whitespace-normal",
              "after:absolute",
              visible ? "opacity-100" : "opacity-0 pointer-events-none",
              validPosition && positionClassNames[validPosition],
              validPosition && arrowClassNames[validPosition],

              classNames?.tooltip
            )}
          >
            {content}
          </div>
        </div>
      )}
    </div>
  )
}

export default Tooltip
