import { Heading, Text } from "@/shared/ui/text"
import { Slot } from "@/entities/slot"
import { formatTimeInterval } from "@/shared/lib/datetime/formatTime"
import { memo } from "react"

interface Props {
    number: number
    slot: Slot
}

export const SlotCell = memo((
    { number, slot }: Props
) => {
    const timeInterval = formatTimeInterval(slot.start, slot.end)

    return <div className="flex flex-col justify-center items-center gap-2 size-full rounded-2xl">
        <Heading size="small" className="text-element-sub">{ number }</Heading>
        <Text className="text-xs text-element-sub">{ timeInterval }</Text>
    </div>
})
SlotCell.displayName = "SlotCell"