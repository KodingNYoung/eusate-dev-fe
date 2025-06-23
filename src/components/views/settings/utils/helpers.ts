import { Item } from "@/components/molecules/Select"
import { promptFileUpload } from "@/utils/helpers"

/**
 * Prompts the user to upload an image file with specified formats.
 * If a file is selected, it converts the file to a URL object and
 * updates the state with this URL.
 *
 * @param setSrc - A state dispatcher function to update the source URL of the uploaded image.
 */
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
