import { DayScheduleAPI } from "@/entities/day-schedule/api/dayScheduleAPI"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { WeekType } from "@/entities/week-schadule/model/types"

const useGroupDaySchedule = (
    date: Date | undefined,
    groupId: number,
    mode: WeekType
) => {
    return useQuery({
        queryKey: ["schedule", "day", "group", groupId, date?.toISOString()],
        queryFn: () => DayScheduleAPI.group({
            day: date?.toISOString() || "",
            id: groupId,
            mode
        }),
        enabled: !!date,
        placeholderData: keepPreviousData
    })
}

const useTeacherDaySchedule = (
    date: Date | undefined,
    teacherId: number
) => {
    return useQuery({
        queryKey: ["schedule", "day", "teacher", teacherId, date?.toISOString()],
        queryFn: () => DayScheduleAPI.teacher({
            day: date?.toISOString() || "",
            id: teacherId
        }),
        enabled: !!date,
        placeholderData: keepPreviousData
    })
}

export class DayScheduleQuery {
    static readonly group = useGroupDaySchedule
    static readonly teacher = useTeacherDaySchedule
}
