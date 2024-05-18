import CodeResponse from "@/app/code_response";
import { Result } from "@/app/types";
import OpenAI from "openai";

export default class OpenAIService {
  async getResponse(
    systemPrompt: string,
    userPrompt: string,
  ): Promise<CodeResponse> {
    const openai = new OpenAI({apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY, dangerouslyAllowBrowser: true});

    try {
      var response = await openai.chat.completions.create({  // const response = await openai.chat.completions.create
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
        });
      var answer = response.choices[0].message.content;
      
      return new CodeResponse(
        Result.SUCCESS,
        "성공적으로 quoteList를 받아왔습니다.",
        answer
      );
    } catch (error) {
      return new CodeResponse(
        Result.ERROR,
        "quoteList를 받아오는 과정에서 에러가 발생했습니다.",
        error
      );
    }
  }
}