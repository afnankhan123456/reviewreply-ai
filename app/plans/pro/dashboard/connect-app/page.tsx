"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import {
  CheckCircle, Clock, ExternalLink, Mail, Building2, X, PlugZap, ArrowLeft
} from 'lucide-react';
import {
  getConnectionStatus,
  toggleGmail,
  getGoogleBusinessLocations,
  getSelectedLocations,
  saveSelectedLocation,
  removeSelectedLocation,
} from './actions';

function LiquidCard({ className = "", children, ...rest }: { className?: string; children: React.ReactNode; [key: string]: any }) {
  return (
    <div className={`card ${className}`} {...rest}>
      <div className="volume"></div>
      <div className="refract"></div>
      <div className="cornerBloom"></div>
      <div className="bodyShade"></div>
      <div className="specular"></div>
      <div className="edgeLight"></div>
      <div className="rim"></div>
      <div className="rightGlow"></div>
      <div className="content">{children}</div>
    </div>
  );
}

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
      const selectedResult = await getSelectedLocations();
      if (selectedResult.success) setSelectedLocations(selectedResult.locations || []);
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
    if (result.success) setLocations(result.locations);
    else setLocationError(result.error || 'Failed to fetch locations');
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
      if (selectedLocations.length - 1 === 0) setIsGoogleConnected(false);
    } else {
      alert(result.error || 'Failed to remove location');
    }
    setSavingLocationId(null);
  };

  if (loading) {
    return <div className="page-wrap"><p style={{ color: "var(--text-dim)", padding: 40 }}>Loading connection status...</p></div>;
  }

  if (!isOwner) {
    return (
      <div className="page-wrap" style={{ textAlign: "center", paddingTop: 80 }}>
        <PlugZap size={40} style={{ color: "var(--text-dimmer)", marginBottom: 12 }} />
        <h2 style={{ fontSize: 17, fontWeight: 600 }}>Access Denied</h2>
        <p style={{ fontSize: 13, color: "var(--text-dim)", marginTop: 4 }}>Only the account owner can manage app connections.</p>
      </div>
    );
  }

  const remaining = Math.max(0, emailLimit - emailsUsed);

  return (
    <div className="page-wrap">
      <div className="header-row">
        <div>
          <Link href="/plans/pro/dashboard" className="link" style={{ display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 8, fontSize: 12 }}>
            <ArrowLeft size={13} /> Back to Dashboard
          </Link>
          <h1>Connect App</h1>
          <p>Manage your Gmail and Google Business connections.</p>
        </div>
      </div>

      <div className="two-col">
        {/* Gmail Card */}
        <LiquidCard>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div className="mini-glass" style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Mail size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>Gmail</h3>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: isGmailConnected ? "#34d399" : "#ef5a6f" }}></span>
                  <span style={{ fontSize: 11, color: isGmailConnected ? "#57e39a" : "#ff8e9a" }}>{isGmailConnected ? 'Connected' : 'Disconnected'}</span>
                </div>
              </div>
            </div>
            <div className="mini-glass" style={{ padding: "7px 12px", fontSize: 11, opacity: isGmailConnected ? 0.6 : 1, cursor: isGmailConnected ? "default" : "pointer" }} onClick={!isGmailConnected ? toggleConnection : undefined}>
              {isGmailConnected ? 'Already Connected' : 'Connect'}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid rgba(255,255,255,.08)" }}>
            <span style={{ fontSize: 10.5, color: "var(--text-dimmer)", display: "flex", alignItems: "center", gap: 4 }}>
              <Clock size={11} /> Last sync: {isGmailConnected ? "Just now" : "N/A"}
            </span>
            {isGmailConnected ? (
              <span style={{ fontSize: 10.5, color: "#57e39a", display: "flex", alignItems: "center", gap: 4 }}><CheckCircle size={11} /> Active</span>
            ) : (
              <span style={{ fontSize: 10.5, color: "#ff8e9a", display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }} onClick={toggleConnection}><ExternalLink size={11} /> Connect</span>
            )}
          </div>
        </LiquidCard>

        {/* Google Business Card */}
        <LiquidCard>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div className="mini-glass" style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Building2 size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>Google Business</h3>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: isGoogleConnected ? "#34d399" : "#ef5a6f" }}></span>
                  <span style={{ fontSize: 11, color: isGoogleConnected ? "#57e39a" : "#ff8e9a" }}>{isGoogleConnected ? 'Connected' : 'Disconnected'}</span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <div className="mini-glass" style={{ padding: "7px 12px", fontSize: 11, opacity: loadingLocations ? 0.6 : 1 }} onClick={!loadingLocations ? handleConnectGoogleBusiness : undefined}>
                {loadingLocations ? 'Loading...' : 'Fetch Locations'}
              </div>
              <div className="mini-glass" style={{ padding: "7px 12px", fontSize: 11 }}
                onClick={() => signIn("google", { callbackUrl: "/plans/pro/dashboard/connect-app" })}
                title="Refresh your Google Business permission if locations stop loading">
                Reconnect
              </div>
            </div>
          </div>

          {locationError?.includes('No Google access token') && (
            <p style={{ fontSize: 11, color: "#e9b52a", marginBottom: 8 }}>Your Google Business access expired. Click "Reconnect" above to restore it.</p>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 11 }}>
            <span style={{ color: "var(--text-dim)" }}>Locations connected</span>
            <span style={{ color: isLimitReached ? "#e9b52a" : "#fff", fontWeight: 600 }}>{selectedLocations.length} / {locationsLimit}</span>
          </div>

          {locationError && <p style={{ fontSize: 11, color: "#ff8e9a", marginBottom: 8 }}>{locationError}</p>}

          {selectedLocations.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 }}>
              {selectedLocations.map((loc) => (
                <div key={loc.id} className="mini-glass" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 10, background: "rgba(52,211,153,.08)" }}>
                  <div>
                    <p style={{ fontSize: 12, margin: 0 }}>{loc.title}</p>
                    <p style={{ fontSize: 10.5, color: "var(--text-dim)", margin: 0 }}>{loc.address}</p>
                  </div>
                  <div style={{ padding: 6, cursor: savingLocationId === loc.id ? "default" : "pointer", opacity: savingLocationId === loc.id ? 0.5 : 1 }} onClick={() => savingLocationId !== loc.id && handleRemoveLocation(loc.id)}>
                    <X size={12} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {locations.length > 0 && (
            <div className="alerts-scroll" style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 190 }}>
              {locations.filter((loc) => !selectedLocations.some((sel) => sel.id === loc.id)).map((loc) => (
                <div key={loc.id} className="mini-glass" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 10 }}>
                  <div>
                    <p style={{ fontSize: 12, margin: 0 }}>{loc.title}</p>
                    <p style={{ fontSize: 10.5, color: "var(--text-dim)", margin: 0 }}>{loc.address}</p>
                  </div>
                  <div
                    onClick={() => !isLimitReached && savingLocationId !== loc.id && handleSelectLocation(loc)}
                    style={{
                      padding: "5px 10px", borderRadius: 8, fontSize: 10.5,
                      background: isLimitReached ? "rgba(255,255,255,.05)" : "rgba(174,71,255,.25)",
                      color: isLimitReached ? "var(--text-dimmer)" : "#c78bff",
                      cursor: isLimitReached ? "not-allowed" : "pointer",
                    }}
                  >
                    {savingLocationId === loc.id ? 'Saving...' : isLimitReached ? 'Limit reached' : 'Select'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </LiquidCard>
      </div>

      {isGmailConnected && (
        <LiquidCard className="section-card">
          <div className="section-head"><h3>Email Usage</h3></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ color: "var(--text-dim)" }}>Total Limit</span><span>{emailLimit} / month</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ color: "var(--text-dim)" }}>Used</span><span>{emailsUsed}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ color: "var(--text-dim)" }}>Remaining</span><span>{remaining}</span>
            </div>
          </div>
        </LiquidCard>
      )}
    </div>
  );
}
