import CommentCard from "./CommentCard"
import NoContentFound from "../../../_components/NoContentFound"
import React, { FC } from "react"
import { useTicketComments } from "@/hooks/api/helpdeskHooks"
import CommentFooter from "./CommentFooter"

type Props = {
  ticketId: string
}

// import { MockComments } from "../../mockData"; !if you want to test with mock data

// const scrollToBottom = (element: HTMLElement) => {
//   element.scrollTo({
//     top: element.scrollHeight,
//     behavior: "smooth",
//   })
// }

const Comments: FC<Props> = ({ ticketId }) => {
  // const formRef = useRef<HTMLFormElement>(null)

  const { data } = useTicketComments(ticketId)

  return (
    <div className="w-full h-full py-5 px-6">
      <div className="flex flex-col border border-gray-50 h-full rounded-x20">
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
    </div>
  )
}

export default Comments
