import { WeekScheduleData } from "@/entities/week-schadule"
import { axiosCommon } from "@/shared/api/api.config"
import { GroupWeekScheduleParams, TeacherWeekScheduleParams } from "@/entities/week-schadule/model/types"

export class WeekScheduleAPI {
    private static BASE_URL = "/schedule/week"

    static async group(params: GroupWeekScheduleParams) {
        const response = await axiosCommon.get<WeekScheduleData>(
            `${this.BASE_URL}/group`,
            { params }
        )

        return response.data
    }

    static async teacher(params: TeacherWeekScheduleParams) {
        const response = await axiosCommon.get<WeekScheduleData>(
            `${this.BASE_URL}/teacher`,
            { params }
        )

        return response.data
    }
}