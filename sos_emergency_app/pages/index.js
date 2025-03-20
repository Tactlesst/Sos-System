import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to My Next.js App</h1>
      <p className="text-gray-600 mb-4">Click below to log in or register.</p>

      <button
        onClick={() => router.push("/auth")}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
      >
        Go to Login/Register
      </button>
    </div>
  );
}
