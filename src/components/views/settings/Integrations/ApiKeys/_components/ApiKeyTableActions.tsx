"use client"

import { ApiKeysType, FC } from "@/utils/types"
import React from "react"
import Button from "@/components/molecules/Buttons"
import Icon from "@/components/atoms/Icon"
import { ApiKeyStatus } from "../../../utils"

type Props = {
  row: ApiKeysType
  onDelete: () => void
  onRevoke: () => void
}

const ApiKeyTableActions: FC<Props> = ({ row, onDelete, onRevoke }) => {
  return row.status === ApiKeyStatus.ACTIVE ? (
    <Button
      variant="tetiary"
      startContent={<Icon name="icon-close" size={16} />}
      classNames={{ root: "px-3 py-1" }}
      onClick={onRevoke}
    >
      Revoke
    </Button>
  ) : (
    <Button
      variant="error"
      startContent={<Icon name="icon-trash" size={16} />}
      classNames={{ root: "px-3 py-1" }}
      onClick={onDelete}
    >
      Delete
    </Button>
  )
}

export default ApiKeyTableActions
