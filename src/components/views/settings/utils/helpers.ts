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
