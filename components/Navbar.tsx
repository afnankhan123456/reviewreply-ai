import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-sm border-b">
      <div className="flex items-center space-x-2">
        {/* 🚨 GOOGLE VERIFICATION FIX: Exact text "ReviewReply AI" in the header */}
        <Link href="/">
          <span className="text-2xl font-bold text-gray-900">
            ReviewReply AI
          </span>
        </Link>
      </div>
      <div>
        <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Sign In
        </button>
      </div>
    </nav>
  );
}
