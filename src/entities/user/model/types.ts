export interface UserMeta {
    id: string
    name: string
    role: UserRole
    avatarURL: string
}

export enum UserRole {
    STUDENT, TEACHER, ADMIN
}