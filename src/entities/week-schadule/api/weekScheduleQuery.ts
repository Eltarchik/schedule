import { WeekScheduleAPI } from "@/entities/week-schadule/api/weekScheduleAPI"
import { WeekType } from "@/entities/week-schadule/model/types"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

const useGroupWeekSchedule = (
    start: Date | undefined,
    groupId: number,
    mode: WeekType
) => {
    return useQuery({
        queryKey: ["schedule", "week", "group", groupId, start?.toISOString()],
        queryFn: () => WeekScheduleAPI.group({ week: start?.toISOString() || "", id: groupId, mode }),
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
            week: start?.toISOString() || "",
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