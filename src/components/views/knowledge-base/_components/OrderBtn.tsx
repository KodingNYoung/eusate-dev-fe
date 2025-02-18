import Icon from "@/components/atoms/Icon"
import { IconNames } from "@/utils/iconNames"
import { FC } from "@/utils/types"
import React, { HTMLProps } from "react"

type Props = Omit<HTMLProps<HTMLButtonElement>, "type"> & { icon: IconNames }

const OrderBtn: FC<Props> = ({ icon, ...props }) => {
  return (
    <button
      className="w-[22px] h-[22px] flex items-center justify-center text-gray-200 bg-black-100 bg-opacity-0 rounded-full data-[active=true]:text-white data-[active=true]:bg-opacity-100 transition-all duration-300"
      {...props}
    >
      <Icon name={icon} className="!text-regular-base" />
    </button>
  )
}

export default OrderBtn
