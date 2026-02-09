class Banners {
    private static BASE_PATH = "/calendar/banners"

    static WINTER = this.BASE_PATH + "/winter.png"
    static SPRING = this.BASE_PATH + "/spring.png"
    static SUMMER = this.BASE_PATH + "/summer.png"
    static AUTUMN = this.BASE_PATH + "/autumn.png"
}

const isWinter = (month: number) => {
    return [0, 1, 11].includes(month)
}
const isSpring = (month: number) => {
    return month >= 2 && month <= 4
}
const isSummer = (month: number) => {
    return month >= 5 && month <= 7
}
const isAutumn = (month: number) => {
    return month >= 8 && month <= 10
}

export const getDayBanner = (day: Date) => {
    const month = day.getMonth()
    const date = day.getDate()

    const winter = isWinter(month)
    const spring = isSpring(month)
    const summer = isSummer(month)
    const autumn = isAutumn(month)

    if (winter) return Banners.WINTER
    if (spring) return Banners.SPRING
    if (summer) return Banners.SUMMER
    else return Banners.AUTUMN
}