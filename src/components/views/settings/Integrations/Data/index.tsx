import { IconNames } from "@/utils/iconNames"
import DataCard from "../_components/DataCard"

type DataOption = {
  icon: IconNames
  title: string
  action: () => void
}
const DATE_OPTIONS: DataOption[] = [
  {
    icon: "icon-layer",
    title: "Knowledge base data",
    action: () => {},
  },
  {
    icon: "icon-ticket",
    title: "Tickets conversations",
    action: () => {},
  },
]

const Data = () => {
  return (
    <section className="flex gap-5">
      {DATE_OPTIONS.map((option) => (
        <DataCard key={option.title} {...option} />
      ))}
    </section>
  )
}

export default Data
