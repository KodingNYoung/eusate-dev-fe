import { Item } from "@/components/molecules/Select"
import { promptFileUpload } from "@/utils/helpers"

export const onUploadNew = async (
  setSrc: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const files = await promptFileUpload(".png, .jpg, .jpeg, .webp")
  if (files) {
    const file = files[0]
    const convertToSrc = URL.createObjectURL(file)
    setSrc(convertToSrc)
  }
}

export const findLabel = <K>(items: Item[], selectedKey: K) => {
  return items.find((item) => item.key === selectedKey)?.label
}

export const findKey = (items: Item[], label: string) => {
  return items.find((item) => item.label === label)?.key
}
