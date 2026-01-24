export interface LessonDTO {
    id: string
    week_template: string // todo
    day_of_week: number
    start_time: string
    end_time: string
    subject: string // todo
    teacher: string // todo
    classroom: string // todo
    order_number: number
    lesson_type: string
    repeat_every: number
    start_repeat: string
    notes: string
}

export interface Lesson {
    id: string
    subject?: string
    teacher: string
    classroom: string
    startTime: string
    endTime: string
    orderNumber: number
}