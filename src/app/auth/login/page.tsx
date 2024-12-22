"use client"

import SignUpComponent from "@/components/SignUpCard"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {
    const { data: session } = useSession();
    const router = useRouter();

    // Use useEffect to handle the redirect
    useEffect(() => {
        if (session) {
            router.push("/");
        }
    }, [session, router]);

    return (
        <div>
            <SignUpComponent />
        </div>
    )
}

export default LoginPage