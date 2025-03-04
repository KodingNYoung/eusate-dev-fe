import AppSelect, { AppSelectProps } from "@/components/molecules/AppSelect"
import { FC } from "@/utils/types"
import React from "react"

type Props = Omit<AppSelectProps, "value"> & {
  errors: Record<string, string>
  touched: Record<string, boolean>
  onFieldChange: (name: string, value: unknown) => void
  name: string
  value: string
}

const DSSelect: FC<Props> = ({
  placeholder,
  errors,
  touched,
  name,
  value,
  onFieldChange,
  classNames,
  ...props
}) => {
  return (
    <AppSelect
      name={name}
      selectedKeys={[value]}
      classNames={{
        ...classNames,
        base: ["w-full", classNames?.base],
        trigger: ["rounded-[100px]", classNames?.trigger],
        label: [
          "text-gray-700 group-data-[filled=true]:text-gray-700",
          classNames?.label,
        ],
      }}
      size="lg"
      isInvalid={touched[name] && !!errors[name]}
      errorMessage={touched[name] ? errors[name] : ""}
      onChange={(e) => onFieldChange(name, e.target.value)}
      placeholder={placeholder || "Choose an option"}
      {...props}
    />
  )
}

export default DSSelect
