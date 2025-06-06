"use client"

import { Remark } from "../utils"
import { ChangeEvent, useState } from "react"
import Input from "@/components/molecules/Inputs"
import Button from "@/components/molecules/Buttons"
import { useSettings } from "@/providers/settingsProvider"

const Remarks = () => {
  const { getRemarks, updateRemarks } = useSettings()
  const [remarks, setRemarks] = useState<Remark>(getRemarks())
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRemarks({ ...remarks, [name]: value })
  }
  const onSaveChanges = () => updateRemarks(remarks)
  const onDiscardChanges = () => setRemarks(getRemarks())
  return (
    <section className="px-12 py-8 border-1 border-gray-50 rounded-x20 w-full h-full">
      <div className="w-full md:w-1/2 grid gap-8">
        <div className="w-full grid gap-8">
          <Input
            multiline
            rows={5}
            name="opening_remark"
            label="Opening remark"
            value={remarks?.opening_remark ?? ""}
            classNames={{
              label: "mb-4 text-gray-700",
              helperText: "text-regular-sm",
            }}
            onChange={onInputChange}
            helperText="This is the default first message that our AI sends to every of your customer"
            placeholder="Type an answer to the question above..."
          />
          <Input
            multiline
            rows={5}
            name="closing_remark"
            label="Closing remark"
            value={remarks?.closing_remark ?? ""}
            onChange={onInputChange}
            classNames={{
              label: "mb-4 text-gray-700",
              helperText: "text-regular-sm",
            }}
            helperText="This is the default last message that our AI sends to every of your customer"
            placeholder="Type an answer to the question above..."
          />
        </div>
        {(remarks?.closing_remark || remarks?.opening_remark) && (
          <div className="flex item-center gap-8 w-full md:w-1/2">
            <Button
              size="sm"
              variant="tetiary"
              onClick={onDiscardChanges}
              className="w-full px-8 h-14 min-w-48"
            >
              Discard changes
            </Button>
            <Button
              onClick={onSaveChanges}
              size="sm"
              className="w-full px-8 h-14 min-w-48"
            >
              Save changes
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Remarks
