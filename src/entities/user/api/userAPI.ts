import { axiosCommon } from "@/shared/api/api.config"
import { type UserProfile } from "@/entities/user"

export class UserAPI {
    private static BASE_URL = "/auth"

    static async profile() {
        const response = await axiosCommon.get<UserProfile>(
            `${this.BASE_URL}/profile`
        )

        return response.data
    }

    static async avatar(formData: FormData) {
        const response = await axiosCommon.post<void>(
            `/avatar`,
            formData,
        )

        return response.data
    }
}