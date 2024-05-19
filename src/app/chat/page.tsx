"use client"

import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import Button from "../../presentation/components/button";
import InputField from "@/presentation/components/input_field";
import ProceedJudgementUseCase from "@/domain/use_case/proceed_judgement_use_case";
import { StyledString } from "next/dist/build/swc";
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

    const addMessage = (message: StyledString) => {
    const side = chatList.length % 2 === 0 ? "left" : "right";
    const avatarPath = side === "left" ? "/judge.png" : "/user.png"; // 왼쪽과 오른쪽에 따른 이미지 경로 설정

    const newMessage = {
        message: message,
        side: side,
        avatar: avatarPath // 사용자 프로필 이미지 경로
    };
    setChatList([...chatList, newMessage]);
    //setUserPrompt(""); // 입력 필드 클리어
    };


    const userClick = (input: string) => {
        addMessage(input)
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
                    <ul className="chat-container">
                        {chatList.map((item, index) => (
                        <div key={index} className={`message-container ${item.side}`}>
                            <img src={item.avatar} alt={`${item.username}'s avatar`} className="avatar" />
                            <li key={index} className={`chat-item ${item.side}`}>
                                <div>
                                    <strong>{item.username}</strong> {item.message}
                                </div>
                            </li>
                        </div>
                        ))}
                    </ul>
                    <br/><br/>
                        
                </div>
                <div className="input-container">
                    <textarea
                        className="input-field"
                        placeholder="상황을 입력하세요."
                        onChange={(e) => setInput(e.target.value)}
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
