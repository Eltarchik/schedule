import { compareDates } from "@/shared/lib/datetime/dateOperations"

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