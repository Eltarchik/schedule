import { DaySchedule } from "@/entities/day-schedule"

export interface WeekSchedule {
    weekType: "even" | "odd" | "other"
    days: DaySchedule[]
}