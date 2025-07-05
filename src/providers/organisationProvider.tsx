"use client"

import { FC, OrganisationType, UserPermission } from "@/utils/types"
import { useQueryClient } from "@tanstack/react-query"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { useAuth } from "./authProvider"
import {
  getCurrentOrganisation,
  getOrganisationUserPermissions,
} from "@/lib/data/organisation"
import {
  updateCurrentOrganisation,
  updateCurrentOrganisationInSession,
} from "@/app/(organisation-routes)/actions"
import { getUserProfile } from "@/lib/data/settings"
import { toaster } from "@/components/molecules/Toast"
import Spinner from "@/components/atoms/Spinner"
import Typography from "@/components/atoms/Typography"

type OrganisationContextType = {
  currentOrganisation: OrganisationType | null
  organisations: OrganisationType[]
  permissions: UserPermission[]
  isLoading: boolean
  isSwitching: boolean
  switchOrganisation: (organisationId: string) => Promise<void>
  refreshOrganisations: () => Promise<void>
  setCurrentOrganisation: (organisation: OrganisationType) => void
}

const OrganisationContext = createContext<OrganisationContextType | null>({
  currentOrganisation: null,
  organisations: [],
  permissions: [],
  isLoading: false,
  isSwitching: false,
  refreshOrganisations: async () => {},
  switchOrganisation: async () => {},
  setCurrentOrganisation: () => {},
})

export const OrganisationProvider: FC = ({ children }) => {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  const [currentOrganisation, setCurrentOrganisation] =
    useState<OrganisationType | null>(null)
  const [permissions, setPermissions] = useState<UserPermission[]>([])
  const [organisations, setOrganisations] = useState<OrganisationType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSwitching, setIsSwitching] = useState<boolean>(false)

  const initializeOrganization = async () => {
    try {
      // set loading to true,
      setIsLoading(true)

      // get the last current organisation from the BE
      const currentOrgContext = await getCurrentOrganisation()

      if (!currentOrgContext) throw new Error("No current organisation found")

      // update the current organisation id in session
      await updateCurrentOrganisationInSession(
        currentOrgContext.organisation.id
      )

      // and set the current organisation state
      setCurrentOrganisation(currentOrgContext.organisation)

      // get other organisations and permissions from the BE
      const [userProfile, permissions] = await Promise.all([
        getUserProfile(),
        getOrganisationUserPermissions(),
      ])

      setOrganisations(userProfile.organisations)
      setPermissions(permissions)
    } catch (err) {
      console.log("error fetching organisations", err)
      // show error toast
      toaster.error(
        "Failed to load organisation details and permissions, please contact the engineers"
      )
    } finally {
      // set loading to false
      setIsLoading(false)
    }
  }

  const switchOrganisation = useCallback(
    async (organisationId: string) => {
      // check for racing condition
      if (!organisationId || isSwitching) return

      try {
        // set switching to true
        setIsSwitching(true)
        // use the organisationId to find the organisation from the organisations
        const newOrg = organisations.find(
          (organisation) => organisation.id === organisationId
        )
        if (!newOrg) throw new Error("Organisation not found")
        // update the BE and session
        await Promise.all([
          updateCurrentOrganisation(newOrg.id),
          updateCurrentOrganisationInSession(newOrg?.id),
        ])
        // fetch new organisation permission
        const permissions = await getOrganisationUserPermissions()
        // update the FE state with permission and currentOrganisation
        setCurrentOrganisation(newOrg)
        setPermissions(permissions)
        // clear react query store
        queryClient.clear()
        // show toast
        toaster.success(`Switch organisation to ${newOrg.name}`)
      } catch (err) {
        console.log("error fetching organisations", err)
        // show error toast
        toaster.error("Failed to switch organisation")
      } finally {
        setIsSwitching(false)
      }
    },
    [isSwitching, organisations, queryClient]
  )

  const refreshOrganisations = useCallback(async () => {
    try {
      const userProfile = await getUserProfile()
      setOrganisations(userProfile.organisations)
    } catch (error) {
      console.error("Failed to refresh organisations:", error)
      toaster.error("Failed to refresh organisations")
    }
  }, [])

  useEffect(() => {
    if (!user) return
    initializeOrganization()
  }, [user])

  return (
    <OrganisationContext.Provider
      value={{
        currentOrganisation,
        organisations,
        permissions,
        isLoading,
        isSwitching,
        switchOrganisation,
        refreshOrganisations,
        setCurrentOrganisation,
      }}
    >
      {isLoading ? (
        <div className="fixed left-0 top-0 z-[1000001] w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-70">
          <Spinner />
          <Typography as="h2" className="text-semibold-xl">
            Loading organisation context
          </Typography>
          <Typography>
            I know this doesn&apos;t make sense, meet patrick to give me a
            better ux.
          </Typography>
        </div>
      ) : isSwitching ? (
        <div className="fixed left-0 top-0 z-[1000001] w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-40">
          <Spinner />
          <Typography as="h2" className="text-semibold-xl">
            Switching organisation context.
          </Typography>
          <Typography>
            I know this doesn&apos;t make sense, meet patrick to give me a
            better ux.
          </Typography>
        </div>
      ) : null}
      {children}
    </OrganisationContext.Provider>
  )
}

export const useOrganisation = () => {
  const context = useContext(OrganisationContext)
  if (!context)
    throw new Error("useOrganisation must be used inside OrganisationProvider")
  return context
}
