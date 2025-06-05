"use client"

import React from "react"
import Image from "next/image"
import { cls } from "@/utils/helpers"
import { PopupKeys } from "@/utils/enums"
import { useModal } from "@/hooks/popupHooks"
import { FC, TWClassNames } from "@/utils/types"
import Button from "@/components/molecules/Buttons"
import AppModal from "@/components/organisms/Modal"
import check from "@/assets/images/completed-check.svg"
import Typography from "@/components/atoms/Typography"

type Slots = "root" | "header" | "description" | "btn"
type Props = {
  id: PopupKeys
  header: string
  description: string
  btnLabel: string
  redirect?: () => void
  classNames?: { [slot in Slots]: TWClassNames }
}

const CompletedModal: FC<Props> = ({
  id,
  header,
  description,
  btnLabel,
  redirect,
  classNames,
}) => {
  const { close } = useModal()
  return (
    <AppModal id={id} size="lg" hideCloseButton className="px-4 py-8">
      <main
        className={cls(
          "mx-auto w-full max-w-[544px] px-4 py-8 flex flex-col items-center gap-10",
          classNames?.root
        )}
      >
        <Image
          src={check}
          height={120}
          width={120}
          alt="completed checl icon"
        />
        <header className="text-center w-3/4">
          <Typography
            as="h2"
            className={cls(
              "text-bold-2xl sm:text-bold-4xl mb-3",
              classNames?.header
            )}
          >
            {header}
          </Typography>
          <Typography
            as="span"
            variant="regular-sm"
            className={cls("text-gray-500", classNames?.description)}
          >
            {description}
          </Typography>
        </header>
        <Button
          className={cls("w-full py-4.5", classNames?.btn)}
          onClick={() => (redirect ? redirect() : close())}
        >
          {btnLabel}
        </Button>
      </main>
    </AppModal>
  )
}

export default CompletedModal
