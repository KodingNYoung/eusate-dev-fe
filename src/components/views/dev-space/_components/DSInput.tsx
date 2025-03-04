import Input, { InputProps } from "@/components/molecules/Inputs"
import { cls } from "@/utils/helpers"
import { FC } from "@/utils/types"
import React from "react"

type Props = InputProps & {
  errors: Record<string, string>
  touched: Record<string, boolean>
  onFieldChange: (name: string, value: unknown) => void
}

const DSInput: FC<Props> = ({
  name,
  touched,
  errors,
  onFieldChange,
  classNames,
  ...props
}) => {
  return (
    <Input
      name={name}
      isError={touched[name] && !!errors[name]}
      helperText={touched[name] ? errors[name] : ""}
      onChange={(e) => {
        onFieldChange(name, e.currentTarget.value)
      }}
      classNames={{
        ...classNames,
        input: cls("resize-none", classNames?.input),
        label: cls("text-gray-700", classNames?.label),
      }}
      {...props}
    />
  )
}

export default DSInput
