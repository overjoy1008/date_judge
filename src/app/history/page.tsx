"use client"

import { useRouter } from "next/navigation"
import Button from "../../presentation/components/button";

export default function Home() {
    const router = useRouter()
    // const [judgeList]

    // const judgeList = (value: string, index: number) => {
    //     const newQuestionList = questionList.map((question, i) => {
    //         if (i === index) {
    //             return {
    //                 ...question,
    //                 answer: value
    //             }
    //         }
    //         return question
    //     })
    // }

    return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="App">
            <header className="App-header">
                <div>
                    <Button
                        type="sub"
                        text="사건 번호 1"
                        onClick={() => router.push("/chat1")}
                    />
                    <Button
                        type="sub"
                        text="사건 번호 2"
                        onClick={() => router.push("/chat2")}
                    />
                    <Button
                        type="sub"
                        text="사건 번호 3"
                        onClick={() => router.push("/chat3")}
                    />
                </div>
            </header>
        </div>
    </main>
    );
}
