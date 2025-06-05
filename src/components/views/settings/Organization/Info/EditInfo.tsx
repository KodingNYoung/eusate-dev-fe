import { PopupKeys } from "@/utils/enums"
import { useModal } from "@/hooks/popupHooks"
import { ChangeEvent, useState } from "react"
import Avatar from "@/components/atoms/Avatar"
import { onUploadNew } from "../../utils/helpers"
import Input from "@/components/molecules/Inputs"
import Button from "@/components/molecules/Buttons"
import AppModal from "@/components/organisms/Modal"
import userAvatar from "@/assets/images/user-avatar.svg"
import { useSettings } from "@/providers/settingsProvider"
import Select from "@/components/molecules/Select"
import { INDUSTRIES, ORGANIZATION_SIZES } from "./utils"

const EditInfo = () => {
  const {
    organization: { info },
    updateOrganizationInfo,
  } = useSettings()
  const { close } = useModal()
  const { img_url: src_, name: name_, size: size_, industry: industry_ } = info
  const [src, setSrc] = useState<string | null>(src_)
  const [name, setName] = useState<string>(name_)
  const [size, setSize] = useState<string | undefined>(size_)
  const [industry, setIndustry] = useState<string | undefined>(industry_)

  const onSaveChanges = () => {
    updateOrganizationInfo({ img_url: src, name, size, industry })
    close()
  }
  const onDiscardChanges = () => {
    setSrc(src_)
    setSize(size_)
    setIndustry(industry_)
    close()
  }
  return (
    <AppModal
      size="xl"
      id={PopupKeys.EDIT_ORGANIZATION_INFO}
      classNames={{ header: "items-end" }}
      header={{
        title: "Edit Profile",
      }}
      headerStyle={{
        title: "text-regular-lg px-3 py-2",
      }}
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

        <div className="flex flex-col gap-2">
          <Input
            value={name}
            name="name"
            label="Name"
            placeholder="Eusate"
            classNames={{
              label: "text-semibold-sm text-gray-700 mb-3",
            }}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          <Select
            value={size}
            name="size"
            label="Size"
            placeholder="e.g. 10-15"
            defaultSelectedKeys={[size || "default"]}
            items={ORGANIZATION_SIZES}
            classNames={{
              item: "text-semibold-sm text-gray-700 mb-3",
            }}
            onSelectionChange={({ currentKey }) => setSize(currentKey)}
          />
          <Select
            value={industry}
            name="industry"
            label="Industry sector"
            defaultSelectedKeys={[industry || "default"]}
            placeholder="Technology"
            items={INDUSTRIES}
            classNames={{
              item: "text-semibold-sm text-gray-700 mb-3",
            }}
            onSelectionChange={({ currentKey }) => setIndustry(currentKey)}
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

export { EditInfo as default }
