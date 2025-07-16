"use client"

import TableTop from "./_components/TableTop"
import { useQueryParams } from "@/hooks/utilityHooks"
import { formatSortBy } from "./utils"
import Table from "@/components/organisms/Table"
import Userinfo from "@/components/molecules/Userinfo"
import { ORGANISATION_QUERY_KEYS } from "../utils"
import { useOrganisationUsers } from "@/hooks/api/organisationHooks"
import { OrganisationUser, TableColumn } from "@/utils/types"
import dayjs from "dayjs"
import MemberRowAction from "./_components/MemberRowAction"
import { Skeleton } from "@nextui-org/react"
import InviteMemberModal from "./_components/InviteMemberModal"
import CompletedModal from "../_components/CompletedModal"
import { PopupKeys } from "@/utils/enums"
import { useState } from "react"
import { useModal } from "@/hooks/popupHooks"
import RemoveAgentModal from "./_components/RemoveAgentModal"

const Members = () => {
  const { get } = useQueryParams()
  const { open } = useModal()

  const [member, setMember] = useState<OrganisationUser>()

  const { data, isLoading } = useOrganisationUsers({
    sort_by: formatSortBy(get(ORGANISATION_QUERY_KEYS.SORT_BY) || undefined),
    search: get(ORGANISATION_QUERY_KEYS.SEARCH) || undefined,
  })

  const openModal = (id: PopupKeys, member: OrganisationUser) => {
    open(id)
    setMember(member)
  }

  const columns: TableColumn<OrganisationUser>[] = [
    {
      id: 0,
      title: "Member name",
      classNames: {
        td: "w-[37%]",
      },
      render: (row, loading) => (
        <Userinfo
          src={row?.user?.profile_picture}
          title={row?.user?.username}
          subtitle={row?.user?.email}
          classNames={{
            subtitle: "sm:hidden",
            title: "w-[unset] min-w-36",
          }}
          loading={loading}
        />
      ),
    },
    {
      id: 1,
      title: "Email",
      classNames: {
        td: "w-[31%]",
      },
      showFor: "not-mobile",
      render: (row, loading) => (
        <Skeleton isLoaded={!loading} className="rounded-sm">
          <span className="min-w-36 h-4 block">{row?.user?.email}</span>
        </Skeleton>
      ),
    },
    {
      id: 2,
      title: "Role",
      classNames: {
        td: "w-[12%]",
      },
      render: (row, loading) => (
        <Skeleton isLoaded={!loading} className="rounded-sm">
          <span className="w-12">{row?.owner ? "Owner" : "Agent"}</span>
        </Skeleton>
      ),
    },
    {
      id: 3,
      title: "Date Added",
      classNames: {
        td: "w-[19%]",
      },
      render: (row, loading) => (
        <div className="flex flex-col gap-px">
          <Skeleton isLoaded={!loading}>
            <span className="text-gray-900 block min-w-40 h-4">
              {dayjs(row?.date_created).format("DD MMM, YYYY. hh:mmA")}
            </span>
          </Skeleton>
        </div>
      ),
    },
    {
      id: 4,
      title: "Action",
      classNames: {
        cell: "w-[1%] whitespace-nowrap bg-white sticky right-0 z-[11]",
      },
      clickable: true,
      align: "center",
      render: (row, loading) => (
        <Skeleton isLoaded={!loading} className="rounded-full">
          <MemberRowAction
            row={row}
            onManage={() => openModal(PopupKeys.MANAGE_ACCESS_MODAL, row)}
            onDelete={() => openModal(PopupKeys.REMOVE_AGENT_MODAL, row)}
          />
        </Skeleton>
      ),
    },
  ]

  return (
    <section className="flex flex-col w-full border rounded-x20 border-gray-100 p-10 gap-4">
      <TableTop />
      <Table
        columns={columns}
        data={data?.results || []}
        classNames={{ td: "!py-0", thead: "!table-header-group" }}
        loading={isLoading}
        defaultRows={3}
      />
      <InviteMemberModal />
      <InviteMemberModal
        modalId={PopupKeys.MANAGE_ACCESS_MODAL}
        member={member}
      />
      <RemoveAgentModal memberId={member?.id || ""} />
      <CompletedModal
        id={PopupKeys.INVITE_SENT_MODAL}
        header="Invite sent"
        btnLabel="Okay, got it"
        description="An invitation has been sent to the new member! You'll be notified as soon as they join."
      />
    </section>
  )
}

export default Members
