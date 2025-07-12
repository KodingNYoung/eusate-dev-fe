"use client"

import {
  sendInvite,
  updateMemberPermissions,
} from "@/app/(organisation-routes)/(dashboard)/settings/organisation/actions"
import HelperText from "@/components/atoms/HelperText"
import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import Checkbox from "@/components/molecules/Checkbox"
import Input from "@/components/molecules/Inputs"
import {
  useAllPermissions,
  useUserPermissionsById,
} from "@/hooks/api/organisationHooks"
import { useFormToast, useValidation } from "@/hooks/formHooks"
import { useModal } from "@/hooks/popupHooks"
import { inviteMemberSchema, manageUserSchema } from "@/lib/schemas/settings"
import { QUERY_FN_KEYS } from "@/utils/constants"
import { PopupKeys } from "@/utils/enums"
import { FC, OrganisationUser } from "@/utils/types"
import { useQueryClient } from "@tanstack/react-query"
import React, { useEffect, useMemo, useRef } from "react"
import { useFormState } from "react-dom"

type Props = {
  member?: OrganisationUser
  isInvite: boolean
}

const InviteMemberForm: FC<Props> = ({ isInvite, member }) => {
  const formRef = useRef<HTMLFormElement>(null)
  const queryClient = useQueryClient()

  const { close, open } = useModal()
  const { data, isLoading } = useAllPermissions()
  const { data: userPermissionData, isLoading: loadingUserPermission } =
    useUserPermissionsById(member?.id)

  const { errors, hasErrors, markFieldTouched } = useValidation(
    isInvite ? inviteMemberSchema : manageUserSchema,
    formRef
  )

  const [state, action] = useFormState(
    isInvite ? sendInvite : updateMemberPermissions,
    {}
  )

  useFormToast(state, !isInvite)

  const usePermission = useMemo(() => {
    if (!userPermissionData) return new Set() as Set<string>
    return userPermissionData?.reduce(
      (cumm, curr) => cumm.add(curr.id),
      new Set() as Set<string>
    )
  }, [userPermissionData])

  useEffect(() => {
    if ("success" in state) {
      close()
      if (isInvite) {
        open(PopupKeys.INVITE_SENT_MODAL)
      } else {
        queryClient.invalidateQueries({
          queryKey: [...QUERY_FN_KEYS.PERMISSIONS, member?.id],
        })
      }
    }
  }, [state, isInvite, queryClient, member])

  return (
    <form action={action} ref={formRef}>
      <main className="p-5 grid gap-4 overflow-auto">
        <Input
          name="email"
          label="Email address"
          classNames={{ label: "text-gray-700 mb-2" }}
          placeholder="Enter email address of invitee"
          startComponent={<Icon size={20} name="icon-sms" />}
          isError={!!errors?.email}
          helperText={errors?.email}
          defaultValue={member?.user?.email}
          disabled={!isInvite}
          onChange={(e) => {
            markFieldTouched(e.currentTarget.name)
          }}
        />
        {!isInvite && <input name="id" hidden value={member?.id} readOnly />}
        <section className="grid border border-gray-100 rounded-lg">
          <header className="px-5 py-4 border-b border-b-gray-100 flex items-center justify-between">
            <Typography variant="semibold-sm" className="text-gray-900">
              Permissions
            </Typography>
            {!!errors.permissions && (
              <HelperText isError={!!errors.permissions}>
                {errors.permissions}
              </HelperText>
            )}
          </header>
          <div className="p-4 grid gap-4 max-h-[370px] overflow-auto">
            {(data?.length || isLoading || loadingUserPermission) &&
              (data?.length ? data : new Array(12).fill({})).map(
                (permission, idx) => (
                  <Checkbox
                    key={idx}
                    name="permissions"
                    value={permission.id}
                    classNames={{
                      root: "flex-row-reverse justify-between",
                      label: "!text-regular-sm text-gray-900",
                    }}
                    defaultChecked={usePermission.has(permission.id)}
                    loading={isLoading || loadingUserPermission}
                    disabled={isLoading || loadingUserPermission}
                    onChange={(e) => {
                      markFieldTouched(e.currentTarget.name)
                    }}
                  >
                    {permission.name}
                  </Checkbox>
                )
              )}
          </div>
        </section>
      </main>
      <footer className="w-full border-t border-t-gray-50 p-4">
        <SubmitButton
          size="sm"
          className="px-6 py-5 w-full"
          disabled={hasErrors}
        >
          Send invite
        </SubmitButton>
      </footer>
    </form>
  )
}

export default InviteMemberForm
