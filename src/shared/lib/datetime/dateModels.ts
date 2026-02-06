import {
    cloneDateWithOptions,
    getCurrentMonthLastDay,
    getNormalizedWeekday,
    getPrevMonthLastDay
} from "@/shared/lib/datetime/dateOperations"

interface MonthBoundsData {
    prevMonthLast: Date
    currentMonthLast: Date
    currentMonthNormalizedWeekday: number
}

export const getMonthBoundsData = (date: Date): MonthBoundsData => {
    const currentMonthStart = cloneDateWithOptions(date, undefined, undefined, 0)
    return {
        prevMonthLast: getPrevMonthLastDay(date),
        currentMonthLast: getCurrentMonthLastDay(date),
        currentMonthNormalizedWeekday: getNormalizedWeekday(currentMonthStart),
    }
}