"use client"

import Userinfo from "@/components/molecules/Userinfo"
import { FC, OrganisationType } from "@/utils/types"
import React from "react"
import organisationAvatar from "@/assets/images/organisation-avatar.svg"
import Badge from "@/components/atoms/Badge"
import Button from "@/components/molecules/Buttons"
import { useOrganisation } from "@/providers/organisationProvider"

type Props = {
  organisation: OrganisationType
  isCurrent?: boolean
}

const OrganisationCard: FC<Props> = ({ organisation, isCurrent }) => {
  const { switchOrganisation } = useOrganisation()

  return (
    <div className="bg-white border border-gray-50 rounded-md px-2 py-2.5 flex items-center">
      <Userinfo
        src={organisation?.logo || organisationAvatar}
        title={organisation?.name}
        subtitle={
          <Badge type="accent" color="info" size="sm">
            Basic
          </Badge>
        }
        classNames={{
          root: "!py-0 flex-1",
          avatar: "!rounded",
          info: "gap-0.5",
          title: "text-gray-700",
        }}
      />
      {!isCurrent && (
        <Button
          variant="tetiary"
          classNames={{ root: "py-1 px-3.5", label: "text-medium-xs" }}
          onClick={() => switchOrganisation(organisation.id)}
        >
          Switch to
        </Button>
      )}
    </div>
  )
}

export default OrganisationCard
