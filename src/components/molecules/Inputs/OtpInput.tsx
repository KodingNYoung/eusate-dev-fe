"use client"
import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import { cls } from "@/utils/helpers"
import { FC, TWClassNames } from "@/utils/types"
import React, { HTMLProps, useRef, useState } from "react"
import "./style.css"

type Sizes = "lg" | "sm"
type Props = Omit<HTMLProps<HTMLInputElement>, "size" | "onChange"> & {
  label?: string
  helperText?: string
  isError?: boolean
  isSuccess?: boolean
  size?: Sizes
  onChange?: (key: string) => void
}

const inputSize: { [sizes in Sizes]: TWClassNames } = {
  sm: "h-9",
  lg: "h-14",
}

const OtpInput: FC<Props> = ({
  label,
  helperText,
  isError,
  isSuccess,
  size = "lg" as Sizes,
  onChange,
  ...props
}) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (value: string, idx: number) => {
    if (!/^[0-9]?$/.test(value)) return

    const newOtp = [...otp]
    newOtp[idx] = value
    setOtp(newOtp)

    if (value && idx < otp.length - 1) {
      inputsRef.current[idx + 1]?.focus()
    }

    /// Call onChange when OTP is completely filled
    // if (newOtp.every((char) => char !== "")) {
    if (onChange) onChange(newOtp.join(""))
    // }
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if ((e.key === "Backspace" && otp[idx] === "") || e.key === "ArrowLeft") {
      if (idx > 0) {
        inputsRef.current[idx - 1]?.focus()
      }
    } else if (e.key === "ArrowRight" && otp[idx]) {
      if (idx < otp.length - 1) {
        inputsRef.current[idx + 1]?.focus()
      }
    }
  }

  return (
    <div className={"text-input-group"}>
      <label>
        <Typography variant="semibold-sm" className="text-gray-500 px-2">
          {label}
        </Typography>
        <div
          className={cls(
            "text-input-container z-1 mt-1 mb-1.5flex items-center relative rounded-[100px] bg-white-100",
            "before:absolute before:-inset-[1px] before:-z-1 before:size-[calc(100%_+_2px)] before:bg-[linear-gradient(90deg,_var(--inputColor1),_var(--inputColor2))] before:rounded-[inherit] before:transition-[all,_--inputColor1,_--inputColor2] before:duration-300",
            inputSize[size]
          )}
          data-error={isError}
          data-success={isSuccess}
        >
          <div className="flex items-center justify-start gap-1.5  px-4  bg-white-100 w-full h-full rounded-[inherit]">
            {otp.map((_, idx) => {
              return (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={otp[idx]}
                  placeholder="-"
                  onChange={(e) => handleChange(e.target.value, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  ref={(el) => {
                    inputsRef.current[idx] = el
                  }}
                  className={cls(
                    "transition-colors duration-200 outline-0 relative regular-sm font-app text-gray-900 bg-tranparent w-3",
                    "placeholder:text-regular-sm placeholder:text-gray-400 text-center",
                    idx === 2 && "mr-2"
                  )}
                  {...props}
                />
              )
            })}
          </div>

          <span className="absolute top-1/2 -translate-y-1/2 right-3 -ml-7 flex h-5 w-5 items-center text-gray-900">
            {isError ? (
              <Icon
                name="icon-info-circle"
                className="text-error-500 text-regular-xl"
              />
            ) : isSuccess ? (
              <Icon
                name="icon-tick-circle"
                className="text-success-600 text-regular-xl"
              />
            ) : null}
          </span>
        </div>
      </label>
      {helperText && (
        <Typography
          as="span"
          variant="regular-xs"
          data-error={isError}
          data-success={isSuccess}
          className={cls(
            "text-gray-500 data-[success=true]:text-success-600 data-[error=true]:text-error-500"
          )}
        >
          {helperText}
        </Typography>
      )}
    </div>
  )
}

export default OtpInput
