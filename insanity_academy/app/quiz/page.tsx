"use client"; // クライアントコンポーネントとして動作

import { useState } from "react";
import Link from "next/link";

export default function Quiz() {
  // クイズの問題と正解
  const question = "What is 1 + 1 ?";
  const correctAnswer = "2";

  // 状態管理
  const [userAnswer, setUserAnswer] = useState(""); // 入力値
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null); // 正誤判定
  const [correctCount, setCorrectCount] = useState(0); // 正解数
  const [totalAttempts, setTotalAttempts] = useState(0); // 解答回数

  // 正答率計算
  const accuracy = totalAttempts > 0 ? correctCount / totalAttempts : 1;

  // UIスタイル変更（"Descent into Madness"）
  let bgColor = "bg-black";
  let textColor = "text-white";
  let textStyle = "text-3xl font-bold";
  let shakeEffect = "";

  if (accuracy < 0.7) {
    bgColor = "bg-red-900";
    textColor = "text-yellow-400";
    textStyle = "text-4xl font-extrabold tracking-widest";
    shakeEffect = "animate-shake";
  }
  if (accuracy < 0.4) {
    bgColor = "bg-red-800";
    textColor = "text-yellow-500";
    textStyle = "text-5xl font-black tracking-widest";
    shakeEffect = "animate-shake-hard";
  }
  if (accuracy < 0.2) {
    bgColor = "bg-red-700 text-white";
    textStyle = "text-6xl font-black tracking-wider italic";
    shakeEffect = "animate-shake-crazy";
  }

  // 回答をチェック
  const handleCheckAnswer = () => {
    setTotalAttempts(totalAttempts + 1);
    if (userAnswer.trim() === correctAnswer) {
      setCorrectCount(correctCount + 1);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${bgColor} ${shakeEffect} p-8 transition-all duration-500`}>
      <h1 className={`sm:text-4xl ${textStyle} ${textColor} transition-all duration-500`}>
        🧠 Quiz
      </h1>
      <p className={`mt-4 text-lg ${textColor}`}>{question}</p>

      {/* ユーザーが答えを入力するエリア */}
      <input
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Enter your answer"
        className="mt-6 w-64 px-4 py-2 text-white bg-gray-800 rounded-lg border-2 border-gray-400 focus:border-blue-500 focus:outline-none"
      />

      {/* 回答をチェックするボタン */}
      <button
        onClick={handleCheckAnswer}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition"
      >
        Submit Answer
      </button>

      {/* 回答結果の表示 */}
      {isCorrect !== null && (
        <p
          className={`mt-4 text-lg font-bold ${
            isCorrect ? "text-green-400" : "text-red-400"
          }`}
        >
          {isCorrect ? "✅ Correct!" : "❌ Wrong..."}
        </p>
      )}

      {/* ホームに戻るボタン */}
      <Link href="/">
        <button className="mt-6 bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg text-lg transition">
          🔙 Go Home
        </button>
      </Link>
    </div>
  );
}
