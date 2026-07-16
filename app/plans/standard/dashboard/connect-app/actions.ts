"use client";

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, Clock, 
  ExternalLink, Mail
} from 'lucide-react';
import { getConnectionStatus, toggleGmail } from './actions';

export default function ConnectAppPage() {
  const [isGmailConnected, setIsGmailConnected] = useState<boolean>(false);
  const [emailLimit, setEmailLimit] = useState<number>(0);
  const [emailsUsed, setEmailsUsed] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConnectionStatus = async () => {
      setLoading(true);
      const result = await getConnectionStatus();
      
      if (result.success) {
        setIsGmailConnected(result.gmailConnected ?? false);
        setEmailLimit(result.alertEmailsLimit ?? 0);
        setEmailsUsed(result.alertEmailsSent ?? 0);
      } else {
        console.error('Failed to fetch status:', result.error);
      }
      setLoading(false);
    };

    fetchConnectionStatus();
  }, []);

  const toggleConnection = async () => {
    const action = isGmailConnected ? 'disconnect' : 'connect';
    const result = await toggleGmail(action);
    if (result.success) {
      setIsGmailConnected(result.gmailConnected);
      setEmailLimit(result.alertEmailsLimit);
    } else {
      alert(result.message || 'Failed to update Gmail connection');
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0B0E14] text-gray-400">
        Loading connection status...
      </div>
    );
  }

  const remaining = Math.max(0, emailLimit - emailsUsed);
  const availableForUser = Math.max(0, remaining - 50);

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto bg-[#0B0E14]">
      
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          Connect App
        </h1>
        <p className="text-sm text-gray-400 mt-1">Manage your Gmail connection.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AppCard 
          name="Gmail"
          icon={<Mail size={24} />}
          isConnected={isGmailConnected}
          lastSync={isGmailConnected ? "Just now" : "N/A"}
          onToggle={toggleConnection}
          isDisabled={isGmailConnected === true} 
        />
      </div>

      {isGmailConnected && (
        <div className="mt-6 bg-[#11141C] border border-[#1F2430] rounded-xl p-5">
          <h3 className="text-white font-medium mb-4">Email Usage</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Total Limit</span>
              <span className="text-white">{emailLimit} / month</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Used</span>
              <span className="text-white">{emailsUsed}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Remaining (User)</span>
              <span className="text-white">{availableForUser}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Reserved for Alerts</span>
              <span className="text-yellow-400">50</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

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



