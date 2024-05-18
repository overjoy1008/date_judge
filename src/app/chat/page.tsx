"use client"

import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import Button from "../../presentation/components/button";
import InputField from "@/presentation/components/input_field"
import OpenAIService from "@/data/service/open_ai_service";
// import { userPrompt } from "@/presentation/components/input_field/index"

export default function Home() {
    const router = useRouter()

    const [userPrompt, setUserPrompt] = useState("")
    const [chatList, setChatList] = useState<string[]>([])
    // const [input, setInput] = useState("")
    // const [json, setJson] = useState("")

    // const [response, setResponse] = useState("")

    const open_ai_service = new OpenAIService();

    var response: string

    // const llmResopnse = () => {
    //     res = await open_ai_service.getResponse(
    //         userPrompt,
    //         chatList
    //     );
    //     setResponse(res)
    // }

    const systemPrompt = "You are a judge. You will be given an explanation of a conflict from the couple.\n"
    + "Carefully analyze the explanation and reform it in a refined sentence.\n"
    + "Output format should be as following.\n"
    + "Case name: (a title summarizing the incident)\n"
    + "Summarization: (an explanation that will be passed to the opponent.)\n"
    + "Use Korean only. 한국어만 사용하세요.";


    // if (chatList.length < 1 || chatList == undefined){
    //     setChatList([systemPrompt])
    // }

    const llmResponse = (userPrompt: string) => {

        setChatList([...chatList, userPrompt])
        // setJson(JSON.stringify(chatList);


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


    // chatList.push({role: 'assistant', content: llmResponse})

    // chatList.push({role: 'assistant', content: llmResponse})


    return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="App">
            <header className="App-header">
                <div>
                    System Prompt:<br/>
                    { systemPrompt }
                    <br/><br/>
                    User Prompt:<br/>
                    { userPrompt }
                    <br/><br/><br/><br/>
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
                        toParent={(value: any) => setUserPrompt(value)}
                        required={false}
                        value={userPrompt}
                    />
                    <Button type="mini" text="입력" onClick={() => llmResponse(userPrompt)} />
                </div>
            </header>
        </div>
    </main>
    );
}
