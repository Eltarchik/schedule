export function formatDateToText(date: Date): string {
    return date.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
    })
}

export function formatDateToFreeText(date: Date): string {
    const today = new Date()

    const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()

    if (isToday) return "Сегодня"

    return formatDateToText(date)
}