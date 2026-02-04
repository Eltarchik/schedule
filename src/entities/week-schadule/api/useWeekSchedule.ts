import { getWeekSchedule } from "@/entities/week-schadule/api/getWeekSchedule"
import { WeekType } from "@/entities/week-schadule/model/types"
import { useQuery } from "@tanstack/react-query"

export const useWeekSchedule = (
    start: Date | undefined,
    group: string,
    mode: WeekType
) => {
    return useQuery({
        queryKey: ["schedule", "week", group, start?.toISOString()],
        queryFn: () => getWeekSchedule({ start: start?.toISOString() || "", group, mode }),
        enabled: !!start
    })
}