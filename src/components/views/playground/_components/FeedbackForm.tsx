import { FC } from "@/utils/types"
import React from "react"
import { FEEDBACK_SUGGESTIONS, FeedbackType } from "../utils"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import Typography from "@/components/atoms/Typography"
import Button from "@/components/molecules/Buttons"

type Props = {
  feedbackType: FeedbackType
}

const FeedbackForm: FC<Props> = ({ feedbackType }) => {
  const isLike = feedbackType === FeedbackType.LIKE
  return (
    <form>
      <main className="p-5 grid gap-5">
        <div className="grid gap-8">
          <Typography className="text-bold-xl text-gray-900">
            What led you to give us a thumbs {isLike ? "up" : "down"}
          </Typography>
          <div className="flex flex-wrap gap-4 items-center">
            {FEEDBACK_SUGGESTIONS[feedbackType].map((suggestion, idx) => (
              <Button
                variant="tetiary"
                size="sm"
                classNames={{ root: "px-3 py-1.5 rounded-lg" }}
                key={idx}
              >
                {suggestion}
              </Button>
            ))}
          </div>
          <input
            className="border border-gray-50 bg-gray-25 rounded-x20 px-6 py-4 outline-none text-medium-lg placeholder:text-gray-300"
            placeholder="Leave additional feedback..."
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
