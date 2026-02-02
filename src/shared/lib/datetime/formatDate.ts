export const formatDateToText = (date: Date) => {
    return date.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
    })
}

export const formatDateToFreeText = (date: Date) => {
    const today = new Date()

    const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()

    if (isToday) return "Сегодня"

    return formatDateToText(date)
}

export const formatDateToMonthName = (date: Date) => {
    return date.toLocaleDateString("ru-RU", {
        month: "long",
    })
}

export const formatDateToMDNumbers = (date: Date) => {
    return `${date.getMonth() + 1}.${date.getDate()}`
}

export const formatDateIntervalText = (startDate: Date, endDate: Date) => {
    return `${formatDateToText(startDate)} – ${formatDateToText(endDate)}`
}