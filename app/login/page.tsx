export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          ReviewReply AI
        </h1>

        <p className="text-zinc-400 mb-8">
          Continue with Google to access admin dashboard.
        </p>

        <a href="/api/auth/signin" className="block w-full bg-white text-black py-4 rounded-2xl font-semibold">
          Continue with Google
        </a>
      </div>
    </div>
  );
}
