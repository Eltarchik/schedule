import { useScheduleDayStore } from "@/features/select-day"
import React, { memo, useCallback, useMemo } from "react"
import { Heading, Text } from "@/shared/ui/text"
import { formatDateToMonthName } from "@/shared/lib/datetime/formatDate"
import { useSchoolWeekDates } from "@/features/select-day/lib/useSchoolWeekCalendar"
import { WEEKDAYS } from "@/entities/day-schedule/model/weekdays"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cloneDate, compareDates } from "@/shared/lib/datetime/dateOperations"

interface Props {
    // todo firstDate: Date
    // todo lastDate: Date
    className?: string
}

interface DateButtonProps {
    date: number
    disabled?: boolean
    selected?: boolean
    children?: React.ReactNode
    onClick?: (date: number) => void
}

const DateButton = memo(({
    date,
    disabled = false,
    selected = false,
    children,
    onClick = () => {}
}: DateButtonProps) => {
    const bgColor = selected ? "bg-accent" : ""
    const textColor = disabled ? "text-element-disabled" : "text-element"

    return <button className={`flex items-center justify-center size-10 rounded-lg ${bgColor}`}
                   disabled={disabled}
                   onClick={() => onClick(date)}
    >
        <Text small className={textColor}>{ children }</Text>
    </button>
})
DateButton.displayName = "DateButton"

export const ScheduleWeekCalendar = ({
    className = "",

}: Props) => {
    const day = useScheduleDayStore(state => state.day)
    const setDay = useScheduleDayStore(state => state.setDay)
    const [ selectedMonth, setSelectedMonth, displayedDays ] = useSchoolWeekDates(day)

    const monthText = useMemo(() => {
        const text = formatDateToMonthName(selectedMonth)
        return text.slice(0, 1).toUpperCase() + text.slice(1)
    }, [selectedMonth])

    const selectPrevMonth = () => {
        const month = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1, 1)
        setSelectedMonth(month)
    }

    const selectNextMonth = () => {
        const month = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 1)
        setSelectedMonth(month)
    }

    const selected = (dayNumber: number) => {
        if (!day) return false
        const date = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), dayNumber)

        return compareDates(day, date)
    }

    const onMonthClick = useCallback((date: number) => {
        setDay(cloneDate(selectedMonth, undefined, undefined, date))
    }, [selectedMonth, setDay])

    return <div className={`absolute z-20 flex flex-col gap-2 p-2 h-fit w-84 rounded-xl bg-island
                            shadow-space/40 shadow-xl ${className}`}
    >
        <div className="flex justify-between items-center">
            <button className="flex size-6 items-center justify-center"
                    onClick={selectPrevMonth}
            >
                <ChevronLeft />
            </button>
            <Heading size="small">{ monthText }</Heading>
            <button className="flex size-6 items-center justify-center"
                    onClick={selectNextMonth}
            >
                <ChevronRight />
            </button>
        </div>

        <div className="flex flex-col gap-2">
            <div className="grid grid-cols-7 grid-rows-7 gap-2">
                { WEEKDAYS.map(weekday =>
                    <div className="flex items-center justify-center size-10" key={weekday}>
                        <Text small bold className="text-element-sub">{ weekday }</Text>
                    </div>
                )}

                { displayedDays[0].map(date =>
                    <DateButton date={date} disabled key={date}>{ date }</DateButton>
                )}

                { displayedDays[1].map(date =>
                    <DateButton date={date} selected={selected(date)} key={date}
                                onClick={onMonthClick}
                    >
                        { date }
                    </DateButton>
                )}

                { displayedDays[2].map(date =>
                    <DateButton date={date} disabled key={date}>{ date }</DateButton>
                )}
            </div>
        </div>
    </div>
}
