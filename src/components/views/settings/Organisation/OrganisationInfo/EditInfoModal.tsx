import { PopupKeys } from "@/utils/enums"
import AppModal from "@/components/organisms/Modal"
import { FC } from "@/utils/types"
import EditInfoForm from "./EditInfoForm"
import { useOrganisation } from "@/providers/organisationProvider"

const EditInfoModal: FC = () => {
  const { currentOrganisation, setCurrentOrganisation } = useOrganisation()
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
      <EditInfoForm
        organisation={currentOrganisation}
        onUpdate={setCurrentOrganisation}
      />
    </AppModal>
  )
}

export default EditInfoModal
