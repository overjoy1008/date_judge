"use client"
import { InputFieldProps } from "@/app/types";
import "./input_field.css"
import { useEffect, useState } from "react";
import Button from "../button";

export default function InputField(
    { type, placeholder, title, required, toParent, value }:
        { type: InputFieldProps, placeholder?: string, title?: string, required: boolean, toParent?: (value: string | string[] | number) => void, value?: string }
) {
    // const [selectedWords, setSelectedWords] = useState<string[]>([])
    const [selectedWords, setSelectedWords] = useState<string>("")
    const [input, setInput] = useState<string>(value || "")
    const [selected, setSelected] = useState<number>(0)

    var userPrompt: string

    useEffect(() => {
        setInput(value || "")
    }, [])

    const handleAdd = () => {
        if (input === "") return
        // toParent && toParent([...selectedWords, input])
        // setSelectedWords([...selectedWords, input])
        setSelectedWords(input)
        userPrompt = input
        setInput("")
    }

    const handleChange = (e: any) => {
        if (type === "select") {
            if (toParent) toParent(e);
            setSelected(e);
        } else if (type === "file") {
            setInput(e.target.files[0].name);
            if (toParent) toParent(e.target.files[0]);
        } else {
            setInput(e.target.value);
            if (toParent) toParent(e.target.value);
        }
    }

    switch (type) {
        case "textarea":
            return (
                <textarea
                    className="input-large r16 gray-700"
                    placeholder={placeholder}
                    onChange={handleChange}
                    value={value || ""}
                />
            )
        case "file":
            return (
                <label htmlFor="file">
                    <div className="input-file">
                        {
                            input
                                ? <div className="r16 gray-700">{input}</div>
                                : <div className="b26 gray-700">클릭해서, 이미지나 PDF를 올려주세요!</div>
                        }
                        <input
                            id="file"
                            type="file"
                            style={{ display: "none" }}
                            className="input-large r16 gray-700"
                            onChange={handleChange}
                        />
                    </div>
                </label>
            )
        default:
            return (
                <>
                    <div>{selectedWords}</div>
                    <div className="flex">
                        <input
                            type="text"
                            className="input"
                            placeholder={placeholder}
                            onChange={handleChange}
                            value={input}
                        />
                        <Button type="mini" text="입력" onClick={handleAdd} />
                    </div>
                </>
            );
    }
}