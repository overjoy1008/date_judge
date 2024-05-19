// import CodeResponse from "@/app/code_response";
import { useState } from "react"
// import { blank } from "@/app/data";
// import { Question, Result } from "@/app/types";
// import decideSystemPromptUseCase from "@/domain/use_case/decide_system_prompt_use_case";
import OpenAIService from "@/data/service/open_ai_service";
import GroqLlama3Service from "@/data/service/groq_llama3_service";
import GroqMixtralService from "@/data/service/groq_mixtral_service";

export default class ProceedJudgementUseCase {
  async indictment(
    userPromptFemale: string,
    chatObjectList: object[]
  ) {
    var newMessage = {
      message: userPromptFemale,
      side: 'right',
      avatar: "/user.png" // 사용자 프로필 이미지 경로
    }
    chatObjectList.push(newMessage)

    const open_ai_service = new OpenAIService();
    const groq_llama3_service = new GroqLlama3Service();
    const groq_mixtral_service = new GroqMixtralService();

    var systemPrompt = "";


    // 판결 1. 공소제기
    systemPrompt = "You are a judge. You will be given an explanation of a conflict from the couple.\n"
    +"Your task are as following.\n"
    +"Carefully analyze the explanation and reform it in a refined sentence.\n"
    +"Output format should be as following.\n"
    +"사건 이름: (a title summarizing the incident)\n"
    +"상황 설명: (a detailed summarization that will be passed to the opponent.)\n"
    +"Use Korean only. 한국어만 사용하세요"
    

    const indictment = await open_ai_service.getResponse(
        systemPrompt,
        userPromptFemale
    );
    const indictment2 = await groq_llama3_service.getResponse2(
      systemPrompt,
      userPromptFemale
    );
    const indictment3 = await groq_mixtral_service.getResponse3(
      systemPrompt,
      userPromptFemale
    );

  const indictmentString = indictment.payload;

    newMessage = {
      message: indictmentString,
      side: 'left',
      avatar: "/judge.png" // 사용자 프로필 이미지 경로
    }
    chatObjectList.push(newMessage)

    return chatObjectList;
  }

  async extractFact(
    userPromptMale: string,
    chatObjectList: object[]
  ) {
    var newMessage = {
      message: userPromptMale,
      side: 'right',
      avatar: "/user.png" // 사용자 프로필 이미지 경로
    }
    chatObjectList.push(newMessage)

    const userPrompt = `여자 입장: ${chatObjectList[0].message}남자 입장: ${userPromptMale}`

    const open_ai_service = new OpenAIService();
    const groq_llama3_service = new GroqLlama3Service();
    const groq_mixtral_service = new GroqMixtralService();


    var systemPrompt = "";

    // 판결 2. 팩트 체크
    systemPrompt = "You are a judge. You will be given an explanation of a conflict from the couple.\n"
    +"Your task are as following.\n"
    +"Carefully examine the difference between the two explanations.\n"
    +"Use Korean only. 한국어만 사용하세요."
    

    const factCheck = await open_ai_service.getResponse(
      systemPrompt,
      userPrompt
    );
    const factCheck2 = await groq_llama3_service.getResponse2(
      systemPrompt,
      userPrompt
    );
    const factCheck3 = await groq_mixtral_service.getResponse3(
      systemPrompt,
      userPrompt
    );

    const factCheckString = factCheck.payload;
    
    newMessage = {
      message: factCheckString,
      side: 'left',
      avatar: "/judge.png" // 사용자 프로필 이미지 경로
    }
    chatObjectList.push(newMessage)


  // ------------------------------------------  
  //   return chatObjectList;
  // }

  // async summarizeAndJudgement(
  //   userPrompt: string,
  //   isFact: boolean,
  //   factCheck: string,
  //   userFactCheck: string,
  //   chatObjectList: object[]
  // ) {
  //   var newMessage = {
  //     message: userFactCheck,
  //     side: 'right',
  //     avatar: "/user.png" // 사용자 프로필 이미지 경로
  //   }
  //   chatObjectList.push(newMessage)
  // -------------------------------------------


    //const userPrompt = `여자 입장: ${userPromptFemale}남자 입장: ${userPromptMale}`;

    
    //const decide_system_prompt_use_case = new decideSystemPromptUseCase();

    // if (!isFact) {
    //   // 판결 2 -- 재판결
    //   const factCheck2 = await open_ai_service.getResponse(
    //     factCheck1,
    //     userFactCheck
    //   );
    //   const factCheck2String = factCheck2.payload;
      
    //   newMessage = {
    //     message: factCheck2String,
    //     side: 'left',
    //     avatar: "/judge.png" // 사용자 프로필 이미지 경로
    //   }
    //   chatObjectList.push(newMessage)
    // }
    // else {
    //   const factCheck2 = factCheck1;
    // }


    // 판결 3. 요약
    systemPrompt = "You are a judge. You will be given a summarization of a conflict from the couple.\n"
      +"Your task are as following.\n"
      +"Summarize the situation. 두 사람의 입장을 모두 이해하고, 중립적으로 상황을 자세히 요약해보세요.\n"
      +"Use Korean only. 한국어만 사용하세요."
    

    const summary = await open_ai_service.getResponse(
      systemPrompt,
      `상황 설명: ${userPrompt} + fact check: ${factCheckString}`
    );
    const summary2 = await groq_llama3_service.getResponse2(
      systemPrompt,
      `상황 설명: ${userPrompt} + fact check: ${factCheckString}`
    );
    const summary3 = await groq_mixtral_service.getResponse3(
      systemPrompt,
      `상황 설명: ${userPrompt} + fact check: ${factCheckString}`
    );

    const summaryString = summary.payload;
    newMessage = {
      message: summaryString,
      side: 'left',
      avatar: "/judge.png" // 사용자 프로필 이미지 경로
    }
    chatObjectList.push(newMessage)


    // 판결 4. 본 판결

    systemPrompt = "You are a judge. You will be given two explanations of a conflict from the couple.\n"
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
      +"Use Korean only. 한국어만 사용하세요. Answer as if you are elon musk."
  
    const judgement = await open_ai_service.getResponse(
      systemPrompt,
      summaryString
    );
    const judgement2 = await groq_llama3_service.getResponse2(
      systemPrompt,
      summaryString
    );
    const judgement3 = await groq_mixtral_service.getResponse3(
      systemPrompt,
      summaryString
    );

    const judgementString = judgement.payload;

    newMessage = {
      message: judgementString,
      side: 'left',
      avatar: "/judge.png" // 사용자 프로필 이미지 경로
    }
    chatObjectList.push(newMessage)
    return chatObjectList;
  }

  async rejudgement(
    judgement: string,
    userAppeal: string,
    chatObjectList: object[]
  ) {
    var newMessage = {
      message: userAppeal,
      side: 'right',
      avatar: "/user.png" // 사용자 프로필 이미지 경로
    }
    chatObjectList.push(newMessage)
    

    const open_ai_service = new OpenAIService();
    const groq_llama3_service = new GroqLlama3Service();
    const groq_mixtral_service = new GroqMixtralService();

    
    //const decide_system_prompt_use_case = new decideSystemPromptUseCase();

    var systemPrompt = "";
    var appealCount = 0;


    // 상고

    systemPrompt = "You are a judge. You will be given two explanations of a conflict from the couple.\n"
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
      +"Use Korean only. 한국어만 사용하세요. Answer as if you are elon musk."


    const reJudgement = await open_ai_service.getResponse(
      systemPrompt,
      judgement + `항변: ${userAppeal}`
    );
    const reJudgement2 = await groq_llama3_service.getResponse2(
      systemPrompt,
      judgement + `항변: ${userAppeal}`
    );
    const reJudgement3 = await groq_mixtral_service.getResponse3(
      systemPrompt,
      judgement + `항변: ${userAppeal}`
    );


    const reJudgementString = reJudgement.payload;
    newMessage = {
      message: reJudgementString,
      side: 'left',
      avatar: "/judge.png" // 사용자 프로필 이미지 경로
    }
    chatObjectList.push(newMessage)

    appealCount += 1;

    return chatObjectList;
  }
}