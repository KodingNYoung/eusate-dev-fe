import Typography from "@/components/atoms/Typography"
import { cls } from "@/utils/helpers"
import { FC, TWClassNames } from "@/utils/types"
import React, { HTMLProps } from "react"
import "./style.css"

type Slots = "root" | "label" | "input" | "icon"
type Props = HTMLProps<HTMLInputElement> & {
  id: string
  name: string
  classNames?: { [slot in Slots]?: TWClassNames }
}

const labelledRadioStyle = cls(
  "px-2.5 py-2 radio-with-label relative rounded-lg bg-white-100 transition-all duration-300", //default
  "before:content-[''] before:absolute before:-inset-[1px] before:-z-1 before:size-[calc(100%_+_2px)] before:bg-[linear-gradient(90deg,_var(--radioColor1),_var(--radioColor2))] before:rounded-[9px] before:transition-[all,_--radioColor1,_--radioColor2] before:duration-300", // default - before pseudo
  "has-[:checked]:bg-gold-50"
)
const radioIconOuterStyle = cls(
  "radio-icon-outer-circle min-w-6 min-h-6 size-6 rounded-full flex justify-center items-center bg-[linear-gradient(90deg,_var(--radioColor1),_var(--radioColor2))] rounded-full transition-[all,_--radioColor1,_--radioColor2] duration-300 p-[1px]"
)
const radioIconMidStyle = cls(
  "radio-icon-mid-circle size-full rounded-[inherit] transition-colors duration-300 bg-gray-100 group-has-[:checked]:bg-gold-50 flex justify-center items-center"
)
const radioIconInnerStyle = cls(
  "radio-icon-inner-circle size-1/2 rounded-[inherit] bg-[linear-gradient(90deg,_var(--radioColor1),_var(--radioColor2))] transition-[all,_--radioColor1,_--radioColor2] duration-300"
)

const Radio: FC<Props> = ({ children, id, name, classNames, ...props }) => {
  const hasLabel = !!children
  return (
    <label
      htmlFor={id}
      className={cls(
        "flex gap-2.5 group radio",
        hasLabel && labelledRadioStyle,
        classNames?.root
      )}
    >
      <input
        type="radio"
        id={id}
        name={name}
        className={cls("peer absolute opacity-0", classNames?.input)}
        {...props}
      />
      <span className={cls(radioIconOuterStyle, classNames?.icon)}>
        <span className={cls(radioIconMidStyle)}>
          <span className={radioIconInnerStyle}></span>
        </span>
      </span>
      {hasLabel && (
        <Typography
          className={cls(
            "text-gray-500 peer-[:checked]:text-gray-900 peer-[:checked]:!text-medium-base",
            classNames?.label
          )}
        >
          {children}
        </Typography>
      )}
    </label>
  )
}

export default Radio
