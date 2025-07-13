import Avatar from "@/components/atoms/Avatar"
import Typography from "@/components/atoms/Typography"
import { FC, MemberInviteType } from "@/utils/types"
import organisationAvatar from "@/assets/images/organisation-avatar.svg"
import React, { useEffect } from "react"
import { Skeleton } from "@nextui-org/react"
import dayjs from "dayjs"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import { useFormState } from "react-dom"
import {
  acceptInvite,
  rejectInvite,
} from "@/app/(organisation-routes)/(dashboard)/settings/organisation/actions"
import { useFormToast } from "@/hooks/formHooks"
import { useAuth } from "@/providers/authProvider"
import { useRouter } from "next/navigation"

type Props = {
  invite?: MemberInviteType
  isLoading: boolean
}

const InviteCard: FC<Props> = ({ invite, isLoading }) => {
  const { logout, isAuthenticated } = useAuth()
  const router = useRouter()

  const [acceptState, acceptAction] = useFormState(acceptInvite, {})
  const [rejectState, rejectAction] = useFormState(rejectInvite, {})

  useFormToast(acceptState, true)
  useFormToast(rejectState)

  useEffect(() => {
    if ("success" in acceptState) {
      if (isAuthenticated) {
        logout()
      } else {
        router.replace(acceptState.redirectTo || "")
      }
    }
  }, [acceptState, logout, isAuthenticated, router])

  const form = new FormData()
  form.append("organisation_id", invite?.organisation?.id || "")
  form.append("invite_id", invite?.id || "")

  return (
    <div className="p-8 sm:p-12 flex flex-col gap-4 sm:gap-6">
      <Avatar
        size="h-12 w-12"
        src={invite?.organisation?.logo || organisationAvatar}
        classNames={{ root: "rounded-lg" }}
        loading={isLoading}
      />
      <Typography
        as="h2"
        className="text-semibold-lg text-black"
        loading={isLoading}
      >
        Join {invite?.organisation?.name}&apos;s Workspace!
      </Typography>
      <Typography
        loading={isLoading}
        as="p"
        className="text-regular-base text-gray-400 min-w-full"
      >
        {invite?.inviter_name} from {invite?.organisation?.name} has invited you
        to join their team workspace. Click on the button below to accept or
        decline this invitation.
      </Typography>
      {"success" in rejectState ? (
        <Typography as="span" className="text-semibold-sm text-gray-500">
          The sender will get notified that you have declined this invitation
        </Typography>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-2">
            <form action={rejectAction.bind(null, form)}>
              <Skeleton isLoaded={!isLoading} className="rounded-[90px]">
                <SubmitButton
                  classNames={{
                    root: "!py-3.5 w-full",
                    label: "text-semibold-sm",
                  }}
                  variant="error"
                >
                  Decline
                </SubmitButton>
              </Skeleton>
            </form>
            <form action={acceptAction.bind(null, form)}>
              <Skeleton isLoaded={!isLoading} className="rounded-[90px]">
                <SubmitButton
                  classNames={{
                    root: "!py-3.5 w-full",
                    label: "text-semibold-sm",
                  }}
                  variant="success"
                >
                  Accept
                </SubmitButton>
              </Skeleton>
            </form>
          </div>
          <div className="border-t border-gray-50 pt-4 sm:pt-6 flex items-center justify-center">
            <Typography
              as="span"
              className="text-warning-600 bg-warning-50 px-1.5 py-1 rounded text-medium-sm w-fit text-center"
              loading={isLoading}
            >
              <b>NOTE:</b> This invitation expires on{" "}
              {dayjs(invite?.date_created)
                .add(7, "day")
                .format("dddd (DD MMM, YYYY) [at] hh:mmA")}
            </Typography>
          </div>
        </>
      )}
    </div>
  )
}

export default InviteCard
