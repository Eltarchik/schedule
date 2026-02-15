import { Lesson } from "@/entities/lesson"
import { Slot } from "@/entities/slot"
import { WeekType } from "@/entities/week-schadule/model/types"

export interface GroupDayScheduleParams {
    day: string
    id: number
    mode: WeekType // todo delete
}

export interface TeacherDayScheduleParams {
    day: string
    id: number
}

export interface DayScheduleData {
    slots: Slot[]
    lessons: Lesson[]
}