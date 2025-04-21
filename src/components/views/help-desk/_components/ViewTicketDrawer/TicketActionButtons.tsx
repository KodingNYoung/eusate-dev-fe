import Button from "@/components/molecules/Buttons"
import { ROUTES } from "@/utils/constants"
import { useRouter } from "next/navigation"
import React, { FC } from "react"

const TicketActionBtns: FC = () => {
  const router = useRouter()

  const viewFullTicketDetails = () => {
    router.push(ROUTES.TICKET + "/TIC-230")
  }

  return (
    <section className="py-5 px-8 border-b border-gray-50 w-full">
      <div className="w-full flex flex-1 justify-between gap-x-8">
        <Button variant="outlined" size="lg" classNames={{ root: "w-[45%]" }}>
          View full details
        </Button>

        <Button
          variant="primary"
          onClick={viewFullTicketDetails}
          size="xl"
          classNames={{ root: "w-[45%] px-3 py-3.5 sm:py-4.5 sm:px-8" }}
        >
          Take over
        </Button>
      </div>
    </section>
  )
}

export default TicketActionBtns
