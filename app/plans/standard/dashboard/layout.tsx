import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, Star, Sparkles, BarChart3, FileText, 
  Send, LayoutTemplate, Bell, ShieldCheck, Users, Settings, Gift
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-[#0B0E14] text-gray-200 font-sans overflow-hidden">
      
      {/* Sidebar - Left Panel */}
      <aside className="w-64 bg-[#11141C] border-r border-[#1F2430] flex flex-col p-4 overflow-y-auto">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="bg-indigo-500 p-1.5 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">ReviewMate</span>
        </div>

        <nav className="space-y-1 flex-1">
          <NavItem icon={<LayoutDashboard size={20} />} label="Overview" href="/plans/standard/dashboard" active />
          <NavItem icon={<Star size={20} />} label="Reviews" href="#" />
          <NavItem icon={<Sparkles size={20} />} label="AI Reply Center" href="#" />
          <NavItem icon={<BarChart3 size={20} />} label="Analytics" href="#" />
          <NavItem icon={<FileText size={20} />} label="Reports" href="#" />
          <NavItem icon={<Send size={20} />} label="Requests" href="#" />
          <NavItem icon={<LayoutTemplate size={20} />} label="Templates" href="#" />
          <NavItem icon={<Bell size={20} />} label="Alerts" href="#" />
          <NavItem icon={<ShieldCheck size={20} />} label="Competitors" href="#" />
          <NavItem icon={<Users size={20} />} label="Team" href="#" />
          <NavItem icon={<Settings size={20} />} label="Settings" href="#" />
        </nav>

        {/* Bottom Card */}
        <div className="mt-auto pt-6 border-t border-[#1F2430]">
          <div className="flex items-center gap-3 px-2 py-3 bg-[#1A1D27] rounded-lg cursor-pointer hover:bg-[#222633] transition-colors">
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-1.5 rounded-md">
              <Gift size={18} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-white">What&apos;s New</span>
              <span className="text-[10px] text-gray-400">Check out our updates</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {children}
      </div>
    </div>
  );
}

// UPDATED: Reusable Sidebar Item Component with Hover Liquid Feel
function NavItem({ icon, label, href, active = false }: { icon: React.ReactNode, label: string, href: string, active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 ${
        active 
          ? 'text-indigo-400 border-l-2 border-indigo-500' 
          : 'text-gray-400 hover:text-white hover:bg-indigo-500/10' // <-- YAHAN LIQUID GLOW ADD KIYA HAI
      }`}
    >
      <span className={active ? 'text-indigo-400' : ''}>{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}
