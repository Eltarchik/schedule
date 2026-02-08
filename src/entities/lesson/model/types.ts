export interface Lesson {
    isAvailable: boolean
    subject: { name: string }
    teacher?: { name: string }
    groupName?: string
    classroom: string
    slotNumber: number
    slotLength: number
}