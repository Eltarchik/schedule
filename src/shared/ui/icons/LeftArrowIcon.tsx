import { defaultIconProps, IconProps } from "@/shared/config/icons"


export const LeftArrowIcon = ({
    size = defaultIconProps.size,
    color = defaultIconProps.color,

}: IconProps) => {
    return <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.0001 12L6 8.00002L10 4" stroke={color} strokeWidth="1.4" strokeLinecap="round"
              strokeLinejoin="round"/>
    </svg>
}