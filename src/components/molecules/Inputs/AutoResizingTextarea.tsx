import { FC } from "@/utils/types"
import { Textarea, TextAreaProps } from "@nextui-org/react"
import React from "react"

type Props = Omit<TextAreaProps, "onChange"> & {
  onChange?: (value: string) => void
}

const AutoResizingTextarea: FC<Props> = ({
  onChange,
  classNames,
  ...props
}) => {
  return (
    <Textarea
      classNames={{
        ...classNames,
        inputWrapper: [
          "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent p-0",
          classNames?.inputWrapper,
        ],
        input: [
          "!text-regular-lg text-gray-900 placeholder:text-gray-300",
          classNames?.input,
        ],
      }}
      minRows={1}
      maxRows={3}
      onValueChange={onChange}
      {...props}
    />
  )
}

export default AutoResizingTextarea
