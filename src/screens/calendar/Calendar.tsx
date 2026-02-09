'use client'

import { DefaultHeader } from "@/widgets/default-header"
import { SmartCalendarView } from "@/widgets/calendar-month/ui/SmartCalendarView"
import { DayMetaCard } from "@/entities/calendar-day/ui/DayMetaCard"
import { useCalendarDayStore } from "@/features/select-calendar-day/model/calendarDay.store"
import { CalendarDayInfo, DayNote } from "@/entities/calendar-day/model/types"
import { DayNoteCard } from "@/entities/calendar-day/ui/DayNoteCard"
import { useState } from "react"

const mockDayInfo: CalendarDayInfo = {
    lessonsCount: 6,
    lessonsStart: 480,
    lessonsEnd: 830,
}

const mockNote: DayNote = {
    icon: "",
    content: "Свалить пораньше с уроков и пойти играть в дотку на пудже"
}

export const Calendar = () => {
    const day = useCalendarDayStore(state => state.day)

    const [cardCollapsed, setCardCollapsed] = useState(false)

    return <div className="flex flex-col items-center gap-4 w-full h-full">
        <DefaultHeader>Календарь</DefaultHeader>

        { !!day && <>
            <DayMetaCard date={day} dayInfo={mockDayInfo} opened={cardCollapsed} onClick={() => setCardCollapsed(prev => !prev)} />
            <DayNoteCard note={mockNote} />
        </>}
        <SmartCalendarView />
    </div>
}