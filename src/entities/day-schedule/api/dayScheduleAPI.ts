import { DayScheduleData, GroupDayScheduleParams, TeacherDayScheduleParams } from "@/entities/day-schedule/model/types"
import { axiosCommon } from "@/shared/api/api.config"

export class DayScheduleAPI {
    private static BASE_URL = "/schedule/day"

    static async group(params: GroupDayScheduleParams): Promise<DayScheduleData> {
        const response = await axiosCommon.get<DayScheduleData>(
            `${this.BASE_URL}/group`,
            { params }
        )

        return response.data
    }

    static async teacher(params: TeacherDayScheduleParams): Promise<DayScheduleData> {
        const response = await axiosCommon.get<DayScheduleData>(
            `${this.BASE_URL}/teacher`,
            { params }
        )

        return response.data
    }
}