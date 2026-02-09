import { Heading, Text } from "@/shared/ui/text"
import {
    formatDateToDMNumbers,
    formatDateToText,
    formatDateToWeekdayName,
    WEEKDAYS
} from "@/shared/lib/datetime/formatDate"
import { CalendarDayInfo } from "@/entities/calendar-day/model/types"
import { formatTimeInterval } from "@/shared/lib/datetime/formatTime"
import Image from "next/image"
import { getDayBanner } from "@/entities/calendar-day/lib/dayBanner"
import { useEffect, useState } from "react"
import { getNormalizedWeekday } from "@/shared/lib/datetime/dateOperations"


interface Props {
    date: Date
    dayInfo?: CalendarDayInfo
    opened?: boolean
    onClick?: () => void
}

export const DayMetaCard = ({
    date,
    dayInfo,
    opened = false,
    onClick = () => {}
}: Props) => {
    const banner = getDayBanner(date)
    const [bannerError, setBannerError] = useState(false)

    const cardHeight = opened ? 176 : 56
    const cardBg = opened ? "bg-transparent" : "bg-island"

    useEffect(() => {
        const reset = () => setBannerError(false)
        reset()
    }, [date])

    const dateName = formatDateToText(date)
    const dateShortName = formatDateToDMNumbers(date)
    const weekdayName = formatDateToWeekdayName(date, true)
    const weekdayShortName = WEEKDAYS[getNormalizedWeekday(date)]

    if (!dayInfo) return <div className="flex min-h-45 w-full rounded-2xl bg-island" />

    const { lessonsCount, lessonsStart, lessonsEnd } = dayInfo
    let lessonsCountText = lessonsCount === 0 ? "нет" : lessonsCount.toString()
    if (lessonsCount % 10 === 1 && lessonsCount !== 11) lessonsCountText += " урок"
    else if ([2, 3, 4].includes(lessonsCount % 10) && ![12, 13, 14].includes(lessonsCount)) lessonsCountText += " урока"
    else lessonsCountText += " уроков"

    const schoolTime = formatTimeInterval(lessonsStart, lessonsEnd)

    return <button
        className={`
            relative flex flex-col justify-between p-4 \
            w-full rounded-2xl overflow-hidden ${cardBg}
        `}
        style={{
            minHeight: cardHeight,
            transition: "min-height 200ms ease-in, background-color 200ms ease-out"
        }}
        onClick={onClick}
    >
        { opened && <div className="absolute flex flex-col justify-between gap-5 min-h-36">
            <div className="flex flex-col gap-2">
                <Heading>{ weekdayName }</Heading>
                <Heading>{ dateName }</Heading>
            </div>
            <div className="flex flex-col gap-3">
                <Heading size="small">{ lessonsCountText }</Heading>
                { !!lessonsCount &&
                    <Text small bold>{schoolTime}</Text>
                }
            </div>
        </div>}
        { !opened &&
            <div className="flex gap-2">
                <Heading>{ weekdayShortName }</Heading>
                <Heading>{ dateShortName }</Heading>
            </div>
        }

        { !bannerError && <>
            <div className="absolute -z-10 size-full top-0 left-0
                        bg-gradient-to-r from-0% to-50% from-space/80 to-transparent"
            />
            <Image src={banner} alt={"poster"} fill preload={opened}
                   className="absolute -z-20 object-cover bg-island"
                   onError={() => setBannerError(true)}
            />
        </>}
        { bannerError &&
            <div className="absolute -z-10 size-full top-0 left-0 bg-island" />
        }
    </button>
}