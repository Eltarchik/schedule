import { WeekScheduleData } from "@/entities/week-schadule"
import { axiosPrivate } from "@/shared/api/api.config"
import { WeekScheduleParams } from "@/entities/week-schadule/model/types"


export const getWeekSchedule = async (params: WeekScheduleParams): Promise<WeekScheduleData> => {
    const response = await axiosPrivate.get<WeekScheduleData>(
        "/schedule/week/group",
        { params }
    )

    return response.data
}