"use client";

import React, { useState } from 'react';
import { 
  Plus, X, CheckCircle, Clock, 
  ExternalLink, Trash2, Building, Mail
} from 'lucide-react';

export default function ConnectAppPage() {
  // Sirf 2 items: Business ID aur Gmail
  const [connectedApps, setConnectedApps] = useState([
    { id: 1, name: 'Business ID', icon: <Building size={24} />, status: 'Connected', lastSync: '2 min ago' },
    { id: 2, name: 'Gmail', icon: <Mail size={24} />, status: 'Disconnected', lastSync: 'N/A' },
  ]);

  const [showConnectModal, setShowConnectModal] = useState(false);

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
      
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            Connect App
          </h1>
          <p className="text-sm text-gray-400 mt-1">Connect your Business ID & Gmail to get started.</p>
        </div>

        <button 
          onClick={() => setShowConnectModal(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={18} />
          Connect New
        </button>
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

      {/* Apps Grid (Sirf 2 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {connectedApps.map((app) => (
          <AppCard 
            key={app.id} 
            app={app} 
            onToggle={() => toggleConnection(app.id)}
          />
        ))}
      </div>

      {/* Connect New App Modal (Sirf 2 options) */}
      {showConnectModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#11141C] border border-[#1F2430] rounded-2xl w-full max-w-md p-6 relative">
            <button 
              onClick={() => setShowConnectModal(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-indigo-600/20 rounded-xl flex items-center justify-center">
                <Plus className="text-indigo-400" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Connect New</h2>
                <p className="text-sm text-gray-400">Select what you want to connect</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Business ID */}
              <div className="flex items-center justify-between p-3 bg-[#181D27] rounded-lg border border-[#2A303C] hover:border-indigo-500/50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <Building size={20} className="text-blue-400" />
                  <span className="text-white text-sm font-medium">Business ID</span>
                </div>
                <button className="text-xs bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-500 transition-colors">
                  Connect
                </button>
              </div>

              {/* Gmail */}
              <div className="flex items-center justify-between p-3 bg-[#181D27] rounded-lg border border-[#2A303C] hover:border-indigo-500/50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-red-400" />
                  <span className="text-white text-sm font-medium">Gmail</span>
                </div>
                <button className="text-xs bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-500 transition-colors">
                  Connect
                </button>
              </div>
            </div>

            <button 
              onClick={() => setShowConnectModal(false)}
              className="w-full mt-6 py-2.5 bg-gray-800 text-gray-400 rounded-lg text-sm font-medium hover:bg-gray-700 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
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
        
        <button 
          onClick={onToggle}
          className={`p-1.5 rounded border transition-colors ${
            isConnected 
              ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20' 
              : 'bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20'
          }`}
        >
          {isConnected ? <Trash2 size={14} /> : <Plus size={14} />}
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
