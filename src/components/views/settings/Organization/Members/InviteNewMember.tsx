import { PopupKeys } from "@/utils/enums"
import Icon from "@/components/atoms/Icon"
import { FormEvent, useState } from "react"
import { useModal } from "@/hooks/popupHooks"
import Input from "@/components/molecules/Inputs"
import Button from "@/components/molecules/Buttons"
import AppModal from "@/components/organisms/Modal"
import Checkbox from "@/components/molecules/Checkbox"
import Typography from "@/components/atoms/Typography"
import { formatPermissionKey, Permission } from "./utils"

const InitialPermission: Permission = {
  reset_user_passwords: true,
  read_access_to_documents: true,
  create_new_user_profiles: true,
  import_user_profile_data: true,
  export_user_profiles_data: true,
  edit_access_to_user_profiles: true,
  view_access_to_user_profiles: true,
  delete_access_to_user_profiles: true,
  admin_rights_for_project_management: true,
  write_permissions_for_shared_folders: true,
  view_only_access_to_financial_reports: true,
}

const InviteNewMember = () => {
  const { open } = useModal()
  const [permissions, setPermissions] = useState<Permission>(InitialPermission)

  const onCheckBoxChange = (e: FormEvent<HTMLInputElement>) => {
    const { checked, name } = e.currentTarget
    setPermissions({ ...permissions, [name]: checked })
  }
  const onSendInvite = () => {
    setPermissions(InitialPermission)
    open(PopupKeys.COMPLETED_INVITE_MEMBER)
  }
  return (
    <AppModal
      size="lg"
      id={PopupKeys.INVITE_MEMBER}
      header={{ title: "Invite new member" }}
      headerStyle={{ title: "text-regular-lg" }}
    >
      <main className="px-5 py-5 pt-5 pb-0 grid gap-4 overflow-auto">
        <Input
          name="email"
          label="Email address"
          classNames={{ label: "text-gray-700" }}
          placeholder="Enter email address of invitee"
          startComponent={<Icon size={20} name="icon-sms" />}
        />
        <section className="grid border-1 border-gray-50 rounded-lg">
          <div className="px-5 py-4 border-b border-b-gray-50">
            <Typography variant="semibold-sm" className="text-gray-900">
              Permissions
            </Typography>
          </div>
          <div className="p-4 grid gap-4">
            {Object.entries(permissions).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <Typography variant="regular-sm">
                  {formatPermissionKey(key)}
                </Typography>
                <Checkbox
                  name={key}
                  checked={value}
                  onChange={onCheckBoxChange}
                />
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="w-full border-t border-t-gray-50 p-4">
        <Button size="sm" className="px-6 py-5 w-full" onClick={onSendInvite}>
          Send invite
        </Button>
      </footer>
    </AppModal>
  )
}

export default InviteNewMember
