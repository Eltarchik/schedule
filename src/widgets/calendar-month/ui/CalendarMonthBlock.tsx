'use client'

import { Heading } from "@/shared/ui/text"
import { formatDateToMonthName } from "@/shared/lib/datetime/formatDate"
import { CalendarDay } from "@/features/select-calendar-day/ui/CalendarDay"
import { useCalendarMonthBlock } from "@/widgets/calendar-month/lib/useCalendarMonthBlock"
import { RefObject } from "react"
import { useCalendarDayStore } from "@/features/select-calendar-day/model/calendarDay.store"
import { compareDates } from "@/shared/lib/datetime/dateOperations"


interface Props {
    monthStart: Date
    ref?: RefObject<HTMLDivElement | null>
}

export const CalendarMonthBlock = (
    { monthStart, ref }: Props
) => {
    const selectedDay = useCalendarDayStore(state => state.day)

    const monthName = formatDateToMonthName(monthStart)
        + (monthStart.getMonth() === 0 ? ` ${monthStart.getFullYear()}` : "")

    const datesData = useCalendarMonthBlock(monthStart)

    return <div className="flex flex-col gap-2 w-full" ref={ref}>
        <Heading size="small">{ monthName }</Heading>

        <div className="grid grid-cols-7 gap-2 w-full">
            { datesData.map(day =>
                <CalendarDay key={day.date.toISOString()}
                             day={day}
                             selected={!!selectedDay && compareDates(selectedDay, day.date)}
                />
            ) }
        </div>
    </div>
}