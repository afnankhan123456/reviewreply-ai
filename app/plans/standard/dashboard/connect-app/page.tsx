"use client";

import React, { useState } from 'react';
import { 
  CheckCircle, Clock, 
  ExternalLink, Trash2, Building, Mail
} from 'lucide-react';

export default function ConnectAppPage() {
  // Sirf 2 items: Business ID (Connected) aur Gmail (Disconnected)
  const [connectedApps, setConnectedApps] = useState([
    { id: 1, name: 'Business ID', icon: <Building size={24} />, status: 'Connected', lastSync: '2 min ago' },
    { id: 2, name: 'Gmail', icon: <Mail size={24} />, status: 'Disconnected', lastSync: 'N/A' },
  ]);

  // Toggle connection status
  const toggleConnection = (id: number) => {
    setConnectedApps(prev => prev.map(app => 
      app.id === id 
        ? { ...app, status: app.status === 'Connected' ? 'Disconnected' : 'Connected', lastSync: app.status === 'Connected' ? 'N/A' : 'Just now' }
        : app
    ));
  };

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto bg-[#0B0E14]">
      
      {/* Header (Connect New Button REMOVED) */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          Connect App
        </h1>
        <p className="text-sm text-gray-400 mt-1">Manage your Business ID & Gmail connections.</p>
      </header>

      {/* Stats Bar (Sirf 2 items ke hisaab se) */}
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
            {connectedApps.filter(a => a.status === 'Connected').length}
          </div>
        </div>
      </div>

      {/* Apps Grid (Sirf 2 Cards - Seedha connect karne ka option) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {connectedApps.map((app) => (
          <AppCard 
            key={app.id} 
            app={app} 
            onToggle={() => toggleConnection(app.id)}
          />
        ))}
      </div>

    </div>
  );
}

// --- Reusable App Card Component ---
function AppCard({ app, onToggle }: any) {
  const isConnected = app.status === 'Connected';
  
  return (
    <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-5 hover:border-[#2A303C] transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#181D27] rounded-xl flex items-center justify-center border border-[#2A303C]">
            {app.icon}
          </div>
          <div>
            <h3 className="text-white font-medium">{app.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
              <span className={`text-xs ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
                {app.status}
              </span>
            </div>
          </div>
        </div>
        
        {/* Action Button - Gmail par "Connect" dikhega, Business ID par "Disconnect" */}
        <button 
          onClick={onToggle}
          className={`p-2 rounded border transition-colors text-xs font-medium ${
            isConnected 
              ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20' 
              : 'bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20'
          }`}
        >
          {isConnected ? 'Disconnect' : 'Connect'}
        </button>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-[#1F2430]">
        <div className="flex items-center gap-2 text-[10px] text-gray-500">
          <Clock size={12} />
          <span>Last sync: {app.lastSync}</span>
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
