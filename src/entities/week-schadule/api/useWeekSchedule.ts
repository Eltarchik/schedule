import { getWeekSchedule } from "@/entities/week-schadule/api/getWeekSchedule"
import { WeekSchedule } from "@/entities/week-schadule"

export const useWeekSchedule = (): WeekSchedule => {
    return getWeekSchedule() // todo
}