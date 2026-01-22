'use client'

import { Lesson } from "@/entities/lesson"
import { Text, Header } from "@/shared/ui/text"
import { formatLessonTime } from "@/entities/lesson"

interface Props {
    lesson: Lesson
    filling?: number
    onClick?: (lesson: Lesson) => void
}

export const LessonCard = (
    {
        lesson,
        filling = 56,
        onClick

    }: Props
) => {
    const timeInterval = formatLessonTime(lesson.startTime, lesson.endTime)

    const cardColor = filling === undefined ? "bg-island" : "bg-accent-dark"

    return <button className={`relative flex flex-col justify-between p-4 rounded-2xl overflow-hidden h-28 ${cardColor}`}
                   onClick={()=> onClick?.(lesson)}
    >
        <div className="flex z-10 justify-between gap-3">
            <Header>{lesson.subject}</Header>
            <Text small bold>{timeInterval}</Text>
        </div>
        <div className="flex z-10 justify-between gap-3">
            <Text small color="var(--element-sub)">{lesson.teacher}</Text>
            <Text small color="var(--element-sub)">{lesson.classroom}</Text>
        </div>

        { filling !== undefined &&
            <div className="absolute flex h-full left-0 top-0 bg-gradient-to-r from-accent/0 to-accent"
                 style={{ width: `${filling}%` }}
            ></div>
        }
    </button>
}