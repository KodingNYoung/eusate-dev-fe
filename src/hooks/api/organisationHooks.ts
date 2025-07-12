"use client"

import { toaster } from "@/components/molecules/Toast"
import {
  getAllPermissions,
  getInvite,
  GetOrganisationUserOptions,
  getOrganisationUsers,
  getOwnedOrganisation,
  getUserPermissionsById,
} from "@/lib/data/organisation"
import { QUERY_FN_KEYS } from "@/utils/constants"
import { useQuery } from "@tanstack/react-query"

export const useOwnedOrganisation = () => {
  const result = useQuery({
    queryKey: QUERY_FN_KEYS.OWNED_ORGANISATION,
    queryFn: async () => await getOwnedOrganisation(),
  })

  if (result.isError) {
    toaster.error(result.error.message)
  }

  return result
}

export const useOrganisationUsers = (options: GetOrganisationUserOptions) => {
  const result = useQuery({
    queryKey: [...QUERY_FN_KEYS.ORGANISATION_USERS, options],
    queryFn: async () => await getOrganisationUsers(options),
  })

  if (result.isError) {
    toaster.error(result.error.message)
  }

  return result
}

export const useAllPermissions = () => {
  const result = useQuery({
    queryKey: QUERY_FN_KEYS.PERMISSIONS,
    queryFn: async () => await getAllPermissions(),
  })

  if (result.isError) {
    toaster.error(result.error.message)
  }

  return result
}

export const useUserPermissionsById = (id?: string) => {
  const result = useQuery({
    queryKey: [...QUERY_FN_KEYS.PERMISSIONS, id],
    queryFn: async () => await getUserPermissionsById(id),
    enabled: !!id,
  })

  if (result.isError) {
    toaster.error(result.error.message)
  }

  return result
}

export const useInvite = (inviteId: string, organisationId: string) => {
  const result = useQuery({
    queryKey: [...QUERY_FN_KEYS.INVITE, organisationId, inviteId],
    queryFn: async () => await getInvite(inviteId, organisationId),
  })

  if (result.isError) {
    toaster.error(result.error.message)
  }

  return result
}
