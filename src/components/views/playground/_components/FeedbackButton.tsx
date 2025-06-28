import { sendResponseFeedback } from "@/app/(organisation-routes)/(dashboard)/playground/actions"
import Icon from "@/components/atoms/Icon"
import Button from "@/components/molecules/Buttons"
import { useFormToast } from "@/hooks/formHooks"
import { usePlayground } from "@/hooks/playground"
import { useModal } from "@/hooks/popupHooks"
import { PopupKeys } from "@/utils/enums"
import { FC, SateMessage } from "@/utils/types"
import React, { useEffect } from "react"
import { useFormState } from "react-dom"
import { FeedbackKind, getFeedbackIcon, getFeedbackIconColor } from "../utils"

type Props = {
  response: SateMessage
  historyCode: string
  userMessageId: string
  loading?: boolean
  kind: FeedbackKind
}

const FeedbackButton: FC<Props> = ({
  response,
  loading,
  historyCode,
  userMessageId,
  kind,
}) => {
  const { open, close } = useModal(PopupKeys.PLAYGROUND_LIKE_MODAL)
  const { likeOrDislikeResponse } = usePlayground()
  const [state, action] = useFormState(sendResponseFeedback, {})

  useFormToast(state)

  useEffect(() => {
    if ("error" in state) {
      close() // this  will close the feedback modal since the  like request isn't successful
    }
  }, [state])

  return (
    <form
      action={action}
      onSubmit={() => {
        likeOrDislikeResponse(true, historyCode, userMessageId, response.id)
        open()
      }}
    >
      <input
        hidden
        type="checkbox"
        readOnly
        name="liked"
        value="true"
        checked={kind === FeedbackKind.LIKE}
      />
      <input name="responseId" value={response.id} hidden readOnly />
      <Button
        type="submit"
        variant="tetiaryText"
        size="mini"
        classNames={{
          root: "!border-0 focus:border-0",
          label: "!leading-none",
        }}
        disabled={loading}
      >
        <Icon
          name={getFeedbackIcon(kind, response.liked)}
          size={20}
          className={getFeedbackIconColor(kind, response.liked)}
        />
      </Button>
    </form>
  )
}

export default FeedbackButton
