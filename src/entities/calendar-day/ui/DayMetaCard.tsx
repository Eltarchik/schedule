import { Heading, Text } from "@/shared/ui/text"
import { formatDateToText, formatDateToWeekdayName } from "@/shared/lib/datetime/formatDate"
import { CalendarDayInfo } from "@/entities/calendar-day/model/types"
import { formatTimeInterval } from "@/shared/lib/datetime/formatTime"
import Image from "next/image"


interface Props {
    date?: Date
    dayInfo?: CalendarDayInfo
}

export const DayMetaCard = (
    { date, dayInfo }: Props
) => {
    if (!date || !dayInfo) return <div className="flex min-h-45 w-full rounded-2xl bg-island" />

    const dateName = formatDateToText(date)
    const weekdayName = formatDateToWeekdayName(date, true)

    const { lessonsCount, lessonsStart, lessonsEnd } = dayInfo

    let lessonsCountText = lessonsCount === 0 ? "нет" : lessonsCount.toString()
    if (lessonsCount % 10 === 1 && lessonsCount !== 11) lessonsCountText += " урок"
    else if ([2, 3, 4].includes(lessonsCount % 10) && ![12, 13, 14].includes(lessonsCount)) lessonsCountText += " урока"
    else lessonsCountText += " уроков"

    const schoolTime = formatTimeInterval(lessonsStart, lessonsEnd)

    return <div className="relative flex flex-col justify-between p-4 min-h-45 w-full rounded-2xl bg-island overflow-hidden">
        <div className="flex flex-col gap-2">
            <Heading>{ dateName }</Heading>
            <Heading>{ weekdayName }</Heading>
        </div>
        <div className="flex flex-col gap-3">
            <Heading size="small" className="text-element-sub">{ lessonsCountText }</Heading>
            { !!lessonsCount &&
                <Text small bold className="text-element-sub">{schoolTime}</Text>
            }
        </div>

        {/*<Image src={posterURL} alt={"poster"} fill preload*/}
        {/*       className="absolute -z-10 object-cover"*/}
        {/*/>*/}
    </div>
}