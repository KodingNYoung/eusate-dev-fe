import Icon from "@/components/atoms/Icon"
import Spinner from "@/components/atoms/Spinner"
import Typography from "@/components/atoms/Typography"
import Radio, { RadioProps } from "@/components/molecules/Radio"
import { cls } from "@/utils/helpers"
import { FC } from "@/utils/types"
import React from "react"

type Props = Omit<RadioProps, "id"> & {
  title: string
  subtitle: string
  loading?: boolean
}

const UsageRadio: FC<Props> = ({
  value,
  title,
  subtitle,
  classNames,
  loading,
  ...props
}) => {
  return (
    <Radio
      id={value}
      value={value}
      classNames={{
        icon: "hidden",
        label: cls("flex flex-col gap-2", classNames?.label),
        root: cls(
          "!p-5 !pb-10 items-stretch [&:has(input:not(:checked))]:bg-gray-25 before:[--radioColor1:#F0F1F3] before:[--radioColor2:#F0F1F3]",
          classNames?.root
        ),
      }}
      data-custom
      {...props}
    >
      <div className={cls("size-6 absolute top-2 right-2")}>
        {loading ? (
          <Spinner />
        ) : (
          <Icon
            name="icon-tick-circle-bold"
            className="text-gradient invisible group-has-[:checked]/radio:visible "
            size={24}
          />
        )}
      </div>
      <Typography variant="semibold-base" className="text-black">
        {title}
      </Typography>
      <Typography variant="regular-sm" className="text-gray-500">
        {subtitle}
      </Typography>
    </Radio>
  )
}

export default UsageRadio
