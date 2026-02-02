export const formatMinutesToTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    const lastZero = remainingMinutes < 10 ? "0" : ""

    return `${hours}:${remainingMinutes}${lastZero}`
}

export const formatTimeInterval = (startTime: number, endTime: number) => {
    return `${formatMinutesToTime(startTime)} – ${formatMinutesToTime(endTime)}`
}