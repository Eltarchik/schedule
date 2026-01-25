'use client'

import { Lesson, LessonCard } from "@/entities/lesson"
import { useDayLessons } from "@/entities/schedule"
import { ScheduleDaySelector } from "@/features/select-day"
import { ScheduleOwnerSelector, useInitScheduleOwner } from "@/features/select-schedule-owner"
import { useInitScheduleDay } from "@/features/select-day"


export const DailySchedule = () => {
    const lessons = useDayLessons()
    const currentLessonNumber = 3 // todo

    useInitScheduleOwner()
    useInitScheduleDay()

    return <div className="flex flex-col gap-4 w-full overflow-hidden">
        <ScheduleOwnerSelector />

        <ScheduleDaySelector />

        <div className="flex flex-col gap-4 h-full overflow-auto">
            { lessons.map((lesson: Lesson) => {
                const disabled = lesson.orderNumber < currentLessonNumber
                const filling = lesson.orderNumber === currentLessonNumber ? 56 : undefined

                return <LessonCard key={lesson.id} lesson={lesson} disabled={disabled} filling={filling} />
            })}
        </div>
    </div>
}