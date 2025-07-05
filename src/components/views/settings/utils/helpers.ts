import { ItemType } from "@/components/molecules/Popups/AppDropdown"
import { promptFileUpload } from "@/utils/helpers"

// TODO: remove this function after cleanup
export const handleFileUpload = async () => {
  const files = await promptFileUpload(".png, .jpg, .jpeg, .webp")
  if (files) {
    const file = files[0]
    const fileSrc = URL.createObjectURL(file)
    return [file, fileSrc] as const
  }
}

export const findLabel = <K>(items: ItemType[], selectedKey: K) => {
  return items.find((item) => item.key === selectedKey)?.label
}

export const findKey = (items: ItemType[], label: string) => {
  return items.find((item) => item.label === label)?.key
}
