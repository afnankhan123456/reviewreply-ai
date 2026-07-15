"use client";

import React, { useState } from 'react';
import { 
  Search, Plus, X, CheckCircle, Clock, RefreshCw, 
  ExternalLink, Trash2, Settings, PlugZap
} from 'lucide-react';

export default function ConnectAppPage() {
  // Mock data for connected apps
  const [connectedApps, setConnectedApps] = useState([
    { id: 1, name: 'Google Business Profile', icon: '📊', status: 'Connected', lastSync: '2 min ago' },
    { id: 2, name: 'Facebook Page', icon: '📘', status: 'Connected', lastSync: '1 hour ago' },
    { id: 3, name: 'Yelp for Business', icon: '📍', status: 'Disconnected', lastSync: 'N/A' },
    { id: 4, name: 'TripAdvisor', icon: '✈️', status: 'Connected', lastSync: '5 hours ago' },
    { id: 5, name: 'Zomato', icon: '🍕', status: 'Disconnected', lastSync: 'N/A' },
    { id: 6, name: 'Instagram Business', icon: '📸', status: 'Connected', lastSync: 'Yesterday' },
  ]);

  const [showConnectModal, setShowConnectModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter apps based on search
  const filteredApps = connectedApps.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle connection status (Mock function)
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
            <PlugZap className="text-indigo-400" size={28} />
            Connect App
          </h1>
          <p className="text-sm text-gray-400 mt-1">Manage all your connected apps and integrations in one place.</p>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowConnectModal(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus size={18} />
            Connect New App
          </button>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Apps" value="6" icon="📦" color="bg-blue-500/20 text-blue-400" />
        <StatCard title="Active Connections" value="4" icon="✅" color="bg-green-500/20 text-green-400" />
        <StatCard title="Disconnected" value="2" icon="⛔" color="bg-red-500/20 text-red-400" />
        <StatCard title="Last Sync" value="2 min ago" icon="🔄" color="bg-purple-500/20 text-purple-400" />
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center bg-[#181D27] px-3 py-1.5 rounded-lg border border-[#2A303C] w-full md:w-80">
          <Search size={16} className="text-gray-500 mr-2" />
          <input 
            type="text" 
            placeholder="Search apps..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-gray-300 w-full placeholder-gray-500"
          />
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="bg-[#181D27] px-3 py-1.5 rounded-lg border border-[#2A303C]">All Apps</span>
          <span className="bg-[#181D27] px-3 py-1.5 rounded-lg border border-[#2A303C] cursor-pointer hover:text-white">Active</span>
          <span className="bg-[#181D27] px-3 py-1.5 rounded-lg border border-[#2A303C] cursor-pointer hover:text-white">Disconnected</span>
        </div>
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApps.map((app) => (
          <AppCard 
            key={app.id} 
            app={app} 
            onToggle={() => toggleConnection(app.id)}
          />
        ))}
        
        {filteredApps.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            <div className="text-4xl mb-2">🔍</div>
            <p>No apps found matching your search.</p>
          </div>
        )}
      </div>

      {/* Connect New App Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#11141C] border border-[#1F2430] rounded-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowConnectModal(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-indigo-600/20 rounded-xl flex items-center justify-center text-2xl">
                <PlugZap className="text-indigo-400" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Connect New App</h2>
                <p className="text-sm text-gray-400">Select a platform to connect</p>
              </div>
            </div>

            <div className="space-y-4">
              {['Google Business Profile', 'Facebook Page', 'Yelp', 'TripAdvisor', 'Zomato', 'Instagram'].map((platform) => (
                <div key={platform} className="flex items-center justify-between p-3 bg-[#181D27] rounded-lg border border-[#2A303C] hover:border-indigo-500/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{platform === 'Google Business Profile' ? '📊' : platform === 'Facebook Page' ? '📘' : platform === 'Yelp' ? '📍' : platform === 'TripAdvisor' ? '✈️' : platform === 'Zomato' ? '🍕' : '📸'}</span>
                    <span className="text-white text-sm font-medium">{platform}</span>
                  </div>
                  <button className="text-xs bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-500 transition-colors">
                    Connect
                  </button>
                </div>
              ))}
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

// --- Reusable Components ---

function StatCard({ title, value, icon, color }: any) {
  return (
    <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-4">
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs text-gray-400">{title}</span>
        <span className={`text-xs px-1.5 py-0.5 rounded ${color}`}>{icon}</span>
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
    </div>
  );
}

function AppCard({ app, onToggle }: any) {
  const isConnected = app.status === 'Connected';
  
  return (
    <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-5 hover:border-[#2A303C] transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#181D27] rounded-xl flex items-center justify-center text-2xl border border-[#2A303C]">
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
        
        <div className="flex gap-1">
          {isConnected && (
            <button className="p-1.5 bg-[#181D27] rounded border border-[#2A303C] text-gray-400 hover:text-blue-400 transition-colors">
              <RefreshCw size={14} />
            </button>
          )}
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
