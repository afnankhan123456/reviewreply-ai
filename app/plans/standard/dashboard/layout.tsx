"use client"; // <-- IMPORTANT: Isko add karna zaroori hai React state ke liye

import React, { useState } from 'react';
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
  // State track karne ke liye ki kaunsa item active hai
  const [activeItem, setActiveItem] = useState('Overview');

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
          <NavItem 
            icon={<LayoutDashboard size={20} />} 
            label="Overview" 
            href="/plans/standard/dashboard" 
            isActive={activeItem === 'Overview'}
            onClick={() => setActiveItem('Overview')}
          />
          <NavItem 
            icon={<Star size={20} />} 
            label="Reviews" 
            href="#" 
            isActive={activeItem === 'Reviews'}
            onClick={() => setActiveItem('Reviews')}
          />
          <NavItem 
            icon={<Sparkles size={20} />} 
            label="AI Reply Center" 
            href="#" 
            isActive={activeItem === 'AI Reply Center'}
            onClick={() => setActiveItem('AI Reply Center')}
          />
          <NavItem 
            icon={<BarChart3 size={20} />} 
            label="Analytics" 
            href="#" 
            isActive={activeItem === 'Analytics'}
            onClick={() => setActiveItem('Analytics')}
          />
          <NavItem 
            icon={<FileText size={20} />} 
            label="Reports" 
            href="#" 
            isActive={activeItem === 'Reports'}
            onClick={() => setActiveItem('Reports')}
          />
          <NavItem 
            icon={<Send size={20} />} 
            label="Requests" 
            href="#" 
            isActive={activeItem === 'Requests'}
            onClick={() => setActiveItem('Requests')}
          />
          <NavItem 
            icon={<LayoutTemplate size={20} />} 
            label="Templates" 
            href="#" 
            isActive={activeItem === 'Templates'}
            onClick={() => setActiveItem('Templates')}
          />
          <NavItem 
            icon={<Bell size={20} />} 
            label="Alerts" 
            href="#" 
            isActive={activeItem === 'Alerts'}
            onClick={() => setActiveItem('Alerts')}
          />
          <NavItem 
            icon={<ShieldCheck size={20} />} 
            label="Competitors" 
            href="#" 
            isActive={activeItem === 'Competitors'}
            onClick={() => setActiveItem('Competitors')}
          />
          <NavItem 
            icon={<Users size={20} />} 
            label="Team" 
            href="#" 
            isActive={activeItem === 'Team'}
            onClick={() => setActiveItem('Team')}
          />
          <NavItem 
            icon={<Settings size={20} />} 
            label="Settings" 
            href="#" 
            isActive={activeItem === 'Settings'}
            onClick={() => setActiveItem('Settings')}
          />
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

// UPDATED: Reusable Sidebar Item Component (Now handles Click active state)
function NavItem({ icon, label, href, isActive, onClick }: { icon: React.ReactNode, label: string, href: string, isActive: boolean, onClick: () => void }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 cursor-pointer ${
        isActive 
          ? 'text-indigo-400 border-l-2 border-indigo-500' 
          : 'text-gray-400 hover:text-white hover:bg-indigo-500/10'
      }`}
    >
      <span className={isActive ? 'text-indigo-400' : ''}>{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}
