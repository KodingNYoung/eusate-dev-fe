import { Activity, Comment } from "../../utils"
import Typography from "@/components/atoms/Typography"
import Button from "@/components/molecules/Buttons"
import CommentCard from "../../_components/CommentCard"
import NoContentFound from "../../_components/NoContentFound"
import React, { FC, useEffect, useRef, useState } from "react"
import { useTicketChatDetails } from "@/providers/ticketChatProvider"

// import { MockComments } from "../../mockData"; !if you want to test with mock data

const scrollToBottom = (element: HTMLElement) => {
  element.scrollTo({
    top: element.scrollHeight,
    behavior: "smooth",
  })
}

const Comments = () => {
  const formRef = useRef<HTMLFormElement>(null)

  const { comments, setComments, updateActivities } = useTicketChatDetails()
  const [input, setInput] = useState<string>("")
  const [newCommentNumber, setNewCommentNumber] = useState<number | null>(2)

  useEffect(() => {
    setComments([...comments])
  }, [])

  const handleScrollToBottom = () => {
    if (formRef.current) {
      scrollToBottom(formRef.current)
    }
  }

  const AddComment = () => {
    const createdComment: Comment = {
      avatarUrl:
        "https://images.pexels.com/photos/2100697/pexels-photo-2100697.jpeg",
      name: "Calum Wilson",
      createdAt: new Date(),
      comment: input,
    }
    const createCommentActivity: Activity = {
      avatarUrl:
        "https://images.pexels.com/photos/2100697/pexels-photo-2100697.jpeg",
      name: "Calum Wilson",
      activityType: "comment",
      comment: input,
      createdAt: new Date(),
    }
    setComments([...comments, createdComment])
    updateActivities(createCommentActivity)
    setNewCommentNumber(null)
    handleScrollToBottom()
    setInput("")
  }

  return (
    <div className="py-4 w-full ">
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault()
          AddComment()
        }}
        className="custom-scrollbar px-6 relative grid grid-rows-[1fr_auto] h-[15.5rem] overflow-y-auto"
      >
        {comments?.length ? (
          <div className="border w-full flex-grow-1 border-gray-50 grid gap-y-8 p-4 rounded-t-xl">
            {comments.map((comment, idx) => (
              <div key={idx} className="relative w-full">
                <div className="flex justify-center">
                  {newCommentNumber &&
                    idx === comments.length - newCommentNumber && (
                      <NewMessage number={newCommentNumber} />
                    )}
                </div>
                <CommentCard comment={comment} />
              </div>
            ))}
          </div>
        ) : (
          <NoContentFound msg="No Comment Found" />
        )}
        <div className="flex w-full bg-white gap-x-4 justify-between sticky bottom-0 items-center px-4 py-2 border border-gray-50 rounded-b-xl">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.currentTarget.value && !e.shiftKey) {
                e.preventDefault()
                AddComment()
              }
            }}
            className="w-full !border-none !outline-none !ring-0 !focus:ring-0 !focus:outline-none"
            name="comment"
            placeholder="Type your comment"
          />
          <Button
            onClick={AddComment}
            size="sm"
            classNames={{ root: "px-5 py-2" }}
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Comments

const NewMessage: FC<{ number: number }> = ({ number }) => {
  return (
    <div className="absolute -top-10 border border-gold-600 bg-gold-50 rounded-full py-0.5 px-2">
      <Typography as="p" className="text-gold-600 text-medium-xs">
        {number} New Messages
      </Typography>
    </div>
  )
}
