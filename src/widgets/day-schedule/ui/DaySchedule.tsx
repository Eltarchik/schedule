'use client'

import { LessonCard } from "@/entities/lesson"
import { useDaySchedule } from "@/entities/day-schedule"
import { ScheduleDaySelector } from "@/features/select-day"
import { ScheduleOwnerSelector, useInitScheduleOwner } from "@/features/select-schedule-owner"


export const DaySchedule = () => {
    const daySchedule = useDaySchedule()
    const currentLessonNumber = 3 // todo

    useInitScheduleOwner()

    return <div className="flex flex-col gap-4 w-full overflow-hidden">
        <ScheduleOwnerSelector />

        <ScheduleDaySelector />

        <div className="flex flex-col gap-4 h-full overflow-auto no-scrollbar">
            { daySchedule.lessons.map((lesson) => {
                const disabled = lesson.slotNumber < currentLessonNumber
                const filling = lesson.slotNumber === currentLessonNumber ? 56 : undefined

                return <LessonCard key={lesson.id}
                                   lesson={lesson}
                                   startTime={daySchedule.slots[lesson.slotNumber].startTime}
                                   endTime={daySchedule.slots[lesson.slotNumber + lesson.length - 1].endTime}
                                   disabled={disabled}
                                   filling={filling}
                />
            })}
        </div>
    </div>
}