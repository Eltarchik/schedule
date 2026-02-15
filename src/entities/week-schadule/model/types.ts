import { DayScheduleData } from "@/entities/day-schedule"

export enum WeekType {
    EVEN = "even",
    ODD = "odd",
    OTHER = "other"
}

export interface GroupWeekScheduleParams {
    week: string
    id: number
    mode: WeekType
}

export interface TeacherWeekScheduleParams {
    week: string
    id: number
}

export interface WeekScheduleData {
    weekType: WeekType
    days: DayScheduleData[]
}