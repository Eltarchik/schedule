import { DayScheduleData, DayScheduleParams } from "@/entities/day-schedule/model/types"
import { axiosPrivate } from "@/shared/api/api.config"

export const getDaySchedule = async (params: DayScheduleParams): Promise<DayScheduleData> => {
    const response = await axiosPrivate.get<DayScheduleData>(
        "/schedule/day/group",
        { params }
    )

    return response.data
}