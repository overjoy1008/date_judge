"use client"

import { useResponsive } from "@/presentation/hooks/useResponsive"
import "./header.css"
import { Device } from "@/app/types";
import Icon from "@/presentation/assets/image/icon";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "../button";

export default function Header(
    { onClick, type, state, color }: { onClick?: () => void, type: "default" | "progress" | "text" | "back" | "toHome", state?: 0 | 1 | 2 | 3 | 4 | 5, color: "white" | "gray" | "transparent" }
) {
    const responsive = useResponsive()
    const router = useRouter()

    switch (responsive.responsive) {
        case Device.desktop:
            return (
                <div className={`header-desktop header hf sbj ca header-${color}`}>
                    <Image
                        src={"https://firebasestorage.googleapis.com/v0/b/kairos-3326d.appspot.com/o/signiture.webp?alt=media&token=7aa5a7f5-643a-4d82-87a6-7d5546e99470"}
                        alt="logo"
                        width={127}
                        height={30}
                    />
                    {
                        type === "toHome" &&
                        <div>
                            <Button
                                type="main"
                                text="메인화면으로"
                                onClick={() => router.push("/")}
                            />
                        </div>
                    }
                </div>
            )

        default:
            return (
                <div className={`header-mobile header header-${color}`}>
                    <div className="hf gap40 w100 ca sbj">
                        <div className="hf gap20">
                            {
                                type !== "default" && <Icon type="back" onClick={onClick} />
                            }
                        </div>
                        <Image
                            src={"https://firebasestorage.googleapis.com/v0/b/kairos-3326d.appspot.com/o/logo.webp?alt=media&token=d35df359-3385-4d09-b738-09d3cbc7ce14"}
                            alt="logo"
                            width={28}
                            height={28}
                        />
                    </div>
                </div>
            )
    }
}