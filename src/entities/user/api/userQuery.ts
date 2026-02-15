import { useQuery } from "@tanstack/react-query"
import { UserAPI } from "@/entities/user/api/userAPI"

const useUserProfile = () => {
    return useQuery({
        queryKey: ["user", "profile"],
        queryFn: () => UserAPI.profile()
    })
}

export class UserQuery {
    static readonly profile = useUserProfile
}