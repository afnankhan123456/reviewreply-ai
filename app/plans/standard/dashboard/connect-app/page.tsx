"use client";

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, Clock, 
  ExternalLink, Building, Mail
} from 'lucide-react';

export default function ConnectAppPage() {
  // ✅ State to store connection status from backend/API
  const [isGoogleConnected, setIsGoogleConnected] = useState<boolean | null>(null);
  const [isGmailConnected, setIsGmailConnected] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Mock API Call (Isko aap apni real backend API se replace kar sakte hain)
  useEffect(() => {
    // Simulate fetching login method & connection status
    const fetchConnectionStatus = async () => {
      setLoading(true);
      
      // 🟢 YAHAN LOGIC CHANGE KARNA HAI: 
      // Agar user "Continue with Google" se login kiya hai -> true
      // Agar normal email se login kiya hai -> false
      
      // Mock: Maan lo user normal email se login kiya hai (Case 1)
      const isLoggedInViaGoogle = false; // Change this to 'true' to test Case 2
      
      setIsGoogleConnected(isLoggedInViaGoogle);
      setIsGmailConnected(false); // Gmail abhi connected nahi hai
      
      setLoading(false);
    };

    fetchConnectionStatus();
  }, []);

  // ✅ Toggle connection function (Mock)
  const toggleConnection = (type: 'google' | 'gmail') => {
    if (type === 'google') {
      setIsGoogleConnected(prev => !prev);
    } else if (type === 'gmail') {
      setIsGmailConnected(prev => !prev);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0B0E14] text-gray-400">
        Loading connection status...
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto bg-[#0B0E14]">
      
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          Connect App
        </h1>
        <p className="text-sm text-gray-400 mt-1">Manage your Business ID & Gmail connections.</p>
      </header>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-gray-400">Total Connections</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">2</div>
        </div>
        <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-gray-400">Active</span>
          </div>
          <div className="text-2xl font-bold text-green-400 mb-1">
            {[isGoogleConnected, isGmailConnected].filter(Boolean).length}
          </div>
        </div>
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Business ID Card */}
        <AppCard 
          name="Business ID"
          icon={<Building size={24} />}
          isConnected={isGoogleConnected}
          lastSync={isGoogleConnected ? "2 min ago" : "N/A"}
          onToggle={() => toggleConnection('google')}
          // ✅ Case 2 Logic: Agar Google se login kiya hai, to button DISABLED hoga
          isDisabled={isGoogleConnected === true} 
        />

        {/* Gmail Card */}
        <AppCard 
          name="Gmail"
          icon={<Mail size={24} />}
          isConnected={isGmailConnected}
          lastSync={isGmailConnected ? "Just now" : "N/A"}
          onToggle={() => toggleConnection('gmail')}
          // Agar Gmail connected hai to button disabled, warna enabled
          isDisabled={isGmailConnected === true} 
        />
        
      </div>

    </div>
  );
}

// --- Updated Reusable App Card Component ---
function AppCard({ name, icon, isConnected, lastSync, onToggle, isDisabled }: any) {
  return (
    <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-5 hover:border-[#2A303C] transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#181D27] rounded-xl flex items-center justify-center border border-[#2A303C]">
            {icon}
          </div>
          <div>
            <h3 className="text-white font-medium">{name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
              <span className={`text-xs ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
        </div>
        
        {/* ✅ Updated Button Logic: Disabled if already connected via login */}
        <button 
          onClick={onToggle}
          disabled={isDisabled}
          className={`p-2 rounded border transition-colors text-xs font-medium ${
            isDisabled 
              ? 'bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed opacity-60'
              : isConnected
                ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20'
                : 'bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20'
          }`}
        >
          {isDisabled ? 'Already Connected' : (isConnected ? 'Disconnect' : 'Connect')}
        </button>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-[#1F2430]">
        <div className="flex items-center gap-2 text-[10px] text-gray-500">
          <Clock size={12} />
          <span>Last sync: {lastSync}</span>
        </div>
        
        {isConnected ? (
          <div className="flex items-center gap-1 text-[10px] text-green-400">
            <CheckCircle size={12} />
            <span>Active</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-[10px] text-red-400 cursor-pointer hover:underline" onClick={onToggle}>
            <ExternalLink size={12} />
            <span>Connect</span>
          </div>
        )}
      </div>
    </div>
  );
}
