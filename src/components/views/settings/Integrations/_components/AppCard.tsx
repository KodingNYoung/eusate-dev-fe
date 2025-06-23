import Image from "next/image"
import { useState } from "react"
import { FC } from "@/utils/types"
import { cls } from "@/utils/helpers"
import Button from "@/components/molecules/Buttons"
import Typography from "@/components/atoms/Typography"

type Props = {
  id: number
  icon: string
  title: string
  isConnected: boolean
  action?: () => void
}

const AppCard: FC<Props> = ({ icon, title, isConnected, action }) => {
  const [ishovered, setIsHovered] = useState<boolean>(false)
  return (
    <section
      className={cls(
        "border-1 rounded-x20 border-gray-100 w-full py-6 ",
        "flex flex-wrap items-center justify-center max-w-[332.67px]"
      )}
    >
      <div className="flex flex-col items-center gap-5 w-4/5">
        <Image
          src={icon}
          width={76}
          height={76}
          alt={title}
          className="w-[76px] h-[76px]"
        />
        <Typography variant="semibold-xl" className="text-black text-center">
          {title}
        </Typography>
        <Typography
          variant="regular-base"
          className="text-gray-500 mx-auto text-center"
        >
          Retrieve tickets for issues reported on your support line directly
          through WhatsApp to your helpdesk in Eusate.
        </Typography>
        <Button
          size="sm"
          onClick={() => action && action()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          variant={isConnected ? "tetiary" : "primary"}
          classNames={{
            root: cls(
              "w-full h-12 transition-colors duration-200",
              ishovered && "!bg-error-500 text-white border-none"
            ),
            label: ishovered ? "text-white" : "",
          }}
        >
          {isConnected ? (ishovered ? "Disconnect" : "Connected") : "Connect"}
        </Button>
      </div>
    </section>
  )
}

export default AppCard
