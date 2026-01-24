import { Lesson, LessonCard } from "@/entities/lesson"
import { Text } from "@/shared/ui/text"
import { useDayLessons } from "@/entities/schedule"
import { SelectDayRow } from "@/features/select-day"
import { GroupOrTeacherSelector } from "@/features/select-group-or-teacher"


export const DailySchedule = () => {
    const lessons = useDayLessons()
    const currentLessonNumber = 3 // todo

    return <div className="flex flex-col gap-4 w-full overflow-hidden">
        <GroupOrTeacherSelector />

        <SelectDayRow />

        <div className="flex flex-col gap-4 h-full overflow-auto">
            { lessons.map((lesson: Lesson) => {
                const disabled = lesson.orderNumber < currentLessonNumber
                const filling = lesson.orderNumber === currentLessonNumber ? 56 : undefined

                return <LessonCard key={lesson.id} lesson={lesson} disabled={disabled} filling={filling} />
            })}
        </div>
    </div>
}