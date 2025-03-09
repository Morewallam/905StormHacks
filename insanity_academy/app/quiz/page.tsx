"use client"; // クライアントコンポーネントとして動作

import { useState } from "react";
import Link from "next/link";

// クイズの問題リスト
const quizQuestions = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "What is 2 + 2?", answer: "4" },
  { question: "Who wrote 'Hamlet'?", answer: "William Shakespeare" },
  { question: "What is the speed of light?", answer: "299,792,458 m/s" },
];

export default function Quiz() {
  // 状態管理
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(""); // 入力値
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null); // 正誤判定
  const [correctCount, setCorrectCount] = useState(0); // 正解数
  const [totalAttempts, setTotalAttempts] = useState(0); // 解答回数

  // 🎶 사운드 재생 함수 (public/sounds/ 폴더에서 오디오 파일 불러오기)
  const playSound = (fileName: string) => {
    const audio = new Audio(`/sounds/${fileName}`);
    audio.play();
  };

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
  
  if (accuracy < 0.5) {
    bgColor = "bg-red-800";
    textColor = "text-yellow-500";
    textStyle = "text-5xl tracking-wider font-black";
    shakeEffect = "animate-shake-hard";
  }
  
  if (accuracy < 0.4) {
    bgColor = "bg-red-700";
    textColor = "text-yellow-500 animate-text-glitch";
    textStyle = "text-6xl tracking-wide font-black italic";
    shakeEffect = "animate-shake-crazy";
  }
  
  if (accuracy < 0.3) {
    bgColor = "bg-red-600 animate-pulse";
    textColor = "text-white animate-text-glitch";
    textStyle = "text-7xl tracking-widest font-extrabold italic";
    shakeEffect = "animate-shake-madness";
  }
  
  if (accuracy < 0.2) {
    bgColor = "bg-red-500 animate-pulse";
    textColor = "text-white animate-text-glitch";
    textStyle = "text-8xl tracking-tight font-black";
    shakeEffect = "animate-screen-shake";
  }
  
  if (accuracy < 0.1) {
    bgColor = "bg-red-500 animate-flash";
    textColor = "text-white animate-text-glitch";
    textStyle = "text-[5rem] tracking-tight font-black italic";
    shakeEffect = "animate-screen-shake-hard";
  }


  // 現在の問題と答え
  const currentQuestion = quizQuestions[currentIndex];

  // 回答をチェック
  const handleCheckAnswer = () => {
    setTotalAttempts(totalAttempts + 1);
    if (userAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase()) {
      setCorrectCount(correctCount + 1);
      setIsCorrect(true);
      playSound("correct.wav"); // ✅ 정답 사운드
      playSound("genius.wav"); // 🎤 "You are a Genius!"
    } else {
      setIsCorrect(false);
      playSound("wrong.mp3"); // ❌ 오답 사운드
      playSound("madness_laugh.wav"); // 😈 미친 웃음소리
    }
  };

  // 次の問題へ
  const nextQuestion = () => {
    setIsCorrect(null);
    setUserAnswer("");
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // 全問終了 → 最初に戻る
      setCurrentIndex(0);
      setCorrectCount(0);
      setTotalAttempts(0);
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${bgColor} ${shakeEffect} p-8 transition-all duration-500`}>
      <h1 className={`sm:text-4xl ${textStyle} ${textColor} transition-all duration-500`}>
        🧠 Quiz
      </h1>
      <p className={`mt-4 text-lg ${textColor}`}>{currentQuestion.question}</p>

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
        <p className={`mt-4 text-lg font-bold ${isCorrect ? "text-green-400" : "text-red-400"}`}>
          {isCorrect ? "✅ Correct!" : "❌ Wrong..."}
        </p>
      )}

      {/* 次の問題に進むボタン */}
      {isCorrect !== null && (
        <button
          onClick={nextQuestion}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition"
        >
          Next Question →
        </button>
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
