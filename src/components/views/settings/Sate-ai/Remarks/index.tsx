"use client"

import { Remark } from "../utils"
import Input from "@/components/molecules/Inputs"
import Button from "@/components/molecules/Buttons"
import { ChangeEvent, useMemo, useState } from "react"
import { useSettings } from "@/providers/settingsProvider"

const Remarks = () => {
  const { getRemarks, updateRemarks } = useSettings()
  const [remarks, setRemarks] = useState<Remark>(getRemarks)

  const isEditing = useMemo(
    () =>
      !!getRemarks.closing_remark.length || !!getRemarks.opening_remark.length,
    [getRemarks]
  )
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRemarks({ ...remarks, [name]: value })
  }
  const onSaveChanges = () => updateRemarks(remarks)
  const onDiscardChanges = () => setRemarks(getRemarks)
  return (
    <section className="px-12 py-8 border-1 border-gray-50 rounded-x20 w-full h-full">
      <div className="w-full md:w-1/2 grid gap-8">
        <div className="w-full grid gap-8">
          <Input
            rows={5}
            multiline
            name="opening_remark"
            label="Opening remark"
            onChange={onInputChange}
            classNames={{
              label: "mb-4 text-gray-700",
              helperText: "text-regular-sm",
            }}
            value={remarks?.opening_remark ?? ""}
            placeholder="Type an answer to the question above..."
            helperText="This is the default first message that our AI sends to every of your customer"
          />
          <Input
            rows={5}
            multiline
            name="closing_remark"
            label="Closing remark"
            onChange={onInputChange}
            classNames={{
              label: "mb-4 text-gray-700",
              helperText: "text-regular-sm",
            }}
            value={remarks?.closing_remark ?? ""}
            placeholder="Type an answer to the question above..."
            helperText="This is the default last message that our AI sends to every of your customer"
          />
        </div>
        {(remarks?.closing_remark || remarks?.opening_remark || isEditing) && (
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
