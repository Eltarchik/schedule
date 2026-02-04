import { getDaySchedule } from "@/entities/day-schedule/api/getDaySchedule"
import { useQuery } from "@tanstack/react-query"
import { WeekType } from "@/entities/week-schadule/model/types"

export const useDaySchedule = (
    date: Date | undefined,
    group: string,
    mode: WeekType
) => {
  return useQuery({
    queryKey: ["schedule", "day", group, date?.toISOString()],
    queryFn: () => getDaySchedule({ date: date?.toISOString() || "", group, mode }),
    enabled: !!date,
  })
}
