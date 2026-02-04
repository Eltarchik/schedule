import { Lesson } from "@/entities/lesson"
import { Slot } from "@/entities/slot"
import { WeekType } from "@/entities/week-schadule/model/types"

export interface DayScheduleParams {
    date: string
    group: string
    mode: WeekType // todo delete
}

export interface DayScheduleData {
    slots: Slot[]
    lessons: Lesson[]
}