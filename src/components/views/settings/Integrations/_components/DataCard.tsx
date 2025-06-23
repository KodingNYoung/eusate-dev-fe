import { FC } from "@/utils/types"
import Icon from "@/components/atoms/Icon"
import { IconNames } from "@/utils/iconNames"
import Button from "@/components/molecules/Buttons"
import Typography from "@/components/atoms/Typography"

type Props = {
  title: string
  icon: IconNames
  action: () => void
}
const DataCard: FC<Props> = ({ icon, title, action }) => {
  return (
    <section className="border-1 rounded-x20 border-gray-100 w-full py-6 px flex items-center justify-center max-w-[332.67px]">
      <div className="flex flex-col items-center gap-4 w-4/5">
        <Icon name={icon} size={80} className="text-[#858D9D]" />
        <Typography variant="semibold-xl" className="text-black text-center">
          {title}
        </Typography>
        <Typography
          variant="regular-base"
          className="text-gray-500 mx-auto text-center"
        >
          If you need to use information externally on other platforms, please
          export all the data from your knowledge base.
        </Typography>
        <Button size="sm" className="h-12 w-full" onClick={action}>
          Export data
        </Button>
      </div>
    </section>
  )
}

export default DataCard
