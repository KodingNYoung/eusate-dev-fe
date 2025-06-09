"use client"

import Form from "./_components/Form"
import Icon from "@/components/atoms/Icon"
import Button from "@/components/molecules/Buttons"
import PriorityItem from "./_components/PriorityItem"
import Typography from "@/components/atoms/Typography"
import { PriorityLevelType, PriorityType } from "../utils"
import { useSettings } from "@/providers/settingsProvider"
import { useCallback, useEffect, useMemo, useState } from "react"

export type FormState = Omit<PriorityType, "id">
const InitialFormState = {
  level: "" as PriorityLevelType,
  area: "",
}

const Priorities = () => {
  const { getPriorities, updatePriority } = useSettings()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [addNewPriority, setAddNewPriority] = useState<boolean>(false)
  const [data, setData] = useState<PriorityType[]>(getPriorities || [])
  const [formState, setFormState] = useState<FormState>(InitialFormState)

  useEffect(() => updatePriority([...data]), [data])

  const isEditing = useMemo(() => !!editingId, [editingId])
  const onAdd = useCallback(() => {
    if (!formState.area.length || !formState.level.length) return
    if (isEditing) {
      setData((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, ...formState } : item
        )
      )
      setEditingId(null)
      setFormState(InitialFormState)
    } else {
      const newData = { id: crypto.randomUUID(), ...formState }
      setData((prev) => [...prev, newData])
      setFormState(InitialFormState)
      setAddNewPriority(false)
    }
  }, [formState, setEditingId, isEditing, editingId])

  const onDelete = useCallback(
    (id: string) => setData((prev) => prev.filter((item) => item.id !== id)),
    []
  )
  const onEdit = useCallback(
    (id: string) => {
      const item = data.find((item) => item.id === id)
      if (item) {
        setEditingId(id)
        setFormState({ ...item })
      }
    },
    [data]
  )
  const renderForm = useCallback(
    () => (
      <Form
        isEditing={isEditing}
        formState={formState}
        setFormState={setFormState}
        onAddPriority={onAdd}
      />
    ),
    [formState, setFormState, onAdd, isEditing]
  )

  return (
    <section className="px-12 py-8 border-1 border-gray-50 rounded-x20 w-full h-full">
      {!isEditing && !data.length && (
        <div className="w-1/2 border-1 border-gray-50 rounded-x20">
          <header className="px-6 py-4 border-b border-b-gray-50">
            <Typography variant="semibold-lg" className="text-black" as="h3">
              Create a new priority
            </Typography>
          </header>
          {renderForm()}
        </div>
      )}
      {data.length ? (
        <div className="w-2/5 grid gap-8">
          <div className="w-full grid gap-4">
            {data.map(({ id, area, level }) =>
              editingId === id ? (
                renderForm()
              ) : (
                <PriorityItem
                  key={id}
                  area={area}
                  level={level}
                  onDeletePriority={() => onDelete(id)}
                  onEditPriority={() => onEdit(id)}
                />
              )
            )}
          </div>
          {!isEditing && addNewPriority && renderForm()}
          {!isEditing && (
            <Button
              size="sm"
              variant="tetiary"
              className="w-full h-10"
              onClick={() => setAddNewPriority((prev) => !prev)}
              startContent={
                !addNewPriority ? (
                  <Icon size={20} name="icon-plus" />
                ) : (
                  <Icon size={20} name="icon-minus-circle" />
                )
              }
            >
              {!addNewPriority ? "Add new priority" : "Remove new priority"}
            </Button>
          )}
        </div>
      ) : null}
    </section>
  )
}

export default Priorities
