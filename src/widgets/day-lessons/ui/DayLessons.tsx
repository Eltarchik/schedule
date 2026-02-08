'use client'

import { LessonCard } from "@/entities/lesson"
import { useDaySchedule } from "@/entities/day-schedule"
import { useScheduleDayStore } from "@/features/select-day"
import { useScheduleOwnerStore } from "@/features/select-schedule-owner"
import { WeekType } from "@/entities/week-schadule/model/types"
import { LessonCardSkeleton } from "@/entities/lesson/ui/LessonCardSkeleton"
import { Heading } from "@/shared/ui/text"


export const DayLessons = () => {
    const day = useScheduleDayStore(state => state.day)
    const owner = useScheduleOwnerStore(state => state.owner)

    const { data: daySchedule, isPending, isPlaceholderData } = useDaySchedule(day, owner?.name || "", WeekType.OTHER) // todo
    const currentLessonNumber = 4 // todo

    const noLessons = !daySchedule?.lessons.length

    const lessonsOpacity = isPlaceholderData ? "opacity-60" : ""

    if (isPending) return <LessonCardSkeleton count={5}/>

    if (noLessons) return <Heading size="medium" className="self-center pt-8">Уроков нет</Heading>

    return <div className={`flex flex-col gap-4 h-full overflow-auto no-scrollbar ${lessonsOpacity}`}>
        { daySchedule?.lessons.map((lesson) => {
            const disabled = lesson.slotNumber < currentLessonNumber
            const filling = lesson.slotNumber === currentLessonNumber ? 56 : undefined

            return <LessonCard key={lesson.slotNumber}
                               lesson={lesson}
                               startTime={daySchedule.slots[lesson.slotNumber - 1].start}
                               endTime={daySchedule.slots[lesson.slotNumber + lesson.slotLength - 2].end}
                               disabled={disabled}
                               filling={filling}
            />
        })}
    </div>
}