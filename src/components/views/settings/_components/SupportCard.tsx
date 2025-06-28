import { FC } from "@/utils/types"
import Icon from "@/components/atoms/Icon"
import { IconNames } from "@/utils/iconNames"
import Button from "@/components/molecules/Buttons"
import Typography from "@/components/atoms/Typography"
import { cls } from "@/utils/helpers"

type Props = {
  icon: IconNames
  title: string
  description: string
  btnLabel: string
  action?: () => void
}
const SupportCard: FC<Props> = ({
  icon,
  title,
  action,
  btnLabel,
  description,
}) => {
  return (
    <section className="flex justify-center border-1 border-gray-100 rounded-x20 py-6 w-full max-w-[332.67px]">
      <div className="flex flex-col items-center justify-between w-[83%]">
        <Icon
          size={80}
          name={icon}
          className={cls(
            "text-[#858D9D] mb-4",
            icon === "icon-eusate" &&
              "bg-brand-gradient bg-clip-text text-transparent"
          )}
        />
        <div className="grid gap-2">
          <Typography variant="semibold-xl" className="text-black text-center">
            {title}
          </Typography>
          <Typography
            variant="regular-base"
            className="text-gray-500 mx-auto text-center"
          >
            {description}
          </Typography>
          {
            <Button size="sm" className="h-12 w-full mt-2" onClick={action}>
              {btnLabel}
            </Button>
          }
        </div>
      </div>
    </section>
  )
}

export default SupportCard
