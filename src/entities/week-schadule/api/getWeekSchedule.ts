import { Slot } from "@/entities/slot"
import { Lesson } from "@/entities/lesson"
import { WeekSchedule } from "@/entities/week-schadule"

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
        subject: "Математика",
        owner: "Богданов М.Р.",
        classroom: "ав-4211-А",
        slotNumber: 0,
        length: 2,
    },
    {
        id: "2",
        isAvailable: true,
        subject: "Физика",
        owner: "Иванова Л.П.",
        classroom: "ав-4202",
        slotNumber: 2,
        length: 1,
    },
    {
        id: "3",
        isAvailable: true,
        subject: "Английский язык",
        owner: "Шевцова М.О.",
        classroom: "ав-4809",
        slotNumber: 3,
        length: 2,
    },
    {
        id: "4",
        isAvailable: true,
        subject: "История",
        owner: "Петров С.В.",
        classroom: "ав-4301",
        slotNumber: 5,
        length: 1,
    }
]
const mockLessons1: Lesson[] = [
    {
        id: "1",
        isAvailable: true,
        subject: "Информатика",
        owner: "Сидоров А.А.",
        classroom: "ав-4101",
        slotNumber: 0,
        length: 1,
    },
    {
        id: "2",
        isAvailable: true,
        subject: "Математика",
        owner: "Богданов М.Р.",
        classroom: "ав-4211-А",
        slotNumber: 1,
        length: 2,
    },
    {
        id: "3",
        isAvailable: false,
        subject: "Литература",
        owner: "Кошкина В.С.",
        classroom: "ав-4201",
        slotNumber: 3,
        length: 1,
    },
    {
        id: "4",
        isAvailable: true,
        subject: "Физкультура",
        owner: "Смирнов И.И.",
        classroom: "спортзал",
        slotNumber: 4,
        length: 2,
    }
]
const mockLessons2: Lesson[] = [
    {
        id: "1",
        isAvailable: true,
        subject: "Биология",
        owner: "Васильева Е.Г.",
        classroom: "ав-4302",
        slotNumber: 0,
        length: 1,
    },
    {
        id: "2",
        isAvailable: true,
        subject: "География",
        owner: "Кузнецова Т.А.",
        classroom: "ав-4403",
        slotNumber: 1,
        length: 1,
    },
    {
        id: "3",
        isAvailable: false,
        subject: "Математика",
        owner: "Богданов М.Р.",
        classroom: "ав-4211-А",
        slotNumber: 2,
        length: 2,
    },
    {
        id: "4",
        isAvailable: true,
        subject: "Английский язык",
        owner: "Шевцова М.О.",
        classroom: "ав-4809",
        slotNumber: 4,
        length: 1,
    },
    {
        id: "5",
        isAvailable: true,
        subject: "Физика",
        owner: "Иванова Л.П.",
        classroom: "ав-4202",
        slotNumber: 5,
        length: 2,
    }
]
const mockLessons3: Lesson[] = [
    {
        id: "1",
        isAvailable: false,
        subject: "Обществознание",
        owner: "Морозова Ю.В.",
        classroom: "ав-4501",
        slotNumber: 0,
        length: 1,
    },
    {
        id: "2",
        isAvailable: true,
        subject: "Математика",
        owner: "Богданов М.Р.",
        classroom: "ав-4211-А",
        slotNumber: 1,
        length: 2,
    },
    {
        id: "3",
        isAvailable: true,
        subject: "Информатика",
        owner: "Сидоров А.А.",
        classroom: "ав-4101",
        slotNumber: 3,
        length: 1,
    },
    {
        id: "4",
        isAvailable: true,
        subject: "Физика",
        owner: "Иванова Л.П.",
        classroom: "ав-4202",
        slotNumber: 4,
        length: 2,
    }
]
const mockLessons4: Lesson[] = [
    {
        id: "1",
        isAvailable: true,
        subject: "Литература",
        owner: "Кошкина В.С.",
        classroom: "ав-4201",
        slotNumber: 0,
        length: 1,
    },
    {
        id: "2",
        isAvailable: true,
        subject: "История",
        owner: "Петров С.В.",
        classroom: "ав-4301",
        slotNumber: 1,
        length: 1,
    },
    {
        id: "3",
        isAvailable: true,
        subject: "Математика",
        owner: "Богданов М.Р.",
        classroom: "ав-4211-А",
        slotNumber: 3,
        length: 2,
    },
    {
        id: "4",
        isAvailable: true,
        subject: "Английский язык",
        owner: "Шевцова М.О.",
        classroom: "ав-4809",
        slotNumber: 5,
        length: 1,
    }
]
const mockLessons5: Lesson[] = [
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

export const getWeekSchedule = (): WeekSchedule => {
    return {
        weekType: "even",
        days: [
            {
                slots: mockSlots,
                lessons: mockLessons
            },
            {
                slots: mockSlots,
                lessons: mockLessons1
            },
            {
                slots: mockSlots,
                lessons: mockLessons2
            },
            {
                slots: mockSlots,
                lessons: mockLessons3
            },
            {
                slots: mockSlots,
                lessons: mockLessons4
            },
            {
                slots: mockSlots,
                lessons: mockLessons5
            },
            {
                slots: mockSlots,
                lessons: mockLessons2
            },
        ]
    } // todo
}