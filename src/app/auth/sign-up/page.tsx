"use client"

import SignUpCard2 from "@/app/components/SignUpCard2";

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SignUpPage = () => {
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
            <SignUpCard2 />
        </div>
    )
}

export default SignUpPage