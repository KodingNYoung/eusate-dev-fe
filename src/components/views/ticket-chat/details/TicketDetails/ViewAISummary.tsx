import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import AppPopover from "@/components/molecules/Popups/AppPopover"
import React, { useState } from "react"

const ViewAISummary = () => {
  const [, setOpen] = useState<boolean>(true)

  return (
    <section className="w-full flex mt-5">
      <AppPopover
        placement="top"
        offset={10}
        onClose={() => setOpen(false)}
        trigger={
          <div className="w-full flex cursor-pointer items-center justify-center gap-x-4 rounded-full border border-gray-100 py-2 ">
            <Icon name="icon-quill-pen" className="text-regular-sm" />
            <Typography>View AI summary</Typography>
          </div>
        }
        className="relative w-full"
        classNames={{
          content:
            "p-0.25 w-[90%] sm:w-[425px] mx-2 items-start bg-brand-gradient ",
        }}
      >
        <div className="relative bg-gold-50 w-full p-3 rounded-lg  space-y-4">
          <header className="flex justify-between items-center">
            <div className="flex items-center gap-x-2">
              <Icon name="icon-ai-magic" className="text-gradient" />
              <Typography className="text-medium-sm text-gradient">
                AI ticket summary
              </Typography>
            </div>
            <Icon
              onClick={() => setOpen(false)}
              name="icon-close"
              className="text-regular-xl cursor-pointer"
            />
          </header>
          <div className="text-gray-700">
            The user reported an issue with the application crashing during
            startup. After troubleshooting, it was determined that the problem
            was caused by a recent update that conflicted with existing
            settings. A patch has been deployed to resolve the issue, and users
            are advised to restart the application.
          </div>
        </div>
      </AppPopover>
    </section>
  )
}

export default ViewAISummary
