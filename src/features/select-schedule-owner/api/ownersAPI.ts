import { axiosCommon } from "@/shared/api/api.config"
import { ScheduleOwner } from "@/features/select-schedule-owner/model/types"

export class OwnersAPI {
    private static BASE_URL = "/owner"

    static async searchOwners(searchString: string, count: number): Promise<ScheduleOwner[]> {
        const response = await axiosCommon.get<ScheduleOwner[]>(
            this.BASE_URL,
            { params: {
                    name: searchString,
                    quantity: count
                } }
        )

        return response.data
    }
}