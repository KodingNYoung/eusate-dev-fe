import React, { FC } from "react"
import { TEMPERAMENT_COLOR_MAP } from "../../help-desk/utils"
import Icon from "@/components/atoms/Icon"
import Userinfo from "@/components/molecules/Userinfo"
import Badge from "@/components/atoms/Badge"
import { TicketCustomer } from "@/utils/types"
import { useRouter } from "next/navigation"

type Props = {
  customer: TicketCustomer
}

const CustomerChatHeader: FC<Props> = ({ customer }) => {
  const { back } = useRouter()
  return (
    <div className="sticky top-0 left-0 flex z-1 bg-white items-center justify-between w-full px-4 sm:px-6 py sm:py-2 border-gray-50 border-b min-h-[68px]">
      <div className="flex items-center gap-6 my-3 sm:my-0">
        <button onClick={back}>
          <Icon
            name="icon-arrow-left"
            className="hidden md:block !text-regular-base sm:!text-regular-xl text-gray-400 cursor-pointer"
          />
        </button>
        <Userinfo
          title={customer.id}
          subtitle={
            customer.current_temperament ? (
              <Badge
                size="sm"
                type="outline"
                color={TEMPERAMENT_COLOR_MAP[customer.current_temperament]}
                className="capitalize"
              >
                {customer.current_temperament}
              </Badge>
            ) : null
          }
          classNames={{
            root: "!py-0",
            avatar: "border-0",
            title: "!text-semibold-sm text-gray-900",
          }}
        />
      </div>
    </div>
  )
}

export default CustomerChatHeader
