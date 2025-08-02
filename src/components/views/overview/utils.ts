import {
  DateValue,
  getLocalTimeZone,
  parseDate,
  today,
} from "@internationalized/date"
import { RangeValue } from "@nextui-org/react"
import dayjs from "dayjs"

export const DATE_FILTER = {
  TODAY: "today",
  PAST_WEEK: "past-week",
  PAST_MONTH: "past-month",
  CUSTOM: "custom",
}
export const OVERVIEW_QUERY_KEYS = {
  DATE: "date",
}

export const DATE_FILTER_OPTIONS = [
  { label: "Today", key: DATE_FILTER.TODAY },
  { label: "This week", key: DATE_FILTER.PAST_WEEK },
  { label: "This month", key: DATE_FILTER.PAST_MONTH },
]

export const COMPARISM_TIMEFRAME = {
  [DATE_FILTER.TODAY]: "yesterday",
  [DATE_FILTER.PAST_WEEK]: "last week",
  [DATE_FILTER.PAST_MONTH]: "last month",
}

export const formatCustomCalendarDate = (date: string) => {
  const [type, start, end] = date.split(":")

  if (type === DATE_FILTER.CUSTOM) {
    return {
      start: parseDate(start),
      end: parseDate(end),
    } as RangeValue<DateValue>
  } else {
    const todayDate = today(getLocalTimeZone())
    return {
      start: todayDate.subtract({ days: 1 }),
      end: todayDate,
    }
  }
}

export const getDateRange = (date: string) => {
  const today = dayjs()
  const [type, start, end] = date.split(":")
  switch (type) {
    case DATE_FILTER.TODAY:
      return {
        start: today.startOf("day").toISOString(),
        end: today.endOf("day").toISOString(),
      }
    case DATE_FILTER.PAST_WEEK:
      return {
        start: today.startOf("week").startOf("day").toISOString(),
        end: today.endOf("day").toISOString(),
      }
    case DATE_FILTER.PAST_MONTH:
      return {
        start: today.startOf("month").startOf("day").toISOString(),
        end: today.endOf("day").toISOString(),
      }
    default:
      return {
        start: dayjs(start).startOf("day").toISOString(),
        end: dayjs(end).endOf("day").toISOString(),
      }
  }
}
