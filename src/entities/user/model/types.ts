export interface UserMeta {
    id: number
    name: string
    role: UserRole
    avatarURL: string
}

export enum UserRole {
    STUDENT, TEACHER, ADMIN
}