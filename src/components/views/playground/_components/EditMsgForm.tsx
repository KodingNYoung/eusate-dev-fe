import Button from "@/components/molecules/Buttons"
import AutoResizingTextarea from "@/components/molecules/Inputs/AutoResizingTextarea"
import { usePlayground } from "@/hooks/playground"
import { EditMessageReturnType } from "@/providers/playgroundProvider"
import { FC } from "@/utils/types"
import React from "react"

type Props = {
  msgHistoryCode: string
  msg: string
  closeEdit: () => void
  formAction: (formdata: FormData) => void | Promise<void>
  setIds: (ids: EditMessageReturnType) => void
}

const EditMsgForm: FC<Props> = ({
  msg,
  msgHistoryCode,
  formAction,
  closeEdit,
  setIds,
}) => {
  const { editMessage } = usePlayground()
  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        const message = new FormData(e.currentTarget).get("message") as string
        const ids = editMessage(message, msgHistoryCode)
        setIds(ids)
        closeEdit()
      }}
      className="grid gap-3 border border-gray-900 max-w-full w-[492px] rounded-x20 py-3 px-6"
    >
      <AutoResizingTextarea
        defaultValue={msg}
        classNames={{ inputWrapper: "min-h-6" }}
        name="message"
      />
      <footer className="flex items-center justify-end gap-2 relative z-1">
        <Button
          onClick={closeEdit}
          classNames={{ root: "py-0.5 px-3" }}
          size="mini"
          variant="outlined"
        >
          Cancel
        </Button>
        <Button type="submit" classNames={{ root: "!py-1 px-3" }} size="mini">
          Save
        </Button>
      </footer>
    </form>
  )
}

export default EditMsgForm
