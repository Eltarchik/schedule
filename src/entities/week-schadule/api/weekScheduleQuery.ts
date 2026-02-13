import { WeekScheduleAPI } from "@/entities/week-schadule/api/weekScheduleAPI"
import { WeekType } from "@/entities/week-schadule/model/types"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

const useGroupWeekSchedule = (
    start: Date | undefined,
    group: string,
    mode: WeekType
) => {
    return useQuery({
        queryKey: ["schedule", "week", "group", group, start?.toISOString()],
        queryFn: () => WeekScheduleAPI.group({ week: start?.toISOString() || "", group, mode }),
        enabled: !!start,
        placeholderData: keepPreviousData
    })
}

const useTeacherWeekSchedule = (
    start: Date | undefined,
    teacherId: number,
) => {
    return useQuery({
        queryKey: ["schedule", "week", "teacher", teacherId, start?.toISOString()],
        queryFn: () => WeekScheduleAPI.teacher({
            date: start?.toISOString() || "",
            id: teacherId,
        }),
        enabled: !!start,
        placeholderData: keepPreviousData
    })
}


export class WeekScheduleQuery {
    static readonly group = useGroupWeekSchedule
    static readonly teacher = useTeacherWeekSchedule
}