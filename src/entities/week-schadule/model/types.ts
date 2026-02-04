import { DayScheduleData } from "@/entities/day-schedule"

export enum WeekType {
    EVEN = "even",
    ODD = "odd",
    OTHER = "other"
}

export interface WeekScheduleParams {
    start: string
    group: string
    mode: WeekType
}

export interface WeekScheduleData {
    weekType: WeekType
    days: DayScheduleData[]
}