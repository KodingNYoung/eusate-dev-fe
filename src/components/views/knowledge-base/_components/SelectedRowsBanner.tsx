import { FC, KnowledgeSource } from "@/utils/types"
import React, { FormEvent, useRef } from "react"
import * as motion from "motion/react-client"
import { AnimatePresence } from "motion/react"
import Typography from "@/components/atoms/Typography"
import Button from "@/components/molecules/Buttons"
import Checkbox from "@/components/molecules/Checkbox"
import { useIsMobile } from "@/hooks/breakpointHooks"
import { bulkToggleSourcePrivacy } from "@/app/(dashboard)/knowledge-base/actions"
import BulkTogglePublishedModal from "./BulkTogglePublishedModal"
import { useModal } from "@/hooks/popupHooks"
import { PopupKeys } from "@/utils/enums"
import BulkDeleteSourceModal from "./BulkDeleteSourceModal"
import { toaster } from "@/components/molecules/Toast"

type Props = {
  rows: KnowledgeSource[]
}

const SelectedRowsBanner: FC<Props> = ({ rows }) => {
  const ref = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const { open } = useModal()

  const internalOnlySources = rows.filter((source) => !source.external)

  const onPrivacyToggle = async (e: FormEvent<HTMLInputElement>) => {
    const response = await bulkToggleSourcePrivacy(
      rows,
      !e.currentTarget.checked
    )

    if ("success" in response) {
      toaster.success(response.success.message)
    } else if ("error" in response) {
      toaster.error(response.error.message)
    }
  }

  return (
    <>
      <AnimatePresence>
        {rows.length ? (
          <motion.section
            key="row-banner"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: isMobile ? 94 : 43 }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div
              className="flex flex-wrap items-center border border-gray-50 sm:bg-gray-50 rounded-lg p-3 sm:px-4 sm:py-2 gap-4"
              ref={ref}
            >
              <Typography className="text-medium-xs sm:text-medium-base text-gray-900 bg-gray-50 sm:bg-transparent px-2 py-1 sm:py-0 rounded-md">
                {rows.length} Items selected
              </Typography>
              <Checkbox
                name="privacy"
                value="internal"
                checked={!!internalOnlySources.length}
                indeterminate={internalOnlySources.length !== rows.length}
                onChange={onPrivacyToggle}
                classNames={{
                  root: "flex-row-reverse gap-2",
                  label:
                    "text-medium-sm sm:text-medium-base text-gray-900 sm:!text-gray-500",
                }}
              >
                Internal only
              </Checkbox>
              <div className="flex items-center gap-3">
                <Button
                  classNames={{
                    root: "px-3.5 sm:px-2.5 py-1.5 sm:py-1 h-full",
                    label: "text-medium-xs",
                  }}
                  onClick={() =>
                    open(PopupKeys.BULK_TOGGLE_PUBLISH_SOURCE_MODAL)
                  }
                >
                  {rows.some((row) => row.published) ? "Unpublish" : "Publish"}
                </Button>
                <Button
                  classNames={{
                    root: "px-3.5 sm:px-2.5 py-1.5 sm:py-1 h-full",
                    label: "text-medium-xs",
                  }}
                  variant="error"
                  onClick={() => open(PopupKeys.BULK_DELETE_SOURCE_MODAL)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>
      <BulkTogglePublishedModal sources={rows} />
      <BulkDeleteSourceModal sources={rows} />
    </>
  )
}

export default SelectedRowsBanner
