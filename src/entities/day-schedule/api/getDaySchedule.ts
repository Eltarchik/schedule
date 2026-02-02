import { Lesson } from "@/entities/lesson"
import { Slot } from "@/entities/slot"
import { DaySchedule } from "@/entities/day-schedule/model/types"

const mockSlots: Slot[] = [
    {
        startTime: 540,
        endTime: 580,
    },
    {
        startTime: 590,
        endTime: 630,
    },
    {
        startTime: 640,
        endTime: 680,
    },
    {
        startTime: 690,
        endTime: 730,
    },
    {
        startTime: 750,
        endTime: 790,
    },
    {
        startTime: 890,
        endTime: 840,
    },
    {
        startTime: 850,
        endTime: 910,
    },
]

const mockLessons: Lesson[] = [
    {
        id: "1",
        isAvailable: true,
        subject: "Разговоры",
        owner: "Кошкина В.С.",
        classroom: "ав-4201",
        slotNumber: 0,
        length: 1,
    },
    {
        id: "2",
        isAvailable: false,
        subject: "",
        owner: "",
        classroom: "",
        slotNumber: 1,
        length: 1,
    },
    {
        id: "3",
        isAvailable: true,
        subject: "Математика",
        owner: "Богданов М.Р.",
        classroom: "ав-4211-А",
        slotNumber: 2,
        length: 1,
    },
    {
        id: "4",
        isAvailable: true,
        subject: "Основы сетевых технологий",
        owner: "Карпов А.В.",
        classroom: "ав-4304",
        slotNumber: 3,
        length: 2,
    },
    {
        id: "5",
        isAvailable: true,
        subject: "Английский язык",
        owner: "Шевцова М.О.",
        classroom: "ав-4809",
        slotNumber: 4,
        length: 1,
    }
]

export const getDaySchedule = (): DaySchedule => {
    return {
        slots: mockSlots,
        lessons: mockLessons
    } // todo
}