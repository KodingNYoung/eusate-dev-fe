import dayjs from "dayjs"
import { DATE_FILTER } from "../overview/utils"

export const TIMEFRAME_DATE_FORMATTER = {
  [DATE_FILTER.TODAY]: (value: string) => dayjs(value).format("HH"),
  [DATE_FILTER.PAST_WEEK]: (value: string) => dayjs(value).format("ddd"),
  [DATE_FILTER.PAST_MONTH]: (value: string) => dayjs(value).format("DD"),
}
