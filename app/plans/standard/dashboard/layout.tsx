"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { 
  LayoutDashboard, Star, Sparkles, BarChart3, FileText, 
  Send, Bell, ShieldCheck, Users, Settings, Gift,
  Tag, PlugZap // ✅ Changed icon for Connect App
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: authSession, status } = useSession();
  const router = useRouter();

  const teamRole = (authSession?.user as any)?.teamRole || "OWNER";
  const isOwner = teamRole === "OWNER";

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  // ✅ Automatically detect active item from URL path
  const [activeItem, setActiveItem] = useState(() => {
    const lastSegment = pathname.split('/').pop() || '';
    
    const segmentToLabel: Record<string, string> = {
      'dashboard': 'Overview',
      'reviews': 'Reviews',
      'ai-reply-center': 'AI Reply Center',
      'analytics': 'Analytics',
      'reports': 'Reports',
      'tags-categories': 'Tags & Categories',
      'requests': 'Requests',
      'alerts': 'Alerts',
      'support': 'support',
      'team': 'Team',
      'settings': 'Settings',
      'connect-app': 'Connect App' // ✅ Changed from 'integrations'
    };

    return segmentToLabel[lastSegment] || 'Overview';
  });

  // Jab tak session check ho nahi jaata, ya user login nahi hai,
  // tab tak koi bhi dashboard content (sidebar, data, kuch bhi) render nahi hoga.
  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0B0E14] text-gray-200">
        <p className="text-sm text-gray-400">Checking your session...</p>
      </div>
    );
  }

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
            href="/plans/standard/dashboard/reviews" 
            isActive={activeItem === 'Reviews'}
            onClick={() => setActiveItem('Reviews')}
          />
          
          <NavItem 
            icon={<Sparkles size={20} />} 
            label="AI Reply Center" 
            href="/plans/standard/dashboard/ai-reply-center" 
            isActive={activeItem === 'AI Reply Center'}
            onClick={() => setActiveItem('AI Reply Center')}
          />
          
          <NavItem 
            icon={<BarChart3 size={20} />} 
            label="Analytics" 
            href="/plans/standard/dashboard/analytics" 
            isActive={activeItem === 'Analytics'}
            onClick={() => setActiveItem('Analytics')}
          />
          
          <NavItem 
            icon={<FileText size={20} />} 
            label="Reports" 
            href="/plans/standard/dashboard/reports" 
            isActive={activeItem === 'Reports'}
            onClick={() => setActiveItem('Reports')}
          />
          <NavItem 
            icon={<Tag size={20} />} 
            label="Tags & Categories" 
            href="/plans/standard/dashboard/tags-categories" 
            isActive={activeItem === 'Tags & Categories'}
            onClick={() => setActiveItem('Tags & Categories')}
          />
          <NavItem 
            icon={<Send size={20} />} 
            label="Requests" 
            href="/plans/standard/dashboard/requests" 
            isActive={activeItem === 'Requests'}
            onClick={() => setActiveItem('Requests')}
          />
          <NavItem 
            icon={<Bell size={20} />} 
            label="Alerts" 
            href="/plans/standard/dashboard/alerts" 
            isActive={activeItem === 'Alerts'}
            onClick={() => setActiveItem('Alerts')}
          />
          
          {/* ✅ Sirf Owner ko Connect App dikhega */}
          {isOwner && (
            <NavItem 
              icon={<PlugZap size={20} />} 
              label="Connect App" 
              href="/plans/standard/dashboard/connect-app" 
              isActive={activeItem === 'Connect App'}
              onClick={() => setActiveItem('Connect App')}
            />
          )}
          
          <NavItem 
            icon={<ShieldCheck size={20} />} 
            label="Competitors" 
            href="/plans/standard/dashboard/competitors" 
            isActive={activeItem === 'Competitors'}
            onClick={() => setActiveItem('Competitors')}
          />

          {/* ✅ Sirf Owner ko Team dikhega */}
          {isOwner && (
            <NavItem 
              icon={<Users size={20} />} 
              label="Team" 
              href="/plans/standard/dashboard/team" 
              isActive={activeItem === 'Team'}
              onClick={() => setActiveItem('Team')}
            />
          )}

          {/* ✅ Sirf Owner ko Settings dikhega */}
          {isOwner && (
            <NavItem 
              icon={<Settings size={20} />} 
              label="Settings" 
              href="/plans/standard/dashboard/settings" 
              isActive={activeItem === 'Settings'}
              onClick={() => setActiveItem('Settings')}
            />
          )}
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

// Reusable Sidebar Item Component
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
