import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import Radio, { RadioProps } from "@/components/molecules/Radio"
import { cls } from "@/utils/helpers"
import { IconNames } from "@/utils/iconNames"
import { FC } from "@/utils/types"
import React from "react"

type Props = Omit<RadioProps, "id"> & {
  icon: IconNames
  title: string
  subtitle: string
}

const SourceModalRadio: FC<Props> = ({
  icon,
  value,
  title,
  subtitle,
  classNames,
  ...props
}) => {
  return (
    <Radio
      id={value}
      value={value}
      classNames={{
        icon: cls("hidden", classNames?.icon),
        label: cls("flex flex-col gap-3", classNames?.label),
        root: cls(
          "!p-4 before:[--radioColor1:#F0F1F3] before:[--radioColor2:#F0F1F3]",
          classNames?.root
        ),
      }}
      {...props}
    >
      <span
        className={cls(
          "size-10 min-w-10 min-h-10 rounded-full border border-gray-50 bg-gray-25  flex justify-center items-center text-gray-700",
          "group-has-[:checked]/radio:border-0 group-has-[:checked]/radio:bg-brand-gradient group-has-[:checked]/radio:text-white", //checked
          "group-hover/radio:border-gray-700 group-hover/radio:text-gray-900" // hover
        )}
      >
        <Icon name={icon} className="text-regular-xl" />
      </span>
      <div className="grid gap-3">
        <Typography as="h3" variant="medium-sm" className="text-gray-900">
          {title}
        </Typography>
        <Typography className="text-gray-400" as="span" variant="regular-xs">
          {subtitle}
        </Typography>
      </div>
    </Radio>
  )
}

export default SourceModalRadio
