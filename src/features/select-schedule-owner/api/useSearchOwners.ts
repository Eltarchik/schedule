import { useQuery } from "@tanstack/react-query"
import { OwnersAPI } from "@/features/select-schedule-owner/api/ownersAPI"

const useSearchOwners =
    (enabled: boolean, searchString: string, count = 10) => {
        return useQuery({
            queryKey: ["schedule", "owners", searchString, count],
            queryFn: () => OwnersAPI.searchOwners(searchString, count),
            enabled: enabled
        })
    }

export class OwnersQuery {
    static searchOwners = useSearchOwners
}