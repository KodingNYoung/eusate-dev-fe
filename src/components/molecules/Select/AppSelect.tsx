"use client"

import { FC, TWClassNames } from "@/utils/types"
import React, { ReactNode, useMemo, useRef, useState } from "react"
import Typography from "../../atoms/Typography"
import { cls } from "@/utils/helpers"
import HelperText from "../../atoms/HelperText"
import Icon from "@/components/atoms/Icon"
import "../Inputs/style.css"
import { AnimatePresence, motion } from "framer-motion"

type Item = { key: string; label: ReactNode }
type Slots = "root" | "label" | "trigger" | "placeholder" | "helperText"
export type AppSelectProps = {
  name: string
  options: Item[]
  label?: string
  isError?: boolean
  isSuccess?: boolean
  classNames?: { [slot in Slots]?: TWClassNames }
  placeholder?: string
  helperText?: string
  showCancelButton?: boolean
  valueKey?: string
  onChange?: (value?: string) => void
}

const AppSelect: FC<AppSelectProps> = ({
  name,
  options,
  label,
  isError,
  isSuccess,
  classNames,
  placeholder,
  helperText,
  valueKey,
  showCancelButton,
  onChange,
}) => {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState<Item | undefined>(
    options.find((option) => option.key === valueKey)
  )

  const shouldOpenAbove = useMemo(() => {
    if (!open) return
    const menuHeight = menuRef.current?.getClientRects()?.item(0)?.height
    const triggerBottomDistanceToBottom =
      window.innerHeight -
      (triggerRef.current?.getClientRects()?.item(0)?.bottom || 0)

    if (triggerBottomDistanceToBottom < (menuHeight || 0) + 20) return true

    return false
  }, [open])

  const handleSelectChange = (value?: Item) => {
    setSelectedValue(value)
    if (onChange) {
      onChange(value?.key)
    }
  }

  const menu = (
    <div
      className={cls(
        "relative shadow-soft-medium border border-gray-50 rounded-xl bg-white p-1 grid overflow-auto max-h-52 "
      )}
    >
      {options.length ? (
        options.map((option, idx) => {
          return (
            <button
              type="button"
              key={idx}
              onClick={() => {
                handleSelectChange(option)
                setOpen(false)
              }}
              className="p-3 text-medium-sm text-left text-black flex items-center justify-between [&_svg]:size-4 hover:opacity-70"
            >
              {option?.label}{" "}
              {option.key === selectedValue?.key ? (
                <Icon name="icon-tick" size={20} />
              ) : null}
            </button>
          )
        })
      ) : (
        <span className="inline-block p-3">No items.</span>
      )}
    </div>
  )

  return (
    <div className="relative text-input-group">
      <Typography
        variant="semibold-sm"
        className={cls("text-gray-500 px-2", classNames?.label)}
      >
        {label}
      </Typography>
      <div className="relative">
        <input name={name} value={selectedValue?.key || ""} hidden readOnly />
        <button
          type="button"
          className={cls(
            "text-input-container mt-1 mb-1.5 rounded-[100px] relative w-full",
            "before:absolute before:-inset-[1px] before:z-0 before:size-[calc(100%_+_2px)] before:bg-[linear-gradient(90deg,_var(--inputColor1),_var(--inputColor2))] before:rounded-[inherit] before:transition-[all,_--inputColor1,_--inputColor2] before:duration-300",
            classNames?.trigger
          )}
          data-open={open}
          data-error={isError}
          data-success={isSuccess}
          onClick={() => setOpen(true)}
          ref={triggerRef}
        >
          <div
            data-selected={!!selectedValue?.key}
            className={cls(
              "w-full h-full bg-white relative z-1 rounded-[inherit] text-regular-sm text-gray-400 flex items-center justify-between px-4 py-4.5 gap-4",
              "data-[selected=true]:text-gray-900",
              classNames?.placeholder
            )}
          >
            <span className="flex-1 inline-block text-left whitespace-nowrap">
              {selectedValue?.label || placeholder}
            </span>
            {selectedValue && showCancelButton && (
              <Icon
                name="icon-close"
                size={16}
                className="text-gray-900 ml-auto"
                onClick={(e) => {
                  e.stopPropagation()
                  handleSelectChange(undefined)
                }}
              />
            )}
            <Icon
              name="icon-chevron-down"
              size={20}
              className={cls(
                "text-gray-900 transition-transform inline-block",
                open ? "rotate-180" : "rotate-0"
              )}
            />
          </div>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              className={cls(
                "absolute w-full z-2",
                shouldOpenAbove ? "bottom-full" : "top-full"
              )}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, stiffness: 300, damping: 20 }}
            >
              <div
                className="fixed top-0 left-0 w-full h-full"
                onClick={() => setOpen(false)}
              />
              {menu}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="opacity absolute -left-[10000px]" ref={menuRef}>
          {menu}
        </div>
      </div>

      {helperText && (
        <HelperText
          isError={isError}
          isSuccess={isSuccess}
          className={cls(classNames?.helperText)}
        >
          {helperText}
        </HelperText>
      )}
    </div>
  )
}

export default AppSelect
