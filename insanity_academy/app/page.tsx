import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white font-sans">
      {/* 背景画像 */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/logo.png"
          alt="Background Logo"
          fill
          className="object-contain opacity-20" // 透明度を調整
          priority
        />
      </div>

      {/* メインコンテンツ（ボタンを前面に配置） */}
      <main className="relative flex flex-col items-center justify-center flex-grow p-8 pb-20 gap-16 sm:p-20">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          Welcome to INSANITY ACADEMY
        </h1>

        {/* ボタンコンテナ */}
        <div className="flex flex-col gap-6 w-full max-w-2xl">
          <Link href="/flashcards">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition">
              📖 Flashcards
            </button>
          </Link>

          <Link href="/quiz">
            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition">
              🧠 Quiz
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
