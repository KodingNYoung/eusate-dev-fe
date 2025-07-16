"use client"

import { PopupKeys } from "@/utils/enums"
import { useModal } from "@/hooks/popupHooks"
import { ChangeEvent, useState } from "react"
import Input from "@/components/molecules/Inputs"
import Button from "@/components/molecules/Buttons"
import CompletedModal from "../../_components/CompletedModal"
import { useSettings } from "@/providers/settingsProvider"

const Feedback = () => {
  const { open } = useModal()
  const { getFeedback, updateFeedback } = useSettings()
  const [feedback, setFeedback] = useState<string | null>(getFeedback)

  const onSendFeedback = () => {
    if (!feedback) return
    updateFeedback(feedback)
    open(PopupKeys.SENT_FEEDBACK)
  }
  return (
    <section className="px-12 py-8 border-1 border-gray-50 rounded-x20 w-full h-full">
      <div className="w-1/2 grid gap-8 ">
        <Input
          rows={5}
          multiline
          value={feedback ?? ""}
          name="opening_remark"
          label="Give sate AI a feedback"
          helperText="This will help improve sate AI"
          placeholder="Type an answer to the question above..."
          classNames={{
            label: "mb-4 text-gray-700",
            helperText: "text-regular-sm",
          }}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFeedback(e.target.value)
          }
        />
        <Button
          size="sm"
          onClick={onSendFeedback}
          className="px-8 h-14 w-full max-w-48"
        >
          Send feedback
        </Button>
      </div>
      <CompletedModal
        btnLabel="Ok got it"
        header="Feedback sent"
        id={PopupKeys.SENT_FEEDBACK}
        description="We have received your feeback. Thanks you for helping us make sate Ai better"
      />
    </section>
  )
}

export default Feedback
