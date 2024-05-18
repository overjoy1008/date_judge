"use client"

import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import Button from "../../presentation/components/button";
import InputField from "@/presentation/components/input_field";
import ProceedJudgementUseCase from "@/domain/use_case/proceed_judgement_use_case";
// import { userPrompt } from "@/presentation/components/input_field/index"

export default function Home() {
    const router = useRouter()

    const [input, setInput] = useState("")
    const [userPromptFemale, setUserPromptFemale] = useState("")
    const [userPromptMale, setUserPromptMale] = useState("")
    var [chatList, setChatList] = useState<string[]>([])
    // const [response, setResponse] = useState("")
    const [functionCount, setFunctionCount] = useState(0);
    const [isFact, setFact] = useState(false);


    const userClick = (userPrompt: string) => {
        switch (functionCount) {
            case 0:
                setUserPromptFemale(input)
                chatList.push(input)
                setFunctionCount(1)
                break;
            case 1:
                setUserPromptMale(input)
                chatList.push(input)
                firstResponse()
                break;
            case 2:
                setUserPromptMale(input)
                chatList.push(input)
                secondResponse(input)
            default:
                setUserPromptMale(input)
                chatList.push(input)
                thirdResponse(input)
        }
        //chatList.push({role: 'user', content: userPrompt})
    }

    const firstResponse = async () => {
        const proceed_judgement_use_case = new ProceedJudgementUseCase();
        const newList = await proceed_judgement_use_case.indictmentAndFact(
            userPromptFemale,
            userPromptMale,
            chatList
        );
        setChatList(newList);
        setFunctionCount(2);
        //setChatList([...chatList, {role: 'user', content: response.payload}])
    }

    const secondResponse = async (userFactCheck: string) => {
        if (chatList[-1].includes('설명이 일치합니다')) {
            setFact(true);
        } else {
            setFact(false);
        }
        const proceed_judgement_use_case = new ProceedJudgementUseCase();
        const newList = await proceed_judgement_use_case.summarizeAndJudgement(
            `여자 입장: ${userPromptFemale}남자 입장: ${userPromptMale}`,
            isFact,
            chatList[-1],
            userFactCheck,
            chatList
        );
        setChatList(newList);
        setFunctionCount(3);
    }

    const thirdResponse = async (userAppeal: string) => {
        const proceed_judgement_use_case = new ProceedJudgementUseCase();
        const newList = await proceed_judgement_use_case.rejudgement(
            chatList[-1],
            userAppeal,
            chatList
        );
        setChatList(newList);
        setFunctionCount(functionCount + 1);
    }



    // const llmResponse = (userPrompt: string) => {
    //     response = await openai.chat.completions.create({
    //         model: 'gpt-3.5-turbo',
    //         messages: [
    //           { role: 'system', content: systemPrompt },
    //           { role: 'user', content: userPrompt },
    //         ],
    //       });
    //       answer = response.choices[0].message.content;
    // }


    return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="App">
            <header className="App-header">
                <div>
                    <ul>
                        {chatList.map((item, index) => (
                        <li key={index}>{item}</li>
                        ))}
                    </ul>
                    <br/><br/>
                        
                </div>
                <div className="w100">
                    <InputField
                        type="add"
                        placeholder="상황을 입력하세요..."
                        toParent={(value: any) => setInput(value)}
                        required={false}
                        value={input}
                    />
                    <Button type="mini" text="입력" onClick={() => userClick(input)} />
                </div>
            </header>
        </div>
    </main>
    );
}
