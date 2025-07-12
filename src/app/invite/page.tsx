import Invite from "@/components/views/invite"
import { PageFC } from "@/utils/types"
import React from "react"

type ParamsProps = {
  invite_id: string
  organisation_id: string
}

const InvitePage: PageFC<unknown, ParamsProps> = ({ searchParams }) => {
  const inviteId = searchParams?.invite_id
  const organisationId = searchParams?.organisation_id

  return inviteId && organisationId ? (
    <Invite inviteId={inviteId} organisationId={organisationId} />
  ) : (
    <>No invite or organisation</>
  )
}

export default InvitePage
