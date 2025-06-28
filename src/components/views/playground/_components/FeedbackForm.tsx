"use client"
import { FC } from "@/utils/types"
import React, { useEffect, useState } from "react"
import { FEEDBACK_SUGGESTIONS, FeedbackKind } from "../utils"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import Typography from "@/components/atoms/Typography"
import Button from "@/components/molecules/Buttons"
import { useFormState } from "react-dom"
import { sendResponseFeedback } from "@/app/(organisation-routes)/(dashboard)/playground/actions"
import { useFormToast } from "@/hooks/formHooks"
import { useModal } from "@/hooks/popupHooks"
import { usePlayground } from "@/hooks/playground"

type Props = {
  kind: FeedbackKind
}

const FeedbackForm: FC<Props> = ({ kind }) => {
  const liked = kind === FeedbackKind.LIKE

  const { close } = useModal()
  const { selectedResponseId } = usePlayground()
  const [state, action] = useFormState(sendResponseFeedback, {})

  const [feedback, setFeedback] = useState("")

  useFormToast(state)

  useEffect(() => {
    if ("success" in state) {
      close()
    }
  }, [state])

  return (
    <form action={action}>
      <input
        hidden
        type="checkbox"
        readOnly
        name="liked"
        value="true"
        checked={liked}
      />
      <input name="responseId" value={selectedResponseId} hidden readOnly />
      <main className="p-5 grid gap-5">
        <div className="grid gap-8">
          <Typography className="text-bold-xl text-gray-900">
            What led you to give us a thumbs {liked ? "up" : "down"}
          </Typography>
          <div className="flex flex-wrap gap-4 items-center">
            {FEEDBACK_SUGGESTIONS[kind].map((suggestion, idx) => (
              <Button
                variant="tetiary"
                size="sm"
                classNames={{ root: "px-3 py-1.5 rounded-lg" }}
                key={idx}
                onClick={() => setFeedback(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
          <input
            name="feedback"
            className="border border-gray-50 bg-gray-25 rounded-x20 px-6 py-4 outline-none text-medium-lg placeholder:text-gray-300"
            placeholder="Leave additional feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.currentTarget.value)}
          />
        </div>
        <Typography className="text-gray-400 text-medium-xs">
          How can your feedback help improve EusateAI?{" "}
          <span className="underline text-gray-900">Check it out!</span>
        </Typography>
      </main>
      <footer className="flex items-center justify-end p-5 border-t border-gray-50">
        <SubmitButton
          classNames={{ root: "px-3.5 !py-2.5", label: "text-medium-sm" }}
        >
          Send Feedback
        </SubmitButton>
      </footer>
    </form>
  )
}

export default FeedbackForm
