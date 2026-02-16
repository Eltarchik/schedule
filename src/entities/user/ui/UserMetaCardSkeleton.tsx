import { TextSkeleton } from "@/shared/ui/text"


export const UserMetaCardSkeleton = () => {
    return <div className="flex items-center gap-5">
        <div className="flex min-w-20 size-20 rounded-full bg-island"/>

        <div className="flex flex-col gap-2 w-full">
            <TextSkeleton preset="hs" className="max-w-60 w-full" />
            <TextSkeleton preset="tm" className="w-25" />
        </div>
    </div>
}