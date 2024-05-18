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
          <div className="w100 flex">
          <Button
            type="double"
            text="공소제기"
            onClick={() => router.push("/chat")}
          />
          <Button
            type="double"
            text="지난 재판 기록"
            onClick={() => router.push("/history")}
          />
          </div>
        </header>
      </div>
    </main>
  );
}
