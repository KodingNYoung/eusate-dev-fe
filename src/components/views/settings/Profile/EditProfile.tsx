import { PopupKeys } from "@/utils/enums"
import { useModal } from "@/hooks/popupHooks"
import { ChangeEvent, useState } from "react"
import { onUploadNew } from "../utils/helpers"
import Avatar from "@/components/atoms/Avatar"
import Input from "@/components/molecules/Inputs"
import AppModal from "@/components/organisms/Modal"
import Button from "@/components/molecules/Buttons"
import userAvatar from "@/assets/images/user-avatar.svg"
import { useSettings } from "@/providers/settingsProvider"

const EditProfile = () => {
  const {
    profile: { src: src_, fullname },
    updateProfileItem,
  } = useSettings()
  const { close } = useModal()
  const [src, setSrc] = useState<string | null>(src_)
  const [input, setInput] = useState<string>(fullname)

  const onSaveChanges = () => {
    updateProfileItem({ src, fullname: input })
    close()
  }
  const onDiscardChanges = () => {
    setSrc(src_)
    setInput(fullname)
    close()
  }
  return (
    <AppModal
      size="xl"
      id={PopupKeys.EDIT_PROFILE}
      header={{ title: "Edit Profile" }}
      classNames={{ header: "items-end" }}
      headerStyle={{ title: "text-regular-lg px-3 py-2" }}
    >
      <main className="px-8 pt-4 pb-2 grid gap-6 border-b border-b-gray-50">
        <div className="flex items-center gap-6">
          <Avatar className="w-20 h-20" src={src || userAvatar} />
          <div className="flex gap-4">
            <Button
              variant="tetiary"
              className="px-3 py-2"
              onClick={() => onUploadNew(setSrc)}
              classNames={{ label: "text-medium-sm text-gray-600" }}
            >
              Upload new
            </Button>
            <Button
              onClick={() => setSrc(null)}
              variant="tetiary"
              className="px-3 py-2"
              classNames={{ label: "text-medium-sm text-gray-600" }}
            >
              Remove photo
            </Button>
          </div>
        </div>

        <div className="grid gap-2">
          <Input
            value={input}
            name="fullname"
            label="Enter Full Name"
            placeholder="Full Name"
            classNames={{
              label: "text-semibold-sm text-gray-700 mb-3",
            }}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInput(e.target.value)
            }
          />
        </div>
      </main>

      <footer className="flex justify-around items-center pt-2 pb-5">
        <Button
          size="xl"
          variant="tetiary"
          className="px-6 py-5 w-52"
          onClick={onDiscardChanges}
        >
          Discard changes
        </Button>
        <Button onClick={onSaveChanges} size="xl" className="px-6 py-5 w-52">
          Save changes
        </Button>
      </footer>
    </AppModal>
  )
}

export { EditProfile as default }
