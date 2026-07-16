"use client";

import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();

  const settingsItems = [
    {
      id: "send-review",
      icon: "📧",
      label: "Send Review Request",
      description: "Send a review request to your customers",
      action: () => router.push("/plans/standard/dashboard/settings/send-review"),
    },
    {
      id: "general",
      icon: "⚙️",
      label: "General",
      description: "Business Name, Address, Google Place ID",
      action: () => {},
    },
    {
      id: "notifications",
      icon: "🔔",
      label: "Notifications",
      description: "Email Alerts, Push Notifications",
      action: () => {},
    },
    {
      id: "appearance",
      icon: "🎨",
      label: "Appearance",
      description: "Dark Mode, Light Mode, System Default",
      action: () => {},
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">Settings</h1>
          <p className="text-gray-400 mt-1 text-sm">
            Manage your account and business settings
          </p>
        </div>

        {/* Settings List */}
        <div className="space-y-6">
          {settingsItems.map((item) => (
            <div
              key={item.id}
              onClick={item.action}
              className="group flex items-center justify-between p-4 bg-[#11141C] border border-[#1F2430] rounded-2xl hover:bg-[#181D27] hover:border-[#2A303C] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#181D27] rounded-xl flex items-center justify-center text-xl border border-[#2A303C] group-hover:border-[#3A4A5C]">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-base font-medium">{item.label}</h3>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </div>
              </div>
              <div className="text-gray-500 group-hover:text-gray-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
