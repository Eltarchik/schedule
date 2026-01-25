import { LeftArrowIcon, RightArrowIcon } from "@/shared/ui/icons"
import { useScheduleDayStore } from "@/features/select-day"
import React, { memo, RefObject, useMemo } from "react"
import { Header, Text } from "@/shared/ui/text"
import { formatDateToMonthName } from "@/shared/lib/datetime/formatDate"
import { useSchoolWeekDates } from "@/features/select-day/lib/useSchoolWeekCalendar"

const SCHOOL_WEEKDAYS = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"]

interface Props {
    // todo firstDate: Date
    // todo lastDate: Date
    className?: string
}

interface DateButtonProps {
    disabled?: boolean
    selected?: boolean
    children?: React.ReactNode
    onClick?: () => void
}

const DateButton = memo(({
    disabled = false,
    selected = false,
    children,
    onClick = () => {}
}: DateButtonProps) => {
    const bgColor = selected ? "bg-accent" : ""
    const textColor = disabled ? "text-element-disabled" : "text-element"

    return <button className={`flex items-center justify-center size-10 rounded-lg ${bgColor}`}
                   disabled={disabled}
                   onClick={onClick}
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
    const [ selectedMonth, setSelectedMonth, displayedDays ] = useSchoolWeekDates()

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

    const isSelected = (date: number) => {
        return day.getFullYear() === selectedMonth.getFullYear()
            && day.getMonth() === selectedMonth.getMonth()
            && date === day.getDate()
    }

    return <div className={`absolute z-20 flex flex-col gap-2 p-2 h-fit w-74 rounded-xl bg-island 
                            shadow-space/40 shadow-xl ${className}`}
    >
        <div className="flex justify-between items-center">
            <button className="flex size-6 items-center justify-center"
                    onClick={selectPrevMonth}
            >
                <LeftArrowIcon/>
            </button>
            <Header size="small">{ monthText }</Header>
            <button className="flex size-6 items-center justify-center"
                    onClick={selectNextMonth}
            >
                <RightArrowIcon/>
            </button>
        </div>

        <div className="flex flex-col gap-2">
            <div className="grid grid-cols-6 grid-rows-7 gap-2">
                { SCHOOL_WEEKDAYS.map(weekday =>
                    <div className="flex items-center justify-center size-10" key={weekday}>
                        <Text small bold className="text-element-sub">{ weekday }</Text>
                    </div>
                )}

                { displayedDays[0].map(date =>
                    <DateButton disabled key={date}>{ date }</DateButton>
                )}

                { displayedDays[1].map(date =>
                    <DateButton selected={isSelected(date)} key={date}
                                onClick={() => setDay(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), date))}
                    >
                        { date }
                    </DateButton>
                )}

                { displayedDays[2].map(date =>
                    <DateButton disabled key={date}>{ date }</DateButton>
                )}
            </div>
        </div>
    </div>
}