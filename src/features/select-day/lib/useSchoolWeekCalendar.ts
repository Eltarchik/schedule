import { Dispatch, SetStateAction, useMemo, useState } from "react"
import { range } from "@/shared/lib/utils/array"
type DisplayedDaysRange = number[]
type DisplayedDays = [
  DisplayedDaysRange,
  DisplayedDaysRange,
  DisplayedDaysRange,
];

export const useSchoolWeekDates = (monthDate: Date = new Date()): [
  Date,
  Dispatch<SetStateAction<Date>>,
  DisplayedDays,
] => {
  const [selectedMonth, setSelectedMonth] = useState(new Date(monthDate.getTime()))

  const displayedDays = useMemo<DisplayedDays>(() => {
    const daysRanges: DisplayedDays = [[], [], []]

    const prevMonthLastDay = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 0)
    const targetMonthFirstDay = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1)
    const targetMonthLastDay = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0)

    const firstTargetMonthWeekday = targetMonthFirstDay.getDay()
    const startDaysOffset = firstTargetMonthWeekday === 0 ? 6 : firstTargetMonthWeekday - 1

    const lastTargetMonthWeekday = targetMonthLastDay.getDay()
    const endDaysOffsetExtend = startDaysOffset + targetMonthLastDay.getDate() - 5 > 30 ? 0 : 7
    const endDaysOffset = (lastTargetMonthWeekday === 0 ? 0
        : 7 - lastTargetMonthWeekday) + endDaysOffsetExtend

    daysRanges[0] = startDaysOffset === 0 ? []
        : range(prevMonthLastDay.getDate() - startDaysOffset + 1, prevMonthLastDay.getDate())
    daysRanges[1] = range(1, targetMonthLastDay.getDate())
    daysRanges[2] = endDaysOffset === 0 ? [] : range(1, endDaysOffset)

    return daysRanges
  }, [selectedMonth])

  return [selectedMonth, setSelectedMonth, displayedDays]
}
