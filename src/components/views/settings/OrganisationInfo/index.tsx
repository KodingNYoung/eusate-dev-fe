"use client"

import { PopupKeys } from "@/utils/enums"
import { useModal } from "@/hooks/popupHooks"
import UserAvatar from "../_components/UserAvatar"
import Typography from "@/components/atoms/Typography"
import { useOrganisation } from "@/providers/organisationProvider"
import organisationAvatar from "@/assets/images/organisation-avatar.svg"
import EditInfoModal from "./EditInfoModal"

const OrganisationInfo = () => {
  const { open } = useModal()
  const { currentOrganisation, isLoading } = useOrganisation()
  return (
    <>
      <section className="flex flex-col w-full border rounded-x20 border-gray-100 p-8 gap-10">
        <header>
          <UserAvatar
            src={currentOrganisation?.logo || organisationAvatar}
            fullname={currentOrganisation?.name || ""}
            email={currentOrganisation?.owner?.email || ""}
            editLabel="Edit details"
            editAction={() => open(PopupKeys.EDIT_ORGANISATION_INFO)}
            loading={isLoading}
          />
        </header>

        <main className="flex justify-between max-w-full w-[400px]">
          <div className="grid gap-y-4 w-full">
            <div className="grid grid-cols-[1fr_200px] w-full">
              <Typography variant="regular-base" className="text-gray-400">
                Company name
              </Typography>
              <Typography
                variant="semibold-base"
                className="text-gray-900 text-left"
                loading={isLoading}
              >
                {currentOrganisation?.name}
              </Typography>
            </div>
            <div className="grid grid-cols-[1fr_200px] w-full">
              <Typography variant="regular-base" className="text-gray-400">
                Industry
              </Typography>
              <Typography
                variant="semibold-base"
                className="text-gray-900"
                loading={isLoading}
              >
                {currentOrganisation?.meta?.sector}
              </Typography>
            </div>
            <div className="grid grid-cols-[1fr_200px] w-full">
              <Typography variant="regular-base" className="text-gray-400">
                Size
              </Typography>
              <Typography variant="semibold-base" className="text-gray-900">
                {currentOrganisation?.meta.company_size}
              </Typography>
            </div>
          </div>
        </main>
      </section>
      <EditInfoModal />
    </>
  )
}

export default OrganisationInfo
