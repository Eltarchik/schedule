import { Lesson } from "@/entities/lesson"

const mockLessons: Lesson[] = [
    {
        id: "1",
        subject: "Разговоры",
        teacher: "Кошкина В.С.",
        classroom: "ав-4201",
        startTime: "9:00",
        endTime: "10:30",
        orderNumber: 1,
    },
    {
        id: "2",
        subject: undefined,
        teacher: "",
        classroom: "",
        startTime: "10:40",
        endTime: "12:10",
        orderNumber: 2,
    },
    {
        id: "3",
        subject: "Математика",
        teacher: "Богданов М.Р.",
        classroom: "ав-4211-А",
        startTime: "12:20",
        endTime: "13:50",
        orderNumber: 3,
    },
    {
        id: "4",
        subject: "Основы сетевых технологий",
        teacher: "Карпов А.В.",
        classroom: "ав-4304",
        startTime: "14:30",
        endTime: "16:00",
        orderNumber: 4,
    },
    {
        id: "5",
        subject: "Английский язык",
        teacher: "Шевцова М.О.",
        classroom: "ав-4809",
        startTime: "16:10",
        endTime: "17:40",
        orderNumber: 5,
    },
    {
        id: "6",
        subject: undefined,
        teacher: "Карпов А.В.",
        classroom: "ав-4304",
        startTime: "17:50",
        endTime: "19:20",
        orderNumber: 6,
    },
    {
        id: "7",
        subject: "ОРГ",
        teacher: "Хусуйдинова Л.Г.",
        classroom: "ав-4310",
        startTime: "19:30",
        endTime: "21:00",
        orderNumber: 7,
    },
]

export const getDayLessons = (): Lesson[] => {
    return mockLessons // todo
}