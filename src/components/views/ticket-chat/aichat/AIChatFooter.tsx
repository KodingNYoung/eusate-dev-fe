import Icon from "@/components/atoms/Icon"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
// import { useSateChat } from "@/providers/ticketChatProvider"
import React, { FC } from "react"

type Props = {
  scrollToBottom: () => void
}

const ChatFooter: FC<Props> = ({ scrollToBottom }) => {
  // const { message, setMessage, submitMessage } = useSateChat()

  return (
    <div className="sticky bottom-0 border-t border-t-gray-50 px-6 py-4">
      <form
        className="flex w-full"
        onSubmit={(e) => {
          e.preventDefault()
          // submitMessage("support", { hasAttachment: false, files: [] })
          // setMessage("")
          scrollToBottom()
        }}
      >
        <input
          // value={message}
          // onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="w-full focus:outline-0 text-regular"
        />
        <SubmitButton
          size="sm"
          classNames={{
            label:
              "!leading-none visible group-data-[loading=true]/button:invisible group-data-[loading=true]/button:absolute",
            root: "size-5 sm:size-10 !py-0",
          }}
        >
          <Icon name="icon-send-2-bold" size={20} />
        </SubmitButton>
      </form>
    </div>
  )
}

export default ChatFooter
