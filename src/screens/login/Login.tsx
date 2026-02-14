import { Heading } from "@/shared/ui/text"
import { LoginForm } from "@/widgets/login-form/ui/LoginForm"


export const Login = () => {
    return <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 size-full">
        {/* todo add art */}
        <div className="hidden lg:flex rounded-2xl bg-island"/>
        <div className="flex flex-col gap-14 md:px-40 lg:px-25 2xl:px-40 pt-40">
            <Heading size="large">Вход в аккаунт</Heading>
            <LoginForm />
        </div>
    </div>
}