import Avatar from "@/components/atoms/Avatar"
import { FC, OrganisationType } from "@/utils/types"
import React, { useCallback, useEffect, useState } from "react"
import defaultLogo from "@/assets/images/organisation-avatar.svg"
import UploadButton from "@/components/molecules/Inputs/UploadButton"
import { usePhotoUpload } from "@/hooks/utilityHooks"
import Button from "@/components/molecules/Buttons"
import Input from "@/components/molecules/Inputs"
import AppSelect from "@/components/molecules/AppSelect"
import AppAutocomplete from "@/components/molecules/AppAutocomplete"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import { useFormState } from "react-dom"
import { updateOrganisation } from "@/app/(organisation-routes)/(dashboard)/settings/actions"
import { useModal } from "@/hooks/popupHooks"
import { PopupKeys } from "@/utils/enums"
import { useFormToast } from "@/hooks/formHooks"
import { INDUSTRIES, ORGANISATION_SIZES } from "@/utils/dummy"
import { ACCEPTABLE_IMAGE_TYPES } from "@/utils/constants"

type Props = {
  organisation: OrganisationType | null
  onUpdate: (organisation: OrganisationType) => void
}

const EditInfoForm: FC<Props> = ({ organisation, onUpdate }) => {
  const { close, isOpen } = useModal(PopupKeys.EDIT_ORGANISATION_INFO)

  const [data, setData] = useState({
    logo: "",
    name: "",
    company_size: "",
    sector: "",
  })

  const { isUploading, onPhotoChange } = usePhotoUpload((url) =>
    setData((curr) => ({ ...curr, logo: url }))
  )

  const [state, action] = useFormState(updateOrganisation, {})

  useFormToast(state, true)

  const removeProfile = () => {
    setData((curr) => ({ ...curr, logo: "" }))
  }

  const restoreOrganizationValues = useCallback(() => {
    if (!organisation) return
    setData({
      logo: organisation?.logo || "",
      name: organisation?.name || "",
      company_size: organisation?.meta?.company_size || "",
      sector: organisation?.meta?.sector || "",
    })
  }, [organisation])

  useEffect(() => {
    if (isOpen) {
      restoreOrganizationValues()
    }
  }, [isOpen, organisation])
  useEffect(() => {
    if ("success" in state) {
      close()
      console.log(state)
      onUpdate(state.payload as OrganisationType)
    }
  }, [state, close])

  return (
    <form action={action}>
      <main className="px-8 py-5 grid gap-6 border-b border-b-gray-50">
        <div className="flex items-center gap-6">
          <Avatar className="w-20 h-20" src={data.logo || defaultLogo} />
          <input hidden readOnly value={data?.logo} name="logo" />
          <div className="flex gap-4">
            <UploadButton
              id="organisation-logo-upload-btn"
              onChange={onPhotoChange}
              buttonProps={{ loading: isUploading }}
              accept={ACCEPTABLE_IMAGE_TYPES.join(", ")}
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
            placeholder="Company name"
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
            name="company_size"
            selectedKeys={[data.company_size]}
            placeholder="Select a company size"
            size="lg"
            items={ORGANISATION_SIZES}
            classNames={{ trigger: "rounded-[100px]" }}
            onChange={(e) =>
              setData((curr) => ({ ...curr, company_size: e.target.value }))
            }
          />
          <AppAutocomplete
            label="Industry sector"
            name="sector"
            aira-label="select-sector"
            inputValue={data.sector}
            placeholder="Technology"
            size="lg"
            items={INDUSTRIES}
            onInputChange={(value) =>
              setData((curr) => ({ ...curr, sector: value }))
            }
            inputProps={{
              classNames: {
                inputWrapper: "rounded-[100px] min-h-14",
                input: "text-[14px]",
              },
            }}
          />
        </div>
      </main>

      <footer className="grid grid-cols-2 gap-5 py-5 px-8">
        <Button
          size="xl"
          variant="tetiary"
          className="py-5 w-full"
          onClick={restoreOrganizationValues}
          disabled={isUploading}
        >
          Discard changes
        </Button>
        <SubmitButton size="xl" className="py-5 w-full" disabled={isUploading}>
          Save changes
        </SubmitButton>
      </footer>
    </form>
  )
}

export default EditInfoForm
