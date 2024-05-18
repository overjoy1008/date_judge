import CodeResponse from "@/app/code_response";
import { useState } from "react"
// import { blank } from "@/app/data";
// import { Question, Result } from "@/app/types";

export default class DecideSystemPromptUseCase {
  async decideSwitch(index: number) {
    const [systemPrompt, setSystemPrompt] = useState("")

    switch (index) {
        case 1:
            setSystemPrompt(
                "You are a judge. You will be given an explanation of a conflict from the couple.\n"
                + "Carefully analyze the explanation and reform it in a refined sentence.\n"
                + "Output format should be as following.\n"
                + "Case name: (a title summarizing the incident)\n"
                + "Summarization: (an explanation that will be passed to the opponent.)\n"
                + "Use Korean only. 한국어만 사용하세요"
            )
            break;
        case 2:
            setSystemPrompt(
                "You are a judge. You will be given a summarization of a conflict from the couple.\n"
                +"Your task are as following.\n"
                +"Carefully examine the difference between the two explanations."
                +"If there is a difference between the two explanation, ask the user about it and verify it."
                +"If there is not a difference between the two explanation, say 설명이 일치합니다.\n"
                +"Use Korean only. 한국어만 사용하세요."
            )
            break;
        case 3:
            setSystemPrompt(
                "You are a judge. You will be given a summarization of a conflict from the couple.\n"
                +"Your task are as following.\n"
                +"Summarize the situation. 두 사람의 입장을 모두 이해하고, 중립적으로 상황을 자세히 요약해보세요.\n"
                +"Use Korean only. 한국어만 사용하세요."
            )
            break;
        default:
            setSystemPrompt(
                "You are a judge. You will be given two explanations of a conflict from the couple.\n"
                +"Your task are as following.\n"
                +"Make a verdict. 항상 한쪽이 잘못입니다.\n"
                +"If one side rebuts, add a ruling for that rebuttal.\n"
                +"한국 연애 예절\n"
                +"연인이 있다면 이성인 친구와의 관계에서는 조심해야한다.\n"
                +"상대가 기념일을 중요하게 여기는 경우에는 최대한 챙기도록 노력하는 것이 일반적인 예의이다.\n"
                +"서로의 일상에 대해서는 최대한 공유해야한다.\n떳떳하다면 비밀을 만들지 마라\n"
                +"일정을 계획할 때는, 애인과의 일정을 우선시해서 계획할 것.\n"
                +"전연인과의 관계는 애인이 불편하다면, 정리해야 한다.\n"
                +"연인과의 사생활은 외부로 유출하지 않는다.\n"
                +"연락과 문자의 마무리는 종결하자는 이야기가 나왔을 때 끝낸다.\n"
                +"상대방이 나를 위해 노력을 해주었을 경우에는, 최선을 다해서 반응을 해준다.\n"
                +"커플이 함께하기로 공유한 아이템은 서로 별다른 논의가 없었을 경우, 상대방을 최대한 배려하며 착용한다.\n"
                +"연인과 데이트 중에는, 연인과의 시간을 우선시한다.\n"
                +"User input are as following.\n"
                +"Male explanation:\n"
                +"Female explanation:\n"
                +"Output format should be as following.\n"
                +"Case Name: (a title summarizing the incident)"
                +"남자 입장에서 상황 이해: (your summarization of male explanation)"
                +"여자 입장에서 상황 이해: (your summarization of female explanation)"
                +"Judgement: (whose fault is it? show the percentage) "
                +"Reasoning: (Your reasoning should be based on 한국 연애 예절. 양쪽의 입장에서 몰입해서 정당한 이유를 들어 보세요.)\n"
                +"Use Korean only. 한국어만 사용하세요. 장난스러운 어투로 대답하세요."
            )
    }
    return systemPrompt;
  }
}

//   async createQuestion(
//     quoteList: string[],
//     exclusion: string,
//     inclusion: string
//   ): Promise<CodeResponse> {
//     const open_ai_service = new OpenAIService();

//     const finalQuestionList: Question[] = [];

//     const getKeywordsResponse = await open_ai_service.getQuestion(
//       quoteList,
//       exclusion,
//       inclusion
//     );

//     const keywordList = JSON.parse(getKeywordsResponse.payload);
//     if (getKeywordsResponse.result === Result.SUCCESS) {
//       for (let i = 0; i < quoteList.length; i++) {
//         finalQuestionList.push({
//           answer: "",
//           createdAt: new Date(),
//           quote: quoteList[i],
//           keyword: keywordList[i],
//           question: quoteList[i].replace(keywordList[i], blank),
//           hashtag: "",
//         });
//       }

//       return new CodeResponse(
//         getKeywordsResponse.result,
//         getKeywordsResponse.errorCode,
//         finalQuestionList
//       );
//     } else {
//       return new CodeResponse(
//         getKeywordsResponse.result,
//         getKeywordsResponse.errorCode,
//         {}
//       );
//     }
//   }
// }