import { DayScheduleData } from "@/entities/day-schedule"

export enum WeekType {
    EVEN = "even",
    ODD = "odd",
    OTHER = "other"
}

export interface GroupWeekScheduleParams {
    start: string
    group: string
    mode: WeekType
}

export interface TeacherWeekScheduleParams {
    date: string
    id: number
}

export interface WeekScheduleData {
    weekType: WeekType
    days: DayScheduleData[]
}