'use client'

import { Heading } from "@/shared/ui/text"
import { formatDateToMonthName } from "@/shared/lib/datetime/formatDate"
import { useCalendarDayStore } from "@/features/select-calendar-day/model/calendarDay.store"
import { CalendarDay } from "@/features/select-calendar-day/ui/CalendarDay"
import { compareDates } from "@/shared/lib/datetime/dateOperations"
import { useCalendarMonthBlock } from "@/widgets/calendar-month/lib/useCalendarMonthBlock"


interface Props {
    monthStart: Date
}

export const CalendarMonthBlock = (
    { monthStart }: Props
) => {
    const monthName = formatDateToMonthName(monthStart)
        + (monthStart.getMonth() === 0 ? ` ${monthStart.getFullYear()}` : "")

    const selectedDay = useCalendarDayStore(state => state.day)

    const datesData = useCalendarMonthBlock(monthStart)

    return <div className="flex flex-col gap-2 w-full">
        <Heading size="small">{ monthName }</Heading>
        <div className="grid grid-cols-7 gap-2 w-full">
            { datesData.map(day => {
                return <CalendarDay key={day.date.toISOString()}
                                    day={day}
                                    selected={!!selectedDay && compareDates(selectedDay, day.date)}
                />
            }) }
        </div>
    </div>
}