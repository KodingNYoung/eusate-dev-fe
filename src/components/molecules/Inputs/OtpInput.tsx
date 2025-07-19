"use client"
import Typography from "@/components/atoms/Typography"
import { cls } from "@/utils/helpers"
import { FC } from "@/utils/types"
import React, { ClipboardEvent, HTMLProps, useRef, useState } from "react"
import "./style.css"

type Props = Omit<HTMLProps<HTMLInputElement>, "size" | "onChange"> & {
  label?: string
  helperText?: string
  isError?: boolean
  isSuccess?: boolean
  onChange?: (key: string) => void
}

const OtpInput: FC<Props> = ({
  label,
  helperText,
  isError,
  isSuccess,
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
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text")
    if (!text) return
    const pastedCode = text.slice(0, 6)
    setOtp(pastedCode.split(""))
    if (onChange) onChange(pastedCode)
  }

  return (
    <div className={"text-input-group"}>
      <Typography variant="semibold-sm" className="text-gray-500">
        {label}
      </Typography>
      <div data-error={isError} data-success={isSuccess} className="mt-5">
        <div className="flex items-center justify-start gap-2.5  bg-white-100 w-full h-full rounded-[inherit]">
          {otp.map((_, idx) => {
            return (
              <label
                htmlFor={`${idx}`}
                className={cls(
                  "aspect-square text-gray-900 text-semibold-xl rounded-xl placeholder:text-gray-400 outline-none relative",
                  "before:absolute before:-inset-[1px] before:z-0 before:size-[calc(100%_+_2px)] has-[:focus]:before:[--inputColor1:#d7ab07] has-[:focus]:before:[--inputColor2:#e86555] before:bg-[linear-gradient(90deg,_var(--inputColor1),_var(--inputColor2))] before:rounded-[inherit] before:transition-[all,_--inputColor1,_--inputColor2] before:duration-400 "
                )}
                style={{ width: `${100 / otp.length}%`, maxWidth: "80px" }}
                key={idx}
              >
                <input
                  id={`${idx}`}
                  type="text"
                  maxLength={1}
                  value={otp[idx]}
                  placeholder="-"
                  onChange={(e) => handleChange(e.target.value, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  onPaste={handlePaste}
                  inputMode="numeric"
                  ref={(el) => {
                    inputsRef.current[idx] = el
                  }}
                  className={cls(
                    "relative w-full h-full text-center rounded-[inherit] outline-0"
                  )}
                  {...props}
                  autoFocus={idx === 0}
                />
              </label>
            )
          })}
        </div>
      </div>
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
