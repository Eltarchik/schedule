import { axiosPrivate } from "@/shared/api/api.config"
import { ScheduleOwner } from "@/features/select-schedule-owner/model/types"

export const findOwners =
    async (searchString: string, count: number): Promise<ScheduleOwner[]> => {
        const response = await axiosPrivate.get<ScheduleOwner[]>(
            "/owner",
            { params: {
                name: searchString,
                quantity: count
            } }
        )

        return response.data
    }