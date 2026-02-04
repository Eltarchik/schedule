export interface Lesson {
    isAvailable: boolean
    subject: { name: string }
    teacher: { name: string }
    classroom: string
    slotNumber: number
    slotLength: number
}