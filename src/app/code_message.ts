import { ResultCode } from "@/app/types";

const CodeMessage: ResultCode[] = [
  {
    code: "DATA_QR_UPLOAD_SUCCESS",
    message: "Quote를 데이터베이스에 업로드하는데 성공했습니다.",
  },
  {
    code: "DATA_QR_UPLOAD_FAIL",
    message: "Quote를 데이터베이스에 업로드하는데 실패했습니다.",
  },
  {
    code: "DATA_QR_READ_SUCCESS",
    message: "데이터베이스에서 Quote를 불러오는데 성공했습니다.",
  },
  {
    code: "DATA_QR_READ_FAIL",
    message: "데이터베이스에서 Quote를 불러오는데 실패했습니다.",
  },
  {
    code: "DATA_CONV_SUCCESS",
    message: "파일을 텍스트로 변환하는데 성공했습니다.",
  },
  {
    code: "DATA_CONV_FAIL",
    message: "파일을 텍스트로 변환하는데 실패했습니다.",
  },
  {
    code: "DATA_KEY_PHRASES_SUCCESS",
    message: "Key Phrases를 가져오는데 성공했습니다.",
  },
  {
    code: "DATA_KEY_PHRASES_FAIL",
    message: "Key Phrases를 가져오는데 실패했습니다.",
  },
  {
    code: "DATA_QUESTION_SUCCESS",
    message: "Question을 가져오는데 성공했습니다.",
  },
  {
    code: "DATA_QUESTION_FAIL",
    message: "Question을 가져오는데 실패했습니다.",
  },
  {
    code: "DOMAIN_QUOTE_UPLOAD_SUCCESS",
    message: "Question을 데이터베이스에 업로드하는데 성공했습니다.",
  },
  {
    code: "DOMAIN_QUOTE_UPLOAD_FAIL",
    message: "Question을 데이터베이스에 업로드하는데 실패했습니다.",
  }
];

export default CodeMessage;
