import Button from "@/components/molecules/Buttons"
import AutoResizingTextarea from "@/components/molecules/Inputs/AutoResizingTextarea"
import { FC } from "@/utils/types"
import React from "react"

type Props = {
  msgHistoryCode: string
  msg: string
  closeEdit: () => void
  formAction: (formdata: FormData) => void | Promise<void>
}

const EditMsgForm: FC<Props> = ({
  msg,
  msgHistoryCode,
  closeEdit,
  formAction,
}) => {
  return (
    <form className="grid gap-3 border border-gray-900 max-w-full w-[492px] rounded-x20 py-3 px-6">
      <input
        type="hidden"
        name="msgHistoryCode"
        value={msgHistoryCode}
        readOnly
      />
      <AutoResizingTextarea
        defaultValue={msg}
        classNames={{ inputWrapper: "min-h-6" }}
        name="msg"
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
        <Button
          onClick={(e) => {
            const form = new FormData(e.currentTarget.form as HTMLFormElement)
            formAction(form)
          }}
          classNames={{ root: "!py-1 px-3" }}
          size="mini"
        >
          Save
        </Button>
      </footer>
    </form>
  )
}

export default EditMsgForm
