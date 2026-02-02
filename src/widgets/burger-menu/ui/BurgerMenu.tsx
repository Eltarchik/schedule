import { Menu } from "lucide-react"
import { burgerMenuItems } from "@/widgets/burger-menu/lib/burgerMenu.config"
import Link from "next/link"
import { useOverlayShowControl } from "@/shared/lib/hooks/useOverlayShowControl"
import { Text } from "@/shared/ui/text"
import { usePathname } from "next/navigation"

interface Props {
    className?: string
}

export const BurgerMenu = (
    { className }: Props
) => {
    const [ opened, setOpen, ref ] = useOverlayShowControl()
    const pathname = usePathname()

    return <div className={`relative flex flex-col ${className}`} ref={ref}>
        <button className="flex size-10 justify-center items-center"
                onClick={() => setOpen(!opened)}
        >
            <Menu />
        </button>

        {opened &&
            <nav className="absolute z-20 flex flex-col p-2 top-full right-0 translate-y-2
                        rounded-xl shadow-space/40 shadow-xl bg-island"
            >
                { burgerMenuItems.map(item => {
                    const bgColor = pathname === item.href ? "bg-accent" : ""

                    return <Link className={`flex items-center gap-2 px-3 w-full h-12 rounded-lg ${bgColor}`}
                          key={item.title}
                          href={item.href}
                    >
                        <item.icon/>
                        <Text small bold>{item.title}</Text>
                    </Link>
                })}
            </nav>
        }
    </div>
}