"use client"

import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import Button from "../../presentation/components/button";
import InputField from "@/presentation/components/input_field"
import OpenAIService from "@/data/service/open_ai_service";
// import { userPrompt } from "@/presentation/components/input_field/index"

export default function Home() {
    const router = useRouter()

    var userPrompt = "This is a test"

    const [rawText, setRawText] = useState("")
    const [chatList, setChatList] = useState<object[]>([])

    // const open_ai_service = new OpenAIService();

    // const llmResponse = await open_ai_service.getResponse(
    //     userPrompt,
    //     chatList
    // );

    // chatList.push({role: 'assistant', content: llmResponse})


    return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="App">
            <header className="App-header">
                <div>
                    { userPrompt }
                    hello
                </div>
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
