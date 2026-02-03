import { Text } from "@/shared/ui/text"

interface Props {
    name: string
    value: string
}

export const UserFieldCard = ({
    name,
    value
}: Props) => {
    return <div className="flex justify-between items-center gap-4 px-4 h-10 w-full rounded-lg bg-island">
        <Text small className="text-element-sub">{ name }</Text>
        <Text small>{ value }</Text>
    </div>
}