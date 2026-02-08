export const compareDates = (first: Date, second: Date) => {
    return first.getFullYear() === second.getFullYear()
        && first.getMonth() === second.getMonth()
        && first.getDate() === second.getDate()
}

export const cloneDate = (date: Date, year?: number, month?: number, day?: number) => {
    return new Date(year ?? date.getFullYear(), month ?? date.getMonth(), day ?? date.getDate())
}

export const getPrevMonthLastDay = (date: Date) => {
    return cloneDate(date, undefined, undefined, 0)
}

export const getCurrentMonthLastDay = (date: Date) => {
    return cloneDate(date, undefined, date.getMonth() + 1, 0)
}

export const getNormalizedWeekday = (date: Date) => {
    const weekday = date.getDay()
    return weekday === 0 ? 6 : weekday - 1
}