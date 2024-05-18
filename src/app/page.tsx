"use client"

import { useRouter } from "next/navigation";
import Button from "../presentation/components/button";
import "@/app/globals.css"
import { useEffect, useState } from "react";


export default function Home() {
  const router = useRouter()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className="App">
        <header className="App-header">
          <div className="title">
            연애심판
          </div>
          <div className="description">
            <p>내가 심판해주마,<br/>누가 잘못인지.</p>
            <div className="center-image">
              <img src="/balance.png" alt="이미지" className="image-size"/>
            </div>
          </div>
          <div className="w100 flex">
          <Button
            type="double2"
            text="지난 재판 보기"
            onClick={() => router.push("/history")}
          />
          <Button
            type="double"
            text="공소 제기"
            onClick={() => router.push("/chat")}
          />
          </div>
        </header>
      </div>
    </main>
  );
}
