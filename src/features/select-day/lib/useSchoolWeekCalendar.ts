import { Dispatch, SetStateAction, useMemo, useState } from "react"
import { range } from "@/shared/lib/utils/array"
import { cloneDate } from "@/shared/lib/datetime/dateOperations"
import { getMonthBoundsData } from "@/shared/lib/datetime/dateModels"

type DisplayedDaysRange = number[]
type DisplayedDays = [DisplayedDaysRange, DisplayedDaysRange, DisplayedDaysRange]

export const useSchoolWeekDates = (monthDate: Date = new Date()): [
    Date,
    Dispatch<SetStateAction<Date>>,
    DisplayedDays,
] => {
    const [selectedMonth, setSelectedMonth] = useState(cloneDate(monthDate))

    const displayedDays = useMemo<DisplayedDays>(() => {
        const daysRanges: DisplayedDays = [[], [], []]

        const { prevMonthLast, currentMonthLast, currentMonthNormalizedWeekday } = getMonthBoundsData(selectedMonth)

        const lastTargetMonthWeekday = currentMonthLast.getDay()
        const endDaysOffsetExtend = currentMonthNormalizedWeekday + currentMonthLast.getDate() - 5 > 30 ? 0 : 7
        const endDaysOffset = (lastTargetMonthWeekday === 0 ? 0
            : 7 - lastTargetMonthWeekday) + endDaysOffsetExtend

        daysRanges[0] = currentMonthNormalizedWeekday === 0 ? []
            : range(prevMonthLast.getDate() - currentMonthNormalizedWeekday, prevMonthLast.getDate())
        daysRanges[1] = range(1, currentMonthLast.getDate())
        daysRanges[2] = endDaysOffset === 0 ? [] : range(1, endDaysOffset)

        return daysRanges
    }, [selectedMonth])

    return [selectedMonth, setSelectedMonth, displayedDays]
}
