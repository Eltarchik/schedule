'use client'

import { DefaultHeader } from "@/widgets/default-header"
import { SmartCalendarView } from "@/widgets/calendar-month/ui/SmartCalendarView"
import { DayMetaCard } from "@/entities/calendar-day/ui/DayMetaCard"
import { useCalendarDayStore } from "@/features/select-calendar-day/model/calendarDay.store"
import { CalendarDayInfo } from "@/entities/calendar-day/model/types"

const mockDayInfo: CalendarDayInfo = {
    lessonsCount: 6,
    lessonsStart: 480,
    lessonsEnd: 830,
}

export const Calendar = () => {
    const day = useCalendarDayStore(state => state.day)

    return <div className="flex flex-col items-center gap-4 w-full h-full">
        <DefaultHeader>Календарь</DefaultHeader>

        <DayMetaCard date={day} dayInfo={mockDayInfo}/>
        <SmartCalendarView />
    </div>
}