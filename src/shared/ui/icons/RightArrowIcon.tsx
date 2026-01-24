import { defaultIconProps, IconProps } from "@/shared/config/icons"


export const RightArrowIcon = ({
    size = defaultIconProps.size,
    color = defaultIconProps.color,

}: IconProps) => {
    return <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.99994 12L10 8.00002L5.99997 4" stroke={color} strokeWidth="1.4" strokeLinecap="round"
              strokeLinejoin="round"/>
    </svg>

}