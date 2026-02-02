import { Routes } from "@/shared/config/routes"
import { Album, Calendar, LucideProps, UserRound } from "lucide-react"
import React, { RefAttributes } from "react"

interface BurgerMenuItem {
    title: string
    href: string
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}

export const burgerMenuItems: BurgerMenuItem[] = [
    {
        title: "Расписание",
        href: Routes.HOME,
        icon: Album,
    },
    {
        title: "Календарь",
        href: Routes.CALENDAR,
        icon: Calendar,
    },
    {
        title: "Профиль",
        href: Routes.PROFILE,
        icon: UserRound,
    },
]