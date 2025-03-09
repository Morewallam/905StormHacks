"use client";

import { useState } from "react";
import Link from "next/link";

const flashcards = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "What is 2 + 2?", answer: "4" },
  { question: "Who wrote 'Hamlet'?", answer: "William Shakespeare" },
  { question: "What is the speed of light?", answer: "299,792,458 m/s" },
];

export default function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const nextCard = () => {
    setShowAnswer(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const goBack = () => {
    setShowAnswer(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl sm:text-4xl font-bold">📖 Flashcards</h1>
      <p className="mt-4 text-lg">Check Flashcards here</p>

      {/* フラッシュカード表示（赤枠追加） */}
      <div className="relative mt-6 w-[450px] h-72 bg-gray-800 text-white p-8 rounded-xl border-4 border-red-500 shadow-xl flex flex-col items-center justify-center">
        <p className="text-3xl font-bold text-center">
          {showAnswer ? flashcards[currentIndex].answer : flashcards[currentIndex].question}
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

      {/* トップページに戻るボタン */}
      <Link href="/">
        <button className="mt-6 bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg text-lg transition">
          🔙 Go Home
        </button>
      </Link>
    </div>
  );
}
