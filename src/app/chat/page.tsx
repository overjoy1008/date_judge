"use client"

import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import Button from "../../presentation/components/button";
import Gauge from "../../presentation/components/gauge";
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
    var [chatObjectList, setChatObjectList] = useState<object[]>([])
    // const [response, setResponse] = useState("")
    const [functionCount, setFunctionCount] = useState(0);
    const [finalOpinion, setFinalOpinion] = useState("");

    const addMessage = (input: string, side: string) => {
        const avatarPath = side === "left" ? "/judge.png" : "/user.png"; // 왼쪽과 오른쪽에 따른 이미지 경로 설정

        const newMessage = {
            message: input,
            side: side,
            avatar: avatarPath // 사용자 프로필 이미지 경로
        };
        setChatObjectList([...chatObjectList, newMessage]);
        //setUserPrompt(""); // 입력 필드 클리어
    };


    const userClick = (input: string) => {
        // chatList.push(input)
        switch (functionCount) {
            case 0:
                // setUserPromptFemale(input)
                firstResponse(input)
                setFunctionCount(1)
                console.log('Female')
                break;
            case 1:
                // setUserPromptMale(input)
                secondResponse(input)
                console.log('Male')
                break;
            // case 2:
            //     setUserPromptMale(input)
                
            //     thirdResponse(input)
            //     console.log('공소제기, 팩트')
            default:
                setUserPromptMale(input)
                
                thirdResponse(input)
        }
        //chatList.push({role: 'user', content: userPrompt})
    }

    const firstResponse = async (userPromptFemale: string) => {
        const proceed_judgement_use_case = new ProceedJudgementUseCase();
        const newList = await proceed_judgement_use_case.indictment(
            userPromptFemale,
            chatObjectList
        );
        setChatObjectList(newList);
        setFunctionCount(1);
        //setChatList([...chatList, {role: 'user', content: response.payload}])
    }

    const secondResponse = async (userPromptMale: string) => {
        const proceed_judgement_use_case = new ProceedJudgementUseCase();
        const newList = await proceed_judgement_use_case.extractFact(
            userPromptMale,
            chatObjectList
        );
        setChatObjectList(newList);
        setFunctionCount(2);
        setFinalOpinion(chatObjectList[chatObjectList.length - 1].message);
        addMessage('추가적으로 항변할 내용이 있으십니까?', 'left')
        //setChatList([...chatList, {role: 'user', content: response.payload}])
    }

    // const thirdResponse = async (userFactCheck: string) => {
    //     // if (chatObjectList[-1].includes('설명이 일치합니다')) {
    //     //     setFact(true);
    //     // } else {
    //     //     setFact(false);
    //     // }
    //     setFact(false); // 일단 버그 고치기 위해서 추가해놓음... 나중에 지울 예정
        
    //     const proceed_judgement_use_case = new ProceedJudgementUseCase();
    //     const newList = await proceed_judgement_use_case.summarizeAndJudgement(
    //         `여자 입장: ${chatObjectList[0].message}남자 입장: ${chatObjectList[2].message}`,
    //         isFact,
    //         chatObjectList[chatObjectList.length - 1].message,
    //         userFactCheck,
    //         chatObjectList
    //     );
    //     setChatObjectList(newList);
    //     setFunctionCount(3);
    // }

    const thirdResponse = async (userAppeal: string) => {
        if (functionCount <= 3) {
            const proceed_judgement_use_case = new ProceedJudgementUseCase();
            const newList = await proceed_judgement_use_case.rejudgement(
                chatObjectList[chatObjectList.length - 1].message,
                userAppeal,
                chatObjectList,
                finalOpinion
            );
            setChatObjectList(newList);
            setFunctionCount(functionCount + 1);
            setFinalOpinion(chatObjectList[chatObjectList.length - 1].message);
        }
        else {
            var finalAppeal = {
                message: userAppeal,
                side: 'right',
                avatar: "/user.png" // 사용자 프로필 이미지 경로
              }
              chatObjectList.push(finalAppeal)
            var finalMessage = {
                message: "재판은 모두 끝났습니다. 이제는 서로 화해할 시간~! 😻",
                side: 'left',
                avatar: "/judge.png" // 사용자 프로필 이미지 경로
            }
            chatObjectList.push(finalMessage);
            setFunctionCount(0);
        }
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
                        {chatObjectList.map((item, index) => (
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
                    <Button type="mini" text="입력" onClick={() => {
                        //addMessage(input, 'right')
                        userClick(input)
                    }} />
                </div>
            </header>
        </div>
    </main>
    );
}
