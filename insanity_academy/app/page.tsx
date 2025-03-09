"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const bgAudio = new Audio("/sounds/squid_game.wav");
    bgAudio.loop = true; // 🔁 반복 재생
    bgAudio.volume = 0.5; // 🔊 기본 볼륨 설정 (0.0 ~ 1.0)
    bgAudio.play().catch((error) => console.log("Autoplay failed:", error));

    setAudio(bgAudio);

    return () => {
      bgAudio.pause();
      bgAudio.currentTime = 0;
    };
  }, []);

  // 🔊 배경 음악 토글
  const toggleMusic = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white font-sans">
      {/* 背景画像 */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/logo.png"
          alt="Background Logo"
          fill
          className="object-contain opacity-30"
          priority
        />
      </div>

      {/* メインコンテンツ */}
      <main className="relative flex flex-col items-center justify-center flex-grow p-8 pb-20 gap-16 sm:p-20">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          Welcome to INSANITY ACADEMY
        </h1>

        {/* 🔊 배경 음악 컨트롤 버튼 */}
        <button
          onClick={toggleMusic}
          className="absolute top-5 right-5 bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg text-lg transition"
        >
          {isPlaying ? "🔊 Mute" : "🔇 Play"}
        </button>

        {/* ボタンコンテナ */}
        <div className="flex flex-col gap-6 w-full max-w-2xl">
          <Link href="/flashcards">
            <button className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-5 px-10 rounded-lg text-2xl transition">
              📖 Flashcards
            </button>
          </Link>

          <Link href="/quiz">
            <button className="w-full bg-red-800 hover:bg-red-900 text-white font-bold py-5 px-10 rounded-lg text-2xl transition">
              🧠 Quiz
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
