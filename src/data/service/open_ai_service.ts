import CodeResponse from "@/app/code_response";
import { Result } from "@/app/types";
import { Console } from "console";
import OpenAI from "openai";

export default class OpenAIService {
  async getResponse(
    userPrompt: string,
    chatList: object[],
  ): Promise<CodeResponse> {
    const openai = new OpenAI({apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY, dangerouslyAllowBrowser: true});
    const systemPrompt = "You are a judge. You will be given an explanation of a conflict from the couple.\n"
    + "Carefully analyze the explanation and reform it in a refined sentence.\n"
    + "Output format should be as following.\n"
    + "Case name: (a title summarizing the incident)\n"
    + "Summarization: (an explanation that will be passed to the opponent.)\n"
    + "Use Korean only. 한국어만 사용하세요.";

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


  async getQuestion(
    quoteList: string[],
    exclusion: string,
    inclusion: string
  ): Promise<CodeResponse> {
    const keywordList: string[] = [];
    var found: boolean = false;
    const openai = new OpenAI({apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY, dangerouslyAllowBrowser: true});
    
    const keywordSystemPrompt = "You are an expert teacher who extracts keywords or keyphrases from given sentences. User will require you to quote sentences from a raw text."
    +"\n\n- Whenever the text contains \' or \", convert them into \\\' or \\\"\n- KEEP Capital letters\n- AVOID 조사 such as: \"은, 는, 이, 가, 을, 를\"\n- AVOID two or more words.\n- Do NOT change language of the original text.\nYour output must be a single word."
    +"\n\n###For Example###"
    +"If quote is:  \"The \\“medial prefrontal cortex,\\” a neuron path located in the cleft between your brain hemispheres just behind your eyes, seemingly helps stitch together your sense of self.\""
    +"Your response must be: \"medial prefrontal cortex\""
    +"\n\n###For Example###"
    +"If quote is:  \"The elements of your self-concept, the specific beliefs by which you define yourself, are your self-schemas\""
    +"Your response must be: \"self-concept\""
    +"\n\n###For Example###"
    +"If quote is:  \"Schemas are mental templates by which we organize our worlds.\""
    +"Your response must be: \"Schemas\""

    var getKeywordPrompt: string = "";

    try {
      var response, answer;
      var inclusionList: string[] = [];
      if (inclusion != "") {inclusionList = inclusion.split(", ");}

      for (let i = 0; i < quoteList.length; i++) {
        found = false;
        getKeywordPrompt = `Get the single most important keyword from the following sentence: "${quoteList[i]}"\n\nAVOID the following words: ${exclusion}.`;
        if (inclusion != "") {for (let j = 0; j < inclusionList.length; j++) {
          if (quoteList[i].includes(inclusionList[j])) {
            keywordList.push(inclusionList[j]);
            exclusion += ", " + inclusionList[j];
            found = true;
            break;
          }
        }}
        if (found === false) {
          response = await openai.chat.completions.create({  // const response = await openai.chat.completions.create
            model: 'gpt-4o',
            messages: [
              { role: 'system', content: keywordSystemPrompt },
              { role: 'user', content: getKeywordPrompt },
            ],
          });
          answer = response.choices[0].message.content;
          if (answer) {
            keywordList.push(answer);
            exclusion += ", " + answer;
          }
          else keywordList.push("NULL");
        }
      }

      return new CodeResponse(
        Result.SUCCESS,
        "성공적으로 keywordList를 받아왔습니다.",
        JSON.stringify(keywordList)
      );
    } catch (error) {
      return new CodeResponse(
        Result.ERROR,
        "keywordList를 받아오는 과정에서 에러가 발생했습니다.",
        error
      );
    }
  }
}