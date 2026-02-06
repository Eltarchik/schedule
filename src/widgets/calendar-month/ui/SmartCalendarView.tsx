'use client'

import { useCalendarView } from "@/widgets/calendar-month/lib/useCalendarView"
import { CalendarMonthBlock } from "@/widgets/calendar-month/ui/CalendarMonthBlock"
import { useCalendarDayStore } from "@/features/select-calendar-day/model/calendarDay.store"
import { cloneDateWithOptions } from "@/shared/lib/datetime/dateOperations"

export const SmartCalendarView = () => {
    const selectedDay = useCalendarDayStore(state => state.day)
    const pointerMonth = cloneDateWithOptions(selectedDay || new Date(), undefined, undefined, 1)
    const [slice, shiftUp, shiftDown] = useCalendarView(pointerMonth)

    return <div className="flex flex-col gap-4 w-full overflow-auto no-scrollbar">
        { slice.map(monthStart =>
            <CalendarMonthBlock key={monthStart.toISOString()} monthStart={monthStart} />
        )}
    </div>
}