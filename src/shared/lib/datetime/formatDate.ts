import { compareDates, getNormalizedWeekday } from "@/shared/lib/datetime/dateOperations"
import { weekdaysFullNames } from "@/shared/lib/datetime/dateModels"

export const formatDateToText = (date: Date) => {
    return date.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
    })
}

export const formatDateToFreeText = (date: Date) => {
    const today = new Date()

    const isToday = compareDates(today, date)

    if (isToday) return "Сегодня"

    return formatDateToText(date)
}

export const formatDateToMonthName = (date: Date) => {
    return date.toLocaleDateString("ru-RU", {
        month: "long",
    })
}

export const formatDateToMDNumbers = (date: Date) => {
    return `${(date.getMonth() + 1).toString().padStart(2, "0")}.${(date.getDate()).toString().padStart(2, "0")}`
}

export const formatDateIntervalText = (startDate: Date, endDate: Date) => {
    return `${formatDateToText(startDate)} – ${formatDateToText(endDate)}`
}

export const formatDateToWeekdayName = (date: Date, titleCase = false) => {
    const weekday = getNormalizedWeekday(date)
    const name = weekdaysFullNames[weekday]

    if (!titleCase) return name
    return name.slice(0, 1).toUpperCase() + name.slice(1)
}