'use client'

import { ScheduleDaySelector } from "@/features/select-day"
import { ScheduleOwnerSelector, useInitScheduleOwner } from "@/features/select-schedule-owner"
import { DayLessons } from "@/widgets/day-lessons/ui/DayLessons"


export const DaySchedule = () => {
    useInitScheduleOwner()

    return <div className="flex flex-col gap-4 w-full overflow-hidden">
        <ScheduleOwnerSelector />
        <ScheduleDaySelector />
        <DayLessons />
    </div>
}