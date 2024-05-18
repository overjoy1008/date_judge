import { ButtonProps } from "@/app/types"
import "./button.css"
// import "@/presentation/assets/style/Global.css"

export default function Button(
    { type, text, onClick }:
                { type: ButtonProps, text: string, onClick?: () => void, icon?: JSX.Element, disabled?: boolean}
) {
    return (
        <button className={`btn-${type}`} onClick={onClick}>
            <div>{text}</div>
        </button>
    )
}