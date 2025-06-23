import Typography from "@/components/atoms/Typography"
import { Switch } from "@nextui-org/react"
import { FC } from "react"

type Props = {
  title: string
  isChecked: boolean
  action: () => void
}
const Notification: FC<Props> = ({ title, isChecked, action }) => {
  return (
    <section className="flex items-center gap-6">
      <Typography variant="semibold-lg" className="text-black">
        {title}
      </Typography>
      <Switch
        size="sm"
        color="warning"
        onValueChange={action}
        defaultSelected={isChecked}
        classNames={{
          wrapper: "group-data-[selected=true]:bg-gold-500",
        }}
      />
    </section>
  )
}

export default Notification
