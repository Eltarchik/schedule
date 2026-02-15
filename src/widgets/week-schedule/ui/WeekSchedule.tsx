import { Heading, Text } from "@/shared/ui/text"
import { WEEKDAYS } from "@/shared/lib/datetime/formatDate"
import { LessonCell } from "@/entities/lesson/ui/LessonCell"
import { SlotCell } from "@/entities/slot/ui/SlotCell"
import { Fragment } from "react"
import { WeekScheduleQuery } from "@/entities/week-schadule/api/weekScheduleQuery"
import { useScheduleWeekStore } from "@/features/select-week"
import { formatDateToDMNumbers } from "@/shared/lib/datetime/formatDate"
import { WeekType } from "@/entities/week-schadule/model/types"
import { useScheduleOwnerStore } from "@/features/select-schedule-owner"
import { cloneDate, compareDates, getNormalizedWeekday } from "@/shared/lib/datetime/dateOperations"
import { ScheduleOwnerType } from "@/features/select-schedule-owner/model/types"

export const WeekSchedule = () => {
    const weekStartDay = useScheduleWeekStore(state => state.weekStart)
    const owner = useScheduleOwnerStore(state => state.owner)

    const { data, isPlaceholderData } = owner?.type === ScheduleOwnerType.TEACHER
        ? WeekScheduleQuery.teacher(weekStartDay, owner?.id ?? -1)
        : WeekScheduleQuery.group(weekStartDay, owner?.id ?? -1, WeekType.OTHER)


    if (!data) return <div/>

    const { weekType, days: weekdaysSchedule } = data

    const availableDays = weekdaysSchedule.map((daySchedule, i) => daySchedule.slots.length ? i : 0)
    const lastSchoolDay = Math.max(...availableDays)
    const schoolWeekdaysSchedule = weekdaysSchedule.slice(0, lastSchoolDay + 1)

    const maxSlotsCount = Math.max(...weekdaysSchedule.map(daySchedule => daySchedule.slots.length))
    const today = new Date()
    const weekday = getNormalizedWeekday(today)
    const slotsWeekday = availableDays.includes(weekday) ? weekday : availableDays[0] ?? -1
    const todaySlots =
        weekdaysSchedule
        .filter(day => day.slots.length)
            [Math.min(slotsWeekday, lastSchoolDay)]?.slots

    if (!maxSlotsCount) return <div className="flex justify-center items-center size-full">
        <Heading size="medium">Уроков нет</Heading>
    </div>

    const weekOpacity = isPlaceholderData ? "opacity-60" : ""

    let weekTitle = ""
    if (weekType === "even") weekTitle = "Чётная"
    else if (weekType === "odd") weekTitle = "Нечётная"

    const getWeekdayDate = (offset: number) => {
        if (!weekStartDay) return
        return cloneDate(weekStartDay, undefined, undefined, weekStartDay.getDate() + offset)
    }

    const getWeekdayDateNumbers = (offset: number) => {
        const weekdayDate = getWeekdayDate(offset)
        if (!weekdayDate) return

        return formatDateToDMNumbers(weekdayDate)
    }

    return <div className={`flex flex-col gap-2 size-full ${weekOpacity}`}>
        <div className="grid grid-flow-col grid-cols-[100px] auto-cols-[200px] gap-1 overflow-auto no-scrollbar"
             style={{ gridTemplateRows: `repeat(${maxSlotsCount + 1}, 84px)` }}
        >
            <div className="flex justify-center items-center size-full">
                <Text bold className="text-element-sub">{weekTitle}</Text>
            </div>
            { todaySlots.map((slot, i) =>
                <SlotCell key={slot.start} number={i + 1} slot={slot}/>
            )}

            { schoolWeekdaysSchedule.map((daySchedule, i) => {
                const date = getWeekdayDate(i)
                const isToday = !!date && compareDates(date, today)
                if (isToday) console.log(getWeekdayDateNumbers(i))

                return <Fragment key={i}>
                    <div className="relative row-start-1 flex flex-col justify-center items-center gap-2 size-full">
                        <Text className="text-xs">{WEEKDAYS[i]}</Text>
                        <Text>{getWeekdayDateNumbers(i)}</Text>
                        {isToday &&
                            <div className="absolute -z-10 inset-0 pointer-events-none
                                            bg-[radial-gradient(circle_84px_at_center,var(--accent-dark),transparent)]"
                            />
                        }
                    </div>

                    { daySchedule.lessons.map(lesson =>
                        <LessonCell key={lesson.slotNumber}
                                    lesson={lesson}
                                    style={{ gridRow: `span ${lesson.slotLength} / span ${lesson.slotLength}` }}
                        />
                    )}
                </Fragment>
            })}
        </div>
    </div>
}