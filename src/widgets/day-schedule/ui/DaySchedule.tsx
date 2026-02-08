'use client'

import { LessonCard } from "@/entities/lesson"
import { useDaySchedule } from "@/entities/day-schedule"
import { ScheduleDaySelector, useScheduleDayStore } from "@/features/select-day"
import { ScheduleOwnerSelector, useInitScheduleOwner, useScheduleOwnerStore } from "@/features/select-schedule-owner"
import { WeekType } from "@/entities/week-schadule/model/types"
import { range } from "@/shared/lib/utils/array"
import { LessonCardSkeleton } from "@/entities/lesson/ui/LessonCardSkeleton"


export const DaySchedule = () => {
    const day = useScheduleDayStore(state => state.day)
    const owner = useScheduleOwnerStore(state => state.owner)

    const { data: daySchedule, isPending, isPlaceholderData } = useDaySchedule(day, owner?.name || "", WeekType.OTHER) // todo
    const currentLessonNumber = 4 // todo

    const lessonsOpacity = isPlaceholderData ? "opacity-60" : ""

    useInitScheduleOwner()

    return <div className="flex flex-col gap-4 w-full overflow-hidden">
        <ScheduleOwnerSelector />

        <ScheduleDaySelector />

        { isPending &&
            <LessonCardSkeleton count={5} />
        }

        { !isPending &&
            <div className={`flex flex-col gap-4 h-full overflow-auto no-scrollbar ${lessonsOpacity}`}>
                {daySchedule?.lessons.map((lesson) => {
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
    </div>
}