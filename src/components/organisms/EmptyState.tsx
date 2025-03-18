import { FC } from "@/utils/types"
import { StaticImport } from "next/dist/shared/lib/get-img-props"
import Image from "next/image"
import React from "react"
import Typography from "../atoms/Typography"
import OpenModalButton from "../molecules/Buttons/OpenModalButton"
import Icon from "../atoms/Icon"
import { PopupKeys } from "@/utils/enums"

type Props = {
  img: StaticImport
  modalKey?: PopupKeys
  title: string
  subtitle: string
  buttonLabel?: string
}

const EmptyState: FC<Props> = ({
  img,
  modalKey,
  title,
  subtitle,
  buttonLabel,
}) => {
  return (
    <section className="border border-gray-50 rounded-xl sm:rounded-x20 px-8 py-10 sm:p-10 ">
      <div className="max-w-[352px] w-full text-center flex flex-col items-center justify-center mx-auto">
        <Image
          height={160}
          width={220}
          src={img}
          alt="empty state image"
          className="w-[150px] sm:w-[220px]"
          priority
        />
        <div className="text-center my-4 max-w-[90%] grid gap-2 sm:gap-1">
          <Typography className="teext-semibold-sm sm:text-semibold-base text-gray-900">
            {title}
          </Typography>
          <Typography className="text-regular-sm text-gray-500">
            {subtitle}
          </Typography>
        </div>
        {modalKey && (
          <OpenModalButton
            startContent={<Icon name="icon-plus" className="text-regular-xl" />}
            classNames={{
              root: "sm:w-full px-3 py-2.5 sm:py-3 mt-2 sm-gradient",
              label: "text-medium-sm sm:text-semibold-sm ",
            }}
            modalKey={modalKey}
            variant="tetiary"
          >
            {buttonLabel}
          </OpenModalButton>
        )}
      </div>
    </section>
  )
}

export default EmptyState
