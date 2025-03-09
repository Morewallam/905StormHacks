"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// const flashcards = [
//   { question: "What is the capital of France?", answer: "Paris" },
//   { question: "What is 2 + 2?", answer: "4" },
//   { question: "Who wrote 'Hamlet'?", answer: "William Shakespeare" },
//   { question: "What is the speed of light?", answer: "299,792,458 m/s" },
// ];

export default function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [flashcards, setData] = useState([{front: "", back:""}]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch('http://127.0.0.1:8000/cards',{
          headers:{
            "Access-Control-Allow-Origin": "*"
          }}
        ); // URL for your GET request
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();

        setData(result);
        setLoading(false);
    };

    fetchData();
  }, []);

  const nextCard = () => {
    setShowAnswer(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const goBack = () => {
    setShowAnswer(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };
  
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white font-sans">
      {/* 背景ロゴ画像（透明度調整付き） */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/logo.png"
          alt="Background Logo"
          fill
          className="object-contain opacity-30" // 🔥 透明度調整 (0.0 - 1.0)
          priority
        />
      </div>

      {/* メインコンテンツ（ボタンを前面に配置） */}
      <main className="relative flex flex-col items-center justify-center flex-grow p-8 pb-20 gap-16 sm:p-20">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          Welcome to INSANITY ACADEMY
        </h1>

        {/* フラッシュカード */}
        <div className="relative mt-6 w-[450px] h-72 bg-gray-800 text-white p-8 rounded-xl border-4 border-red-500 shadow-xl flex flex-col items-center justify-center">
          <p className="text-3xl font-bold text-center">
            {!loading && showAnswer ? flashcards[currentIndex].front : flashcards[currentIndex].back}
          </p>
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="absolute bottom-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition"
          >
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </button>
        </div>

        {/* 「Go Back」＆「Next Card」ボタン */}
        <div className="mt-4 flex flex-row gap-4">
          {currentIndex > 0 && (
            <button
              onClick={goBack}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition"
            >
              ← Go Back
            </button>
          )}
          <button
            onClick={nextCard}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition"
          >
            Next Card →
          </button>
        </div>

        {/* ホームに戻るボタン */}
        <Link href="/">
          <button className="mt-6 bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg text-lg transition">
            🔙 Go Home
          </button>
        </Link>
      </main>
    </div>
  );
}
