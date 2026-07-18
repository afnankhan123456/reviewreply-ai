"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  CheckCircle, Clock,
  ExternalLink, Mail, Building2, X, PlugZap
} from 'lucide-react';
import {
  getConnectionStatus,
  toggleGmail,
  getGoogleBusinessLocations,
  getSelectedLocations,
  saveSelectedLocation,
  removeSelectedLocation,
} from './actions';

export default function ConnectAppPage() {
  const { data: authSession } = useSession();
  const isOwner = (authSession?.user as any)?.teamRole === 'OWNER';

  const [isGmailConnected, setIsGmailConnected] = useState<boolean>(false);
  const [emailLimit, setEmailLimit] = useState<number>(0);
  const [emailsUsed, setEmailsUsed] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const [isGoogleConnected, setIsGoogleConnected] = useState<boolean>(false);
  const [locations, setLocations] = useState<any[]>([]);
  const [loadingLocations, setLoadingLocations] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<any[]>([]);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [locationsLimit, setLocationsLimit] = useState<number>(1);
  const [locationsUsed, setLocationsUsed] = useState<number>(0);
  const [savingLocationId, setSavingLocationId] = useState<string | null>(null);

  useEffect(() => {
    if (!isOwner) {
      setLoading(false);
      return;
    }

    const fetchConnectionStatus = async () => {
      setLoading(true);
      const result = await getConnectionStatus();

      if (result.success) {
        setIsGmailConnected(result.gmailConnected ?? false);
        setEmailLimit(result.alertEmailsLimit ?? 0);
        setEmailsUsed(result.alertEmailsSent ?? 0);
        setIsGoogleConnected(result.googleConnected ?? false);
        setLocationsLimit(result.locationsLimit ?? 1);
        setLocationsUsed(result.locationsUsed ?? 0);
      } else {
        console.error('Failed to fetch status:', result.error);
      }

      // Pehle se selected locations bhi load karo
      const selectedResult = await getSelectedLocations();
      if (selectedResult.success) {
        setSelectedLocations(selectedResult.locations || []);
      }

      setLoading(false);
    };

    fetchConnectionStatus();
  }, [isOwner]);

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

  const handleConnectGoogleBusiness = async () => {
    setLoadingLocations(true);
    setLocationError(null);
    const result = await getGoogleBusinessLocations();
    if (result.success) {
      setLocations(result.locations);
    } else {
      setLocationError(result.error || 'Failed to fetch locations');
    }
    setLoadingLocations(false);
  };

  const isLimitReached = selectedLocations.length >= locationsLimit;

  const handleSelectLocation = async (location: any) => {
    if (isLimitReached) {
      setLocationError(`You can only connect ${locationsLimit} location(s) on your current plan.`);
      return;
    }

    setSavingLocationId(location.id);
    setLocationError(null);

    const result = await saveSelectedLocation(location.id, location.title, location.address);

    if (result.success) {
      setSelectedLocations((prev) => [...prev, location]);
      setIsGoogleConnected(true);
      setLocationsUsed(result.locationsUsed ?? selectedLocations.length + 1);
    } else {
      setLocationError(result.error || 'Failed to save location');
    }

    setSavingLocationId(null);
  };

  const handleRemoveLocation = async (locationId: string) => {
    setSavingLocationId(locationId);
    const result = await removeSelectedLocation(locationId);

    if (result.success) {
      setSelectedLocations((prev) => prev.filter((loc) => loc.id !== locationId));
      setLocationsUsed(result.locationsUsed ?? Math.max(0, selectedLocations.length - 1));
      if (selectedLocations.length - 1 === 0) {
        setIsGoogleConnected(false);
      }
    } else {
      alert(result.error || 'Failed to remove location');
    }
    setSavingLocationId(null);
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0B0E14] text-gray-400">
        Loading connection status...
      </div>
    );
  }

  // Team member (Owner nahi) is page ko access nahi kar sakta
  if (!isOwner) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#0B0E14] text-center p-6">
        <PlugZap size={40} className="text-gray-600 mb-3" />
        <h2 className="text-white text-lg font-medium">Access Denied</h2>
        <p className="text-gray-400 text-sm mt-1">
          Only the account owner can manage app connections.
        </p>
      </div>
    );
  }

  const remaining = Math.max(0, emailLimit - emailsUsed);

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto bg-[#0B0E14]">

      <header className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          Connect App
        </h1>
        <p className="text-sm text-gray-400 mt-1">Manage your Gmail and Google Business connections.</p>
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

        <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-5 hover:border-[#2A303C] transition-colors">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#181D27] rounded-xl flex items-center justify-center border border-[#2A303C]">
                <Building2 size={24} />
              </div>
              <div>
                <h3 className="text-white font-medium">Google Business</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${isGoogleConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span className={`text-xs ${isGoogleConnected ? 'text-green-400' : 'text-red-400'}`}>
                    {isGoogleConnected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleConnectGoogleBusiness}
              disabled={loadingLocations}
              className="p-2 rounded border transition-colors text-xs font-medium bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20 disabled:opacity-50"
            >
              {loadingLocations ? 'Loading...' : 'Fetch Locations'}
            </button>
          </div>

          {/* Plan limit indicator */}
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs text-gray-400">Locations connected</span>
            <span className={`text-xs font-medium ${isLimitReached ? 'text-yellow-400' : 'text-gray-300'}`}>
              {selectedLocations.length} / {locationsLimit}
            </span>
          </div>

          {locationError && (
            <p className="text-xs text-red-400 mb-2">{locationError}</p>
          )}

          {/* Already selected locations */}
          {selectedLocations.length > 0 && (
            <div className="space-y-2 mb-3">
              {selectedLocations.map((loc) => (
                <div
                  key={loc.id}
                  className="flex items-center justify-between p-2 rounded-lg border border-green-500/40 bg-green-500/10 text-xs"
                >
                  <div>
                    <p className="text-white">{loc.title}</p>
                    <p className="text-gray-500">{loc.address}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveLocation(loc.id)}
                    disabled={savingLocationId === loc.id}
                    className="p-1.5 rounded bg-red-600/20 text-red-400 hover:bg-red-600/30 disabled:opacity-50"
                    title="Remove location"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Fetched locations list to pick from */}
          {locations.length > 0 && (
            <div className="space-y-2 mt-2 max-h-48 overflow-y-auto">
              {locations
                .filter((loc) => !selectedLocations.some((sel) => sel.id === loc.id))
                .map((loc) => (
                  <div
                    key={loc.id}
                    className="flex items-center justify-between p-2 rounded-lg border border-[#2A303C] bg-[#181D27] text-xs"
                  >
                    <div>
                      <p className="text-white">{loc.title}</p>
                      <p className="text-gray-500">{loc.address}</p>
                    </div>
                    <button
                      onClick={() => handleSelectLocation(loc)}
                      disabled={isLimitReached || savingLocationId === loc.id}
                      className={`px-2 py-1 rounded text-[10px] transition ${
                        isLimitReached
                          ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                          : 'bg-indigo-600 text-white hover:bg-indigo-500'
                      }`}
                    >
                      {savingLocationId === loc.id
                        ? 'Saving...'
                        : isLimitReached
                          ? 'Limit reached'
                          : 'Select'}
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>
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
              <span className="text-gray-400">Remaining</span>
              <span className="text-white">{remaining}</span>
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
