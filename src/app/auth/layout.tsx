import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="h-full flex items-center justify-center bg-white">
            {children}
        </div>
    )
}

export default AuthLayout