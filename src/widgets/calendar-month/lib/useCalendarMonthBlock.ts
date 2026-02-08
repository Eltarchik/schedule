import { getMonthBoundsData } from "@/shared/lib/datetime/dateModels"
import { CalendarDayData } from "@/features/select-calendar-day/model/types"
import { range } from "@/shared/lib/utils/array"
import { cloneDate, getNormalizedWeekday } from "@/shared/lib/datetime/dateOperations"

export const useCalendarMonthBlock = (monthStart: Date) => {
    const daysData: CalendarDayData[] = []
    const { prevMonthLast, currentMonthLast, currentMonthNormalizedWeekday } = getMonthBoundsData(monthStart)

    if (currentMonthNormalizedWeekday) {
        const lastDay = prevMonthLast.getDate()
        daysData.push(
            ...range(lastDay - currentMonthNormalizedWeekday, lastDay).map(day => ({
                date: cloneDate(prevMonthLast, undefined, undefined, day),
                isDisabled: true,
                isWeekend: false,
                isHoliday: false,
            }))
        )
    }

    // todo integrate api
    daysData.push(
        ...range(monthStart.getDate(), currentMonthLast.getDate()).map(day => ({
            date: cloneDate(monthStart, undefined, undefined, day),
            isDisabled: false,
            isWeekend: false,
            isHoliday: (currentMonthNormalizedWeekday + day + 1) % 7 === 0,
        }))
    )

    const nextMonthStart = cloneDate(monthStart, undefined, monthStart.getMonth() + 1, 1)
    const nextMonthStartWeekday = getNormalizedWeekday(nextMonthStart)

    if (nextMonthStartWeekday) {
        daysData.push(
            ...range(1, 7 - nextMonthStartWeekday).map(day => ({
                date: cloneDate(nextMonthStart, undefined, undefined, day),
                isDisabled: true,
                isWeekend: false,
                isHoliday: false,
            }))
        )
    }


    return daysData
}