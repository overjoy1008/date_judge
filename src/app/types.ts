export type Responsive = { width: number; responsive: number };

export enum Result {
  "SUCCESS" = 1,
  "ERROR" = 2,
}

export type ResultCode = {
  code: string;
  message: string;
};

export type ButtonProps = "single" | "double" | "mini";

export type InputFieldProps =
  | "text"
  | "textarea"
  | "file"
  | "select"
  | "add"
  | "hashtag"
  | "number";