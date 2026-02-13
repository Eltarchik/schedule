import { Lesson } from "@/entities/lesson"
import { Slot } from "@/entities/slot"
import { WeekType } from "@/entities/week-schadule/model/types"

export interface GroupDayScheduleParams {
    day: string
    group: string // todo снести эту хуйню блять
    mode: WeekType // todo delete
}

export interface TeacherDayScheduleParams {
    date: string
    id: number
}

export interface DayScheduleData {
    slots: Slot[]
    lessons: Lesson[]
}