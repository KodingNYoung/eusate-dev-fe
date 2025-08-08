import { ItemType } from "@/components/molecules/Popups/AppDropdown"

export const findLabel = <K>(items: ItemType[], selectedKey: K) => {
  return items.find((item) => item.key === selectedKey)?.label
}

export const findKey = (items: ItemType[], label: string) => {
  return items.find((item) => item.label === label)?.key
}
