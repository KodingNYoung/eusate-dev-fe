"use client"

import React from "react"
import { cls } from "@/utils/helpers"
import { PopupKeys } from "@/utils/enums"
import { useModal } from "@/hooks/popupHooks"
import { FC, TWClassNames } from "@/utils/types"
import Button from "@/components/molecules/Buttons"
import AppModal from "@/components/organisms/Modal"
import Typography from "@/components/atoms/Typography"
import Icon from "@/components/atoms/Icon"

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
  btnLabel,
  redirect,
  classNames,
  description,
}) => {
  const { close } = useModal()
  return (
    <AppModal id={id} size="lg" hideCloseButton className="px-4 py-7">
      <main
        className={cls(
          "mx-auto w-full max-w-[544px] px-4 py-8 flex flex-col items-center gap-10",
          classNames?.root
        )}
      >
        <div className="size-[120px] min-w-[120px] min-h-[120px] bg-[#FBF7E6] flex items-center justify-center rounded-full">
          <div className="size-20 min-w-20 min-h-20 flex items-center justify-center bg-[#F3E5B2] rounded-[inherit]">
            <Icon
              name="icon-tick-circle-bold"
              size={40}
              className="text-gradient"
            />
          </div>
        </div>
        <header className="text-center max-w-[370px]">
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
