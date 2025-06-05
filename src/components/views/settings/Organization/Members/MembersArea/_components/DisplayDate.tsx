/* Used to display last seen and date added */
import Typography from "@/components/atoms/Typography"
import { FC } from "@/utils/types"
import { useMemo } from "react"
import dayjs from "dayjs"

type Props = {
  timestamp: string
}
const DisplayDate: FC<Props> = ({ timestamp }) => {
  const { date, time } = useMemo(() => {
    const parsed = dayjs(timestamp)
    return {
      date: parsed.format("D MMM, YYYY"),
      time: parsed.format("h:mmA"),
    }
  }, [timestamp])

  return (
    <div className="w-full">
      <Typography variant="regular-sm" className="text-gray-900">
        {date}
      </Typography>
      <Typography variant="regular-sm" className="text-gray-500">
        {time}
      </Typography>
    </div>
  )
}

export default DisplayDate
