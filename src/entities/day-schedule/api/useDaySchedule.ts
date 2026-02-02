import { getDaySchedule } from "@/entities/day-schedule/api/getDaySchedule"
import { DaySchedule } from "@/entities/day-schedule/model/types"

export const useDaySchedule = (): DaySchedule => {
  return getDaySchedule() // todo
}
