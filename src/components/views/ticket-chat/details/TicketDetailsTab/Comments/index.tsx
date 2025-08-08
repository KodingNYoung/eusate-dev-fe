import CommentCard from "./CommentCard"
import NoContentFound from "../../../_components/NoContentFound"
import React, { FC } from "react"
import { useTicketComments } from "@/hooks/api/helpdeskHooks"
import CommentFooter from "./CommentFooter"

type Props = {
  ticketId: string
}

const Comments: FC<Props> = ({ ticketId }) => {
  const { data } = useTicketComments(ticketId)

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 px-5">
        {data?.length ? (
          data.map((comment) => (
            <CommentCard comment={comment} key={comment.id} />
          ))
        ) : (
          <NoContentFound msg="No Comment Found" />
        )}
      </div>
      <CommentFooter ticketId={ticketId} />
    </div>
  )
}

export default Comments
