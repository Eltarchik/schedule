'use client'

import { Lesson } from "@/entities/lesson"
import { Text, Heading } from "@/shared/ui/text"
import { formatTimeInterval } from "@/shared/lib/datetime/formatTime"

interface Props {
    lesson: Lesson
    startTime: number
    endTime: number
    filling?: number
    disabled?: boolean
    onClick?: (lesson: Lesson) => void
}

export const LessonCard = ({
    lesson,
    startTime,
    endTime,
    filling = undefined,
    disabled = false,
    onClick

}: Props) => {
    const timeInterval = formatTimeInterval(startTime, endTime)

    const cardColor = filling === undefined ? "bg-island" : "bg-accent-dark"
    const cardOpacity = disabled ? "opacity-40" : "opacity-100"
    const ghostPattern =
        `bg-[repeating-linear-gradient(-45deg,var(--space)_0px,var(--space)_8px,transparent_8px,transparent_16px)]`

    return <button className={`relative flex flex-col justify-between p-4 rounded-2xl overflow-hidden min-h-25 
                             ${cardColor} ${cardOpacity}`}
                   onClick={()=> onClick?.(lesson)}
    >
        <div className="flex z-10 justify-between gap-3 h-6">
            <Heading className="truncate">{lesson.subject}</Heading>
            <Text small bold className="text-nowrap">{ timeInterval }</Text>
        </div>
        { lesson.isAvailable &&
            <div className="flex z-10 justify-between gap-3">
                <Text small className="text-element-sub">{lesson.owner}</Text>
                <Text small className="text-element-sub">{lesson.classroom}</Text>
            </div>
        }

        { filling !== undefined &&
            <div className="absolute flex h-full left-0 top-0 bg-gradient-to-r from-accent/0 to-accent"
                 style={{ width: `${filling}%` }}
            ></div>
        }

        { !lesson.isAvailable &&
            <div className={`absolute flex size-full left-0 top-0 ${ghostPattern}`}></div>
        }
    </button>
}