import { Text } from "@/shared/ui/text"
import { WEEKDAYS } from "@/entities/day-schedule/model/weekdays"
import { LessonCell } from "@/entities/lesson/ui/LessonCell"
import { SlotCell } from "@/entities/slot/ui/SlotCell"
import { Fragment } from "react"
import { useWeekSchedule } from "@/entities/week-schadule/api/useWeekSchedule"
import { useScheduleWeekStore } from "@/features/select-week"
import { formatDateToMDNumbers } from "@/shared/lib/datetime/formatDate"
import { WeekSelector } from "@/features/select-week/ui/WeekSelector"

export const WeekSchedule = () => {
    const weekStartDay = useScheduleWeekStore(state => state.weekStart)

    const weekSchedule = useWeekSchedule()
    const { weekType, days: weekdaysSchedule } = weekSchedule

    const maxSlotsCount = Math.max(...weekdaysSchedule.map(daySchedule => daySchedule.slots.length))
    const weekday = (new Date()).getDay()
    const todaySlots = (weekday === 0 ? weekdaysSchedule[0] : weekdaysSchedule[weekday - 1])?.slots

    const lastSchoolDay = Math.max(...weekdaysSchedule.map((daySchedule, i) => daySchedule.slots.length ? i : 0))
    const schoolWeekdaysSchedule = weekdaysSchedule.slice(0, lastSchoolDay + 1)

    let weekTitle = ""
    if (weekType === "even") weekTitle = "Чётная"
    else if (weekType === "odd") weekTitle = "Нечётная"

    const getWeekdayDateNumbers = (offset: number) => {
        if (!weekStartDay) return

        const weekdayDate =
            new Date(weekStartDay.getFullYear(), weekStartDay.getMonth(), weekStartDay.getDate() + offset)
        return formatDateToMDNumbers(weekdayDate)
    }

    return <div className="flex flex-col gap-2 size-full">
        <div className="grid grid-flow-col grid-cols-[100px] auto-cols-[200px] gap-1 overflow-auto no-scrollbar"
             style={{ gridTemplateRows: `repeat(${maxSlotsCount + 1}, 84px)` }}
        >
            <div className="flex justify-center items-center size-full">
                <Text bold className="text-element-sub">{weekTitle}</Text>
            </div>
            {todaySlots.map((slot, i) =>
                <SlotCell key={slot.startTime} number={i + 1} slot={slot}/>
            )}

            {schoolWeekdaysSchedule.map((daySchedule, i) => <Fragment key={i}>
                <div className="row-start-1 flex flex-col justify-center items-center gap-2 size-full">
                    <Text className="text-xs">{ WEEKDAYS[i] }</Text>
                    <Text>{ getWeekdayDateNumbers(i) }</Text>
                </div>

                {daySchedule.lessons.map(lesson =>
                    <LessonCell key={lesson.id}
                                lesson={lesson}
                                style={{ gridRow: `span ${lesson.length} / span ${lesson.length}` }}
                    />
                )}
            </Fragment>)}
        </div>
    </div>
}