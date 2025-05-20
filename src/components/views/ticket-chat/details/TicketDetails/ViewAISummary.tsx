import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import Button from "@/components/molecules/Buttons"
import { AnimatePresence, motion } from "framer-motion"
import React, { useState } from "react"

const ViewAISummary = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <section className="w-full flex flex-col mt-5 relative">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: "tween" }}
            style={{ originY: "100%" }}
            className="absolute bg-brand-gradient p-px rounded-lg bottom-full mb-3"
          >
            <div
              className="fixed top-0 left-0 h-full w-full z-[12]"
              onClick={() => setIsExpanded(false)}
            />
            <div className="relative bg-gold-50 w-full p-3 rounded-lg flex flex-col gap-3 z-[12]">
              <header className="flex justify-between items-center gap-2.5">
                <Icon
                  name="icon-ai-magic"
                  className="text-gradient"
                  size={16}
                />
                <Typography className="text-medium-sm text-gradient">
                  AI ticket summary
                </Typography>
                <div className="flex-1" />
                <button
                  className="text-gray-500 leading-none"
                  onClick={() => setIsExpanded(false)}
                >
                  <Icon name="icon-close" size={20} />
                </button>
              </header>
              <Typography as="p" className="text-gray-700 text-regular-sm">
                The user reported an issue with the application crashing during
                startup. After troubleshooting, it was determined that the
                problem was caused by a recent update that conflicted with
                existing settings. A patch has been deployed to resolve the
                issue, and users are advised to restart the application.
              </Typography>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Button
        variant="tetiary"
        startContent={<Icon name="icon-quill-pen" size={20} />}
        classNames={{
          root: "p-2.5 w-full text-gray-600 aria-expanded:scale-[0.97] aria-expanded:opacity-70 subpixel-antialiased",
        }}
        size="sm"
        aria-expanded={isExpanded}
        onClick={() => setIsExpanded((curr) => !curr)}
      >
        View AI summary
      </Button>
    </section>
  )
}

export default ViewAISummary
