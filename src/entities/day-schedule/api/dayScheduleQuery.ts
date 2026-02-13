import { DayScheduleAPI } from "@/entities/day-schedule/api/dayScheduleAPI"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { WeekType } from "@/entities/week-schadule/model/types"

const useGroupDaySchedule = (
    date: Date | undefined,
    group: string,
    mode: WeekType
) => {
    return useQuery({
        queryKey: ["schedule", "day", "group", group, date?.toISOString()],
        queryFn: () => DayScheduleAPI.group({
            day: date?.toISOString() || "",
            group,
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
            date: date?.toISOString() || "",
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
