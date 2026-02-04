import { useQuery } from "@tanstack/react-query"
import { findOwners } from "@/features/select-schedule-owner/api/findOwners"

export const useFindOwners =
    (enabled: boolean, searchString: string, count = 10) => {
        return useQuery({
            queryKey: ["schedule", "owners", searchString, count],
            queryFn: () => findOwners(searchString, count),
            enabled: enabled
        })
    }