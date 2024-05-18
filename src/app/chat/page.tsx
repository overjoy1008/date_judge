"use client"

import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import Button from "../../presentation/components/button";
import InputField from "@/presentation/components/input_field"

export default function Home() {
    const router = useRouter()

    const [rawText, setRawText] = useState("")

    return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="App">
            <header className="App-header">
                <div className="w500">
                    <InputField
                        type="add"
                        placeholder="상황을 입력하세요..."
                        toParent={(value: any) => setRawText(value)}
                        required={false}
                        value={rawText}
                    />
                </div>
            </header>
        </div>
    </main>
    );
}
