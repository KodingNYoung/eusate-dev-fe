import { PopupKeys } from "@/utils/enums"
import { useModal } from "@/hooks/popupHooks"
import { ChangeEvent, useState } from "react"
import Avatar from "@/components/atoms/Avatar"
// import { onUploadNew } from "../../utils/helpers"
import Input from "@/components/molecules/Inputs"
import Button from "@/components/molecules/Buttons"
import AppModal from "@/components/organisms/Modal"
import userAvatar from "@/assets/images/user-avatar.svg"
import { useSettings } from "@/providers/settingsProvider"
import Select from "@/components/molecules/Select"
import { INDUSTRIES, ORGANIZATION_SIZES } from "./utils"

type Data = {
  name: string
  size: string
  industry: string
}
const EditInfo = () => {
  const { close } = useModal()
  const { getInfo, updateOrganizationInfo } = useSettings()
  const { avatar, ...data_ } = getInfo
  const [data, setData] = useState<Data>(data_)
  const [src, setSrc] = useState<string | null>(avatar)

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }
  const onSaveChanges = () => {
    const { name, size, industry } = data
    updateOrganizationInfo({
      avatar: src,
      name,
      size,
      industry,
    })
    close()
  }
  const onDiscardChanges = () => {
    setSrc(avatar)
    setData(data_)
    close()
  }
  return (
    <AppModal
      size="xl"
      id={PopupKeys.EDIT_ORGANIZATION_INFO}
      header={{
        title: "Edit Profile",
      }}
      headerStyle={{
        title: "text-regular-lg px-3 py-2",
      }}
    >
      <section>
        <main className="px-8 pt-4 pb-2 grid gap-6 border-b border-b-gray-50">
          <div className="flex items-center gap-6">
            <Avatar className="w-20 h-20" src={src || userAvatar} />
            <div className="flex gap-4">
              <Button
                variant="tetiary"
                className="px-3 py-2"
                // onClick={() => onUploadNew(setSrc)}
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
              name="name"
              label="Name"
              value={data?.name}
              placeholder="Eusate"
              classNames={{
                inputContainer: "!mb-0",
                label: "text-semibold-sm text-gray-700 mb-3",
              }}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e)}
            />
            <Select
              name="size"
              label="Size"
              aria-label="select-size"
              placeholder="e.g. 10-15"
              onChange={onInputChange}
              items={ORGANIZATION_SIZES}
              defaultSelectedKeys={[data?.size]}
            />
            <Select
              defaultSelectedKeys={[data?.industry]}
              name="industry"
              aria-label="select-industry"
              label="Industry sector"
              placeholder="Technology"
              items={INDUSTRIES}
              onChange={onInputChange}
            />
          </div>
        </main>

        <footer className="flex justify-around items-center py-4">
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
      </section>
    </AppModal>
  )
}

export { EditInfo as default }
