import Button from "@/components/molecules/Buttons"
import { ROUTES } from "@/utils/constants"
import { Ticket } from "@/utils/types"
import { useRouter } from "next/navigation"
import React, { FC, useCallback } from "react"

type Props = {
  ticket: Ticket
}

const TicketActionBtns: FC<Props> = ({ ticket }) => {
  const router = useRouter()

  const goToChat = useCallback(() => {
    router.push(`${ROUTES.TICKET}/${ticket.id}`)
  }, [ticket])
  const takeOver = useCallback(() => {}, [ticket])

  return (
    <footer className="p-5 border-t border-gray-50 w-full sticky left-0 bottom-0 mt-auto flex items-center justify-center gap-5 bg-white">
      <Button
        variant="tetiary"
        onClick={goToChat}
        size="lg"
        classNames={{ root: "w-[182px] max-w-[45%] py-4.5" }}
      >
        View full details
      </Button>
      <Button
        variant="primary"
        onClick={takeOver}
        size="xl"
        classNames={{ root: "w-[182px] max-w-[45%] py-4.5" }}
      >
        Take over
      </Button>
    </footer>
  )
}

export default TicketActionBtns
