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
import { toaster } from "@/components/molecules/Toast"
import Typography from "@/components/atoms/Typography"
import { LoaderIcon } from "@/assets/images/svg"
import { useUserProfile } from "@/hooks/api/settingsHooks"
import { QUERY_FN_KEYS } from "@/utils/constants"

type OrganisationContextType = {
  currentOrganisation: OrganisationType | null
  organisations: OrganisationType[]
  permissions: UserPermission[]
  isLoading: boolean
  isSwitching: boolean
  switchOrganisation: (organisationId: string) => Promise<void>
  refreshOrganisations: () => Promise<void>
  setCurrentOrganisation: (organisation: OrganisationType) => void
  organisationUserId: string
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
  organisationUserId: "",
})

export const OrganisationProvider: FC = ({ children }) => {
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const {
    data: userProfile,
    isLoading: loadingOrganisations,
    refetch,
  } = useUserProfile()

  const [currentOrganisation, setCurrentOrganisation] =
    useState<OrganisationType | null>(null)
  const [currentOrganisationUserId, setCurrentOrganisationUserId] = useState("")
  const [permissions, setPermissions] = useState<UserPermission[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSwitching, setIsSwitching] = useState<boolean>(false)

  const initializeOrganization = async () => {
    if (!user) return
    try {
      // set loading to true,
      setIsLoading(true)

      // get the last current organisation from the BE
      const currentOrgContext = await queryClient.fetchQuery({
        queryKey: [...QUERY_FN_KEYS.ORGANISATION, "context"],
        queryFn: async () => await getCurrentOrganisation(),
      })

      if (!currentOrgContext) throw new Error("No current organisation found")

      // and set the current organisation state
      setCurrentOrganisation(currentOrgContext.organisation)

      // set the organisation user id
      setCurrentOrganisationUserId(currentOrgContext.organisation_user)
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
        const newOrg = userProfile?.organisations?.find(
          (organisation) => organisation.id === organisationId
        )
        if (!newOrg) throw new Error("Organisation not found")
        // update the BE and session
        const currentOrganisationContext = await updateCurrentOrganisation(
          newOrg.id
        )

        // if it wasn't a success
        if (!("success" in currentOrganisationContext)) {
          if ("error" in currentOrganisationContext) {
            toaster.error(currentOrganisationContext.error.message)
          }
          return
        }
        // update the FE state with currentOrganisation
        setCurrentOrganisation(newOrg)
        setCurrentOrganisationUserId(
          currentOrganisationContext?.payload?.organisation_user || ""
        )
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
    [isSwitching, userProfile?.organisations, queryClient]
  )

  const handleOrganisationContextChange = useCallback(
    async (currentOrganisation: OrganisationType) => {
      // TODO: fetch plans

      // update the current organisation id in the session
      await updateCurrentOrganisationInSession(currentOrganisation.id)
      // fetch new organisation permission
      const permissions = await queryClient.fetchQuery({
        queryKey: [...QUERY_FN_KEYS.ORGANISATION, "permissions"],
        queryFn: async () => await getOrganisationUserPermissions(),
      })

      setPermissions(permissions)
    },
    [currentOrganisation, queryClient]
  )

  useEffect(() => {
    initializeOrganization()
  }, [])
  useEffect(() => {
    if (!currentOrganisation) return
    handleOrganisationContextChange(currentOrganisation)
  }, [currentOrganisation])

  return (
    <OrganisationContext.Provider
      value={{
        currentOrganisation,
        organisationUserId: currentOrganisationUserId,
        organisations: userProfile?.organisations || [],
        permissions,
        isLoading: isLoading || loadingOrganisations,
        isSwitching,
        switchOrganisation,
        refreshOrganisations: async () => {
          refetch()
        },
        setCurrentOrganisation,
      }}
    >
      {isSwitching && (
        <div className="fixed left-0 top-0 z-[1000001] w-full h-full flex flex-col justify-center items-center gap-4 bg-white backdrop-blur-large  bg-opacity-50">
          <div className="size-24 min-w-24 min-h-24 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
            <span className="block animate-spin">{LoaderIcon}</span>
          </div>
          <Typography as="span" className="text-semibold-xl text-gray-600">
            Loading content, please wait...
          </Typography>
        </div>
      )}
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
