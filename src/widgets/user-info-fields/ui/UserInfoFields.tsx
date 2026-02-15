import { UserFieldCard } from "@/entities/user/ui/UserFieldCard"
import { useQuery } from "@tanstack/react-query"
import { UserAPI } from "@/entities/user/api/userAPI"

interface UserField {
    name: string
    value: string
}

export const UserInfoFields = () => {
    const { data: profile, isPending } = useQuery({
        queryKey: ["user", "profile"],
        queryFn: () => UserAPI.profile()
    })

    if (isPending) return // todo add skeleton
    if (!profile) return

    const fields: UserField[] = [
        {
            name: "Эл. почта",
            value: profile.email
        }
    ]

    return <div className="flex flex-col gap-2">
        {fields.map(field =>
            <UserFieldCard key={field.name} name={field.name} value={field.value}/>
        )}
    </div>
}