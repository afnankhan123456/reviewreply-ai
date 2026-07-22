"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { 
  LayoutDashboard, Star, Sparkles, BarChart3, FileText, 
  Send, Bell, ShieldCheck, Users, Settings, Gift,
  Tag, PlugZap, LifeBuoy, Globe, Menu, ChevronLeft
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
  const plan = (authSession?.user as any)?.plan || "basic";
  const hasStandardAccess = plan?.startsWith("standard");

  // ✅ Theme state – default dark
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // ✅ Sidebar collapsed state – load from localStorage
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sidebarCollapsed");
      return saved === "true";
    }
    return false;
  });

  // ✅ Save collapsed state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", String(isCollapsed));
  }, [isCollapsed]);

  // ✅ Har navigation par localStorage se theme read karo
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    }
  }, [pathname]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated" && !hasStandardAccess) {
      router.replace("/plans");
    }
  }, [status, hasStandardAccess, router]);

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
      'review-page': 'Review Page',
      'alerts': 'Alerts',
      'support': 'Support',
      'team': 'Team',
      'settings': 'Settings',
      'connect-app': 'Connect App'
    };

    return segmentToLabel[lastSegment] || 'Overview';
  });

  if (status === "loading" || status === "unauthenticated" || !hasStandardAccess) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0B0E14] text-gray-200">
        <p className="text-sm text-gray-400">Checking your session...</p>
      </div>
    );
  }

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex h-screen w-full font-sans overflow-hidden">
      
      {/* ✅ Sidebar – with collapsible classes and transition */}
      <aside 
        className={`bg-[#11141C] border-r border-[#1F2430] flex flex-col p-4 overflow-y-auto transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-[72px]' : 'w-64'
        }`}
      >
        {/* Header with logo and toggle */}
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} mb-10 px-2`}>
          {/* Logo + Text – hide text when collapsed */}
          <Link 
            href="/plans/standard/dashboard" 
            className={`flex items-center gap-3 hover:opacity-80 transition-opacity ${isCollapsed ? 'justify-center' : ''}`}
          >
            <img 
              src="https://raw.githubusercontent.com/afnankhan123456/reviewreply-ai/main/public/ai-logo.png" 
              alt="ReviewReply AI" 
              className="h-9 w-auto object-contain" 
            />
            <span className={`text-xl font-bold tracking-tight text-white transition-opacity duration-300 ${
              isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'
            }`}>
              ReviewReply AI
            </span>
          </Link>

          {/* Toggle Button */}
          <button 
            onClick={toggleSidebar}
            className={`p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white ${isCollapsed ? 'hidden' : 'block'}`}
            aria-label="Toggle Sidebar"
          >
            <ChevronLeft size={20} />
          </button>
          {/* For collapsed state, show a menu icon to expand */}
          {isCollapsed && (
            <button 
              onClick={toggleSidebar}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
              aria-label="Expand Sidebar"
            >
              <Menu size={20} />
            </button>
          )}
        </div>

        <nav className="space-y-1 flex-1">
          <NavItem 
            icon={<LayoutDashboard size={20} />} 
            label="Overview" 
            href="/plans/standard/dashboard" 
            isActive={activeItem === 'Overview'} 
            onClick={() => setActiveItem('Overview')} 
            collapsed={isCollapsed}
          />
          <NavItem 
            icon={<Star size={20} />} 
            label="Reviews" 
            href="/plans/standard/dashboard/reviews" 
            isActive={activeItem === 'Reviews'} 
            onClick={() => setActiveItem('Reviews')} 
            collapsed={isCollapsed}
          />
          <NavItem 
            icon={<Sparkles size={20} />} 
            label="AI Reply Center" 
            href="/plans/standard/dashboard/ai-reply-center" 
            isActive={activeItem === 'AI Reply Center'} 
            onClick={() => setActiveItem('AI Reply Center')} 
            collapsed={isCollapsed}
          />
          <NavItem 
            icon={<BarChart3 size={20} />} 
            label="Analytics" 
            href="/plans/standard/dashboard/analytics" 
            isActive={activeItem === 'Analytics'} 
            onClick={() => setActiveItem('Analytics')} 
            collapsed={isCollapsed}
          />
          <NavItem 
            icon={<FileText size={20} />} 
            label="Reports" 
            href="/plans/standard/dashboard/reports" 
            isActive={activeItem === 'Reports'} 
            onClick={() => setActiveItem('Reports')} 
            collapsed={isCollapsed}
          />
          <NavItem 
            icon={<Tag size={20} />} 
            label="Tags & Categories" 
            href="/plans/standard/dashboard/tags-categories" 
            isActive={activeItem === 'Tags & Categories'} 
            onClick={() => setActiveItem('Tags & Categories')} 
            collapsed={isCollapsed}
          />
          <NavItem 
            icon={<Send size={20} />} 
            label="Requests" 
            href="/plans/standard/dashboard/requests" 
            isActive={activeItem === 'Requests'} 
            onClick={() => setActiveItem('Requests')} 
            collapsed={isCollapsed}
          />
          <NavItem 
            icon={<Globe size={20} />} 
            label="Review Page" 
            href="/plans/standard/dashboard/review-page" 
            isActive={activeItem === 'Review Page'} 
            onClick={() => setActiveItem('Review Page')} 
            collapsed={isCollapsed}
          />
          <NavItem 
            icon={<Bell size={20} />} 
            label="Alerts" 
            href="/plans/standard/dashboard/alerts" 
            isActive={activeItem === 'Alerts'} 
            onClick={() => setActiveItem('Alerts')} 
            collapsed={isCollapsed}
          />
          
          {isOwner && (
            <NavItem 
              icon={<PlugZap size={20} />} 
              label="Connect App" 
              href="/plans/standard/dashboard/connect-app" 
              isActive={activeItem === 'Connect App'} 
              onClick={() => setActiveItem('Connect App')} 
              collapsed={isCollapsed}
            />
          )}
          
          {/* Competitors NavItem REMOVED */}

          {isOwner && (
            <NavItem 
              icon={<Users size={20} />} 
              label="Team" 
              href="/plans/standard/dashboard/team" 
              isActive={activeItem === 'Team'} 
              onClick={() => setActiveItem('Team')} 
              collapsed={isCollapsed}
            />
          )}
          {isOwner && (
            <NavItem 
              icon={<Settings size={20} />} 
              label="Settings" 
              href="/plans/standard/dashboard/settings" 
              isActive={activeItem === 'Settings'} 
              onClick={() => setActiveItem('Settings')} 
              collapsed={isCollapsed}
            />
          )}

          <NavItem 
            icon={<LifeBuoy size={20} />} 
            label="Support" 
            href="/plans/standard/dashboard/support" 
            isActive={activeItem === 'Support'} 
            onClick={() => setActiveItem('Support')} 
            collapsed={isCollapsed}
          />
        </nav>

        {/* What's New Card - hide text when collapsed */}
        <div className={`mt-auto pt-6 border-t border-[#1F2430] transition-all duration-300 ${
          isCollapsed ? 'flex justify-center' : ''
        }`}>
          <div className={`flex items-center gap-3 px-2 py-3 bg-[#1A1D27] rounded-lg cursor-pointer hover:bg-[#222633] transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}>
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-1.5 rounded-md">
              <Gift size={18} className="text-white" />
            </div>
            <div className={`flex flex-col transition-opacity duration-300 ${
              isCollapsed ? 'opacity-0 hidden' : 'opacity-100'
            }`}>
              <span className="text-xs font-semibold text-white">What&apos;s New</span>
              <span className="text-[10px] text-gray-400">Check out our updates</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ✅ Main content area – background aur text theme ke according badlega */}
      <div className={`flex-1 flex flex-col h-screen overflow-hidden relative transition-all duration-300 ${
        theme === "light" 
          ? "bg-gray-50 text-gray-900" 
          : "bg-[#0B0E14] text-gray-200"
      }`}>
        {children}
      </div>
    </div>
  );
}

// Updated NavItem with collapsed prop
function NavItem({ 
  icon, 
  label, 
  href, 
  isActive, 
  onClick, 
  collapsed 
}: { 
  icon: React.ReactNode; 
  label: string; 
  href: string; 
  isActive: boolean; 
  onClick: () => void;
  collapsed: boolean;
}) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 cursor-pointer ${
        isActive 
          ? 'text-indigo-400 border-l-2 border-indigo-500' 
          : 'text-gray-400 hover:text-white hover:bg-indigo-500/10'
      } ${collapsed ? 'justify-center px-0' : ''}`}
    >
      <span className={isActive ? 'text-indigo-400' : ''}>{icon}</span>
      <span className={`text-sm font-medium transition-all duration-300 ${
        collapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'
      }`}>
        {label}
      </span>
    </Link>
  );
}
