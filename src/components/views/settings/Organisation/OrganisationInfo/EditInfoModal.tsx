import { PopupKeys } from "@/utils/enums"
import { useModal } from "@/hooks/popupHooks"
import { ChangeEvent, useEffect, useState } from "react"
import Avatar from "@/components/atoms/Avatar"
// import { onUploadNew } from "../../utils/helpers"
import Input from "@/components/molecules/Inputs"
import Button from "@/components/molecules/Buttons"
import AppModal from "@/components/organisms/Modal"
import userAvatar from "@/assets/images/user-avatar.svg"
import { useSettings } from "@/providers/settingsProvider"
import Select from "@/components/molecules/Select"
import { INDUSTRIES, ORGANISATION_SIZES } from "./utils"
import { FC, OrganisationType } from "@/utils/types"
import UploadButton from "@/components/molecules/Inputs/UploadButton"
import { usePhotoUpload } from "@/hooks/utilityHooks"
import AppSelect from "@/components/molecules/AppSelect"

type Props = {
  organisation: OrganisationType
}

const EditInfoModal: FC<Props> = ({ organisation }) => {
  const { close } = useModal()

  const { getInfo } = useSettings()
  const { avatar } = getInfo

  const [data, setData] = useState({
    logo: "",
    name: "",
    company_size: "",
    industry: "",
  })
  const [src, setSrc] = useState<string | null>(avatar)

  const { isUploading, onPhotoChange } = usePhotoUpload((url) =>
    setData((curr) => ({ ...curr, logo: url }))
  )

  const removeProfile = () => setData((curr) => ({ ...curr, logo: "" }))

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }
  // const onSaveChanges = () => {
  //   const { name, industry } = data
  //   updateOrganisationInfo({
  //     avatar: src,
  //     name,
  //     size,
  //     industry,
  //   })
  //   close()
  // }
  const onDiscardChanges = () => {
    setSrc(avatar)
    // setData(data_)
    close()
  }

  useEffect(() => {
    if (organisation) {
      setData({
        logo: organisation.logo,
        name: organisation.name,
        company_size: organisation.meta.company_size,
        industry: organisation.meta.sector,
      })
    }
  }, [organisation])

  return (
    <AppModal
      size="xl"
      id={PopupKeys.EDIT_ORGANISATION_INFO}
      header={{
        title: "Edit Info",
      }}
      headerStyle={{
        title: "text-regular-lg px-3 py-2",
      }}
    >
      <section className="relative">
        <main className="px-8 pt-4 pb-2 grid gap-6 border-b border-b-gray-50">
          <div className="flex items-center gap-6">
            <Avatar className="w-20 h-20" src={src || userAvatar} />
            <div className="flex gap-4">
              <UploadButton
                id="organisation-logo-upload-btn"
                onChange={onPhotoChange}
                buttonProps={{ loading: isUploading }}
              >
                Upload new
              </UploadButton>
              <Button
                size="sm"
                variant="tetiary"
                className="px-3 py-2"
                onClick={removeProfile}
                disabled={isUploading}
              >
                Remove photo
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <Input
              name="name"
              label="Company name"
              value={data?.name}
              placeholder="Eusate"
              classNames={{
                inputContainer: "!mb-0",
                label: "text-semibold-sm text-gray-700 mb-3",
              }}
              onChange={(e) =>
                setData((curr) => ({
                  ...curr,
                  name: (e.target as HTMLInputElement).value,
                }))
              }
            />
            <AppSelect
              label="Company size"
              name="size"
              placeholder="e.g. 10-15"
              size="lg"
              items={ORGANISATION_SIZES}
              classNames={{ trigger: "rounded-[100px]" }}
            />
            {/* <Select
              name="size"
              label="Company size"
              aria-label="select-size"
              placeholder="e.g. 10-15"
              onChange={onInputChange}
              items={ORGANISATION_SIZES}
              classNames={{ label: "text-gray-700" }}
            /> */}
            <Select
              defaultSelectedKeys={[data?.industry]}
              name="industry"
              items={INDUSTRIES}
              label="Industry sector"
              onChange={onInputChange}
              placeholder="Technology"
              aria-label="select-industry"
              classNames={{ label: "text-gray-700" }}
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
          <Button size="xl" className="px-6 py-5 w-52">
            Save changes
          </Button>
        </footer>
      </section>
    </AppModal>
  )
}

export default EditInfoModal
