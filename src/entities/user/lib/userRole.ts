import { UserRole } from "@/entities/user/model/types"

// todo add naming variation for different organisation types

export const userRolesToString = (roles: UserRole[]) => {
    if (roles.includes(UserRole.ADMIN)) return "Администратор"
    if (roles.includes(UserRole.TEACHER)) return "Учитель"
    if (roles.includes(UserRole.STUDENT)) return "Студент"
}