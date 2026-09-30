import React, { useState } from 'react';
import { CURRENT_USER } from '../data/mockData';

interface ProfileScreenProps {
  onLogout: () => void;
  onOpenVault: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLogout, onOpenVault }) => {
  const [hardwareKeyActive, setHardwareKeyActive] = useState(true);
  const [e2eActive, setE2eActive] = useState(true);
  const [autoSync, setAutoSync] = useState(true);

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pb-28 pt-2 gap-5 select-none">
      {/* Profile Luxury Card */}
      <div className="relative overflow-hidden rounded-3xl bg-[#181c22] p-5 shadow-2xl border border-[#00e5ff]/25 text-center flex flex-col items-center">
        {/* Ambient Top Glow */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#00e5ff]/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Avatar with Concentric Radiant Aura */}
        <div className="relative my-2">
          <div className="absolute inset-0 rounded-full bg-[#00e5ff]/30 blur-md animate-pulse"></div>
          <div className="relative w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#00e5ff] via-[#6cd3f7] to-[#269dbe] shadow-[0_0_20px_rgba(0,229,255,0.4)]">
            <img
              src={CURRENT_USER.avatar}
              alt={CURRENT_USER.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[#00e5ff] flex items-center justify-center shadow-md ring-2 ring-[#181c22]">
            <span
              className="material-symbols-outlined text-[#001f24] text-[13px] font-bold"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check
            </span>
          </span>
        </div>

        {/* Identity Details */}
        <div className="mt-2 space-y-0.5">
          <div className="flex items-center justify-center gap-1.5">
            <h2 className="text-xl font-bold text-[#dfe2eb]">{CURRENT_USER.name}</h2>
            <span
              className="material-symbols-outlined text-[#00e5ff] text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
          </div>
          <p className="text-xs text-[#00e5ff] font-semibold">{CURRENT_USER.handle}</p>
          <p className="text-xs text-[#849396]">{CURRENT_USER.email}</p>
        </div>

        {/* Bio */}
        <p className="text-xs text-[#bac9cc] max-w-xs mt-3 leading-relaxed">
          {CURRENT_USER.bio}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 w-full mt-5 pt-4 border-t border-[#00e5ff]/15">
          <div className="flex flex-col items-center">
            <span className="text-base font-bold text-[#dfe2eb]">328</span>
            <span className="text-[10px] text-[#849396] uppercase tracking-wider">Friends</span>
          </div>
          <div className="flex flex-col items-center" onClick={onOpenVault}>
            <span className="text-base font-bold text-[#00e5ff]">35.8 GB</span>
            <span className="text-[10px] text-[#849396] uppercase tracking-wider">Vault Used</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-base font-bold text-[#6cd3f7]">14.2 GB</span>
            <span className="text-[10px] text-[#849396] uppercase tracking-wider">Free Cloud</span>
          </div>
        </div>
      </div>

      {/* Security & Cryptography Controls */}
      <div className="rounded-2xl bg-[#1c2026] p-4 border border-[#00e5ff]/15 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#00e5ff] flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px]">security</span>
          <span>Security &amp; Encryption Protocols</span>
        </h3>

        {/* Toggle 1: Hardware key */}
        <div className="flex items-center justify-between py-2 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#6cd3f7] text-[20px]">vpn_key</span>
            <div>
              <p className="text-xs font-semibold text-[#dfe2eb]">Hardware Key FIDO2</p>
              <p className="text-[10px] text-[#849396]">YubiKey 5Ci registered</p>
            </div>
          </div>
          <button
            onClick={() => setHardwareKeyActive(!hardwareKeyActive)}
            className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
              hardwareKeyActive ? 'bg-[#00e5ff]' : 'bg-[#31353c]'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full bg-[#10141a] transition-transform ${
                hardwareKeyActive ? 'translate-x-5' : 'translate-x-0'
              }`}
            ></span>
          </button>
        </div>

        {/* Toggle 2: E2E PGP */}
        <div className="flex items-center justify-between py-2 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#6cd3f7] text-[20px]">enhanced_encryption</span>
            <div>
              <p className="text-xs font-semibold text-[#dfe2eb]">End-to-End P2P Mesh</p>
              <p className="text-[10px] text-[#849396]">AES-GCM-256 + Curve25519</p>
            </div>
          </div>
          <button
            onClick={() => setE2eActive(!e2eActive)}
            className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
              e2eActive ? 'bg-[#00e5ff]' : 'bg-[#31353c]'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full bg-[#10141a] transition-transform ${
                e2eActive ? 'translate-x-5' : 'translate-x-0'
              }`}
            ></span>
          </button>
        </div>

        {/* Toggle 3: RAW Auto-sync */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#6cd3f7] text-[20px]">cloud_sync</span>
            <div>
              <p className="text-xs font-semibold text-[#dfe2eb]">Lossless RAW Background Sync</p>
              <p className="text-[10px] text-[#849396]">Direct export over Wi-Fi 7</p>
            </div>
          </div>
          <button
            onClick={() => setAutoSync(!autoSync)}
            className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
              autoSync ? 'bg-[#00e5ff]' : 'bg-[#31353c]'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full bg-[#10141a] transition-transform ${
                autoSync ? 'translate-x-5' : 'translate-x-0'
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Account Management & Logout */}
      <div className="space-y-2">
        <button
          onClick={onLogout}
          className="w-full h-12 rounded-2xl bg-[#262a31] hover:bg-[#31353c] text-[#ffb4ab] border border-[#ffb4ab]/20 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider active:scale-95 transition-all shadow-md cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          <span>Switch Account / Sign Out</span>
        </button>
      </div>
    </div>
  );
};
