"use client"

import Typography from "@/components/atoms/Typography"
import { useOrganisation } from "@/providers/organisationProvider"
import React, { useMemo } from "react"
import OrganisationCard from "./OrganisationCard"
import Icon from "@/components/atoms/Icon"
import Link from "next/link"
import { ROUTES } from "@/utils/constants"

const OrganisationSwitcher = () => {
  const { currentOrganisation, organisations, isLoading } = useOrganisation()

  const otherWorkspaces = useMemo(() => {
    if (!currentOrganisation) return organisations
    return organisations.filter((org) => org.id !== currentOrganisation.id)
  }, [currentOrganisation, organisations])
  return (
    !isLoading && (
      <>
        <div className="flex flex-col gap-3">
          <Typography as="h3" className="text-semibold-sm text-black">
            Currently signed into
          </Typography>
          <div className="border border-gray-50 bg-gray-25 p-0.5  rounded-lg">
            {currentOrganisation && (
              <OrganisationCard organisation={currentOrganisation} isCurrent />
            )}
            <div className="flex">
              <button className="flex items-center justify-center gap-2 flex-1 text-gray-300 text-medium-xs p-2.5 border-r border-gray-50">
                <Icon name="icon-user-circle-add" size={18} />
                Invite
              </button>
              <Link
                href={ROUTES.SETTINGS}
                className="flex-1 flex items-center justify-center gap-2 text-gray-300 text-medium-xs p-2.5"
              >
                <Icon name="icon-setting-2" size={18} />
                Settings
              </Link>
            </div>
          </div>
        </div>
        {!!(otherWorkspaces && otherWorkspaces?.length) && (
          <div className="flex flex-col gap-3">
            <Typography as="h3" className="text-semibold-sm text-black">
              Other workspaces
            </Typography>
            {organisations.map((organisation) => (
              <OrganisationCard
                organisation={organisation}
                key={organisation.id}
              />
            ))}
          </div>
        )}
      </>
    )
  )
}

export default OrganisationSwitcher
