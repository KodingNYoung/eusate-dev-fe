import React from "react"
import { FC } from "@/utils/types"
import Image from "next/image"
import faqEmptyState from "@/assets/images/faq-empty-state.svg"
import Typography from "@/components/atoms/Typography"
import Icon from "@/components/atoms/Icon"
import OpenModalButton from "@/components/molecules/Buttons/OpenModalButton"
import { PopupKeys } from "@/utils/enums"

const EmptyState: FC = () => {
  return (
    <section className="border border-gray-50 sm:border-gray-100 rounded-xl sm:rounded-x20 px-8 py-10 sm:p-10 ">
      <div className="max-w-[352px] w-full text-center flex flex-col items-center justify-center mx-auto">
        <Image
          height={160}
          width={220}
          src={faqEmptyState}
          alt="empty state image"
          className="w-[150px] sm:w-[220px]"
        />
        <div className="text-center my-4 max-w-[90%] grid gap-2 sm:gap-1">
          <Typography className="teext-semibold-sm sm:text-semibold-base text-gray-900">
            Start by uploading FAQ
          </Typography>
          <Typography className="text-regular-sm text-gray-500">
            Any FAQ uploaded will be available here.Manage resources that
            educated your AI.
          </Typography>
        </div>
        <OpenModalButton
          modalKey={PopupKeys.ADD_FAQS_MODAL}
          startContent={<Icon name="icon-plus" className="text-regular-xl" />}
          classNames={{
            root: "sm:w-full px-3 py-2.5 sm:py-3 mt-2 sm-gradient",
            label: "text-medium-sm sm:text-semibold-sm ",
          }}
        >
          Add FAQ
        </OpenModalButton>
      </div>
    </section>
  )
}

export default EmptyState
