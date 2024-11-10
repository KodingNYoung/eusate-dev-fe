import AuthAppIcon from "@/components/atoms/AuthAppIcon"
import EmailIcon from "@/components/atoms/EmailIcon"
import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import { TwoFAMethods } from "@/utils/enums"
import { cls } from "@/utils/helpers"
import { FC, TWClassNames } from "@/utils/types"
import React, { HTMLProps } from "react"
import "@/components/molecules/Radio/style.css"

type Slots = "root" | "label" | "input" | "icon"
type Props = HTMLProps<HTMLInputElement> & {
  id: string
  name: string
  value: string
  title: string
  description: string
  classNames?: { [slot in Slots]?: TWClassNames }
}

const labelledRadioStyle = cls(
  "p-5 radio-with-label relative rounded-lg bg-white-100 transition-all duration-300", //default
  "before:content-[''] before:absolute before:-inset-[1px] before:-z-1 before:size-[calc(100%_+_2px)] before:bg-[linear-gradient(90deg,_var(--radioColor1),_var(--radioColor2))] before:rounded-[9px] before:transition-[all,_--radioColor1,_--radioColor2] before:duration-300", // default - before pseudo
  "has-[:checked]:bg-gold-50"
)

const MethodRadio: FC<Props> = ({
  id,
  name,
  classNames,
  title,
  description,
  value,
  ...props
}) => {
  return (
    <div className="relative z-1">
      <label
        htmlFor={id}
        className={cls(
          "flex gap-2.5 group radio h-full",
          labelledRadioStyle,
          classNames?.root
        )}
      >
        <input
          type="radio"
          id={id}
          name={name}
          className={cls("peer absolute opacity-0", classNames?.input)}
          value={value}
          {...props}
        />

        <div className="flex flex-col gap-10 w-full">
          <div className="flex justify-between items-center w-full">
            {value === TwoFAMethods.AUTHENTICATOR && <AuthAppIcon />}
            {value === TwoFAMethods.EMAIL && <EmailIcon />}
            <div className="border-2 border-gray-100 border-opacity-100 group-has-[:checked]:border-opacity-0 transition-opacity duration-300 w-7 h-7 flex justify-center items-center rounded-full">
              <Icon
                name="icon-tick-circle-bold"
                className={cls(
                  "radio-icon-outer-circle text-regular-3xl leading-none bg-[linear-gradient(90deg,_#d7ab07,_#e86555)] transition-opacity duration-300 bg-clip-text text-transparent opacity-0 group-has-[:checked]:opacity-100"
                )}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Typography
              variant="semibold-xl"
              className={cls("text-gray-900", classNames?.label)}
            >
              {title}
            </Typography>
            <Typography variant="regular-sm" className="text-gray-500">
              {description}
            </Typography>
          </div>
        </div>
      </label>
    </div>
  )
}

export default MethodRadio
