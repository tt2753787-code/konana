import React, { useState } from 'react';
import { KONANA_LOGO_URL } from '../data/mockData';

interface OnboardingScreenProps {
  onLogin: (userName?: string, userEmail?: string) => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onLogin }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(true);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');

  return (
    <div className="relative min-h-screen w-full bg-[#10141a] text-[#dfe2eb] flex flex-col justify-between overflow-hidden select-none">
      {/* Ambient Atmospheric Radiant Backing */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#00e5ff]/10 rounded-full blur-[90px] pointer-events-none"></div>
      <div className="absolute top-1/3 -right-20 w-64 h-64 bg-[#269dbe]/15 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-10 -left-20 w-72 h-72 bg-[#00daf3]/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Main Hero Brand Zone */}
      <div className="flex-1 flex flex-col items-center justify-center pt-10 pb-6 px-6 text-center relative z-10">
        {/* Emblem Showcase with Concentric Pulse Wave Rings */}
        <div
          onClick={() => setIsSheetOpen(true)}
          className="relative flex items-center justify-center my-6 group cursor-pointer"
        >
          <div className="absolute w-36 h-36 rounded-full bg-[#00e5ff]/15 animate-ping opacity-60"></div>
          <div className="absolute w-32 h-32 rounded-full bg-[#262a31] shadow-[0_0_40px_rgba(0,229,255,0.3)]"></div>
          {/* Subtle Dynamic Halo */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00e5ff]/30 to-[#6cd3f7]/15 blur-md transform transition-transform duration-700 group-hover:scale-110"></div>

          {/* Origami Emblem Asset */}
          <div className="relative w-28 h-28 rounded-2xl p-1 bg-[#181c22] shadow-xl flex items-center justify-center overflow-hidden border border-[#00e5ff]/30">
            <img
              alt="KONANA Icon Mark"
              className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,229,255,0.4)] transition-transform duration-500 group-hover:scale-105"
              src={KONANA_LOGO_URL}
            />
          </div>

          {/* Precision Ambient Micro Status Chip */}
          <div className="absolute -bottom-2.5 px-2.5 py-0.5 rounded-full bg-[#31353c] shadow-md flex items-center gap-1.5 border border-[#00e5ff]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse"></span>
            <span className="text-[10px] text-[#c3f5ff] uppercase tracking-widest font-semibold">
              v2.4 Core
            </span>
          </div>
        </div>

        {/* Monolithic Typographic Lockup */}
        <div className="mt-5 space-y-1.5">
          <h1 className="text-3xl sm:text-4xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#c3f5ff] via-[#00e5ff] to-[#6cd3f7] font-bold drop-shadow-[0_0_16px_rgba(0,229,255,0.3)]">
            KONANA
          </h1>
          <p className="text-base text-[#849396] tracking-normal">
            Connect. Share. Discover.
          </p>
        </div>

        {/* Feature Pill Row with Architectural Spacing */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6 max-w-xs">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#181c22] border border-[#00e5ff]/10 shadow-sm text-xs text-[#bac9cc] hover:text-[#c3f5ff] transition-colors">
            <span className="text-[#6cd3f7]">⚡</span> Lightning Fast
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#181c22] border border-[#00e5ff]/10 shadow-sm text-xs text-[#bac9cc] hover:text-[#c3f5ff] transition-colors">
            <span className="text-[#6cd3f7]">🔒</span> End-to-End Encrypted
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#181c22] border border-[#00e5ff]/10 shadow-sm text-xs text-[#bac9cc] hover:text-[#c3f5ff] transition-colors">
            <span className="text-[#6cd3f7]">☁️</span> Cloud Synced
          </span>
        </div>
      </div>

      {/* Primary Interactive Actions Tier */}
      <div className="px-6 flex flex-col gap-3 relative z-10 mt-1 mb-6 max-w-md mx-auto w-full">
        {/* Google Native 1-Tap Trigger Button */}
        <button
          onClick={() => setIsSheetOpen(true)}
          className="w-full h-[54px] rounded-2xl bg-[#353940] hover:bg-[#3f444c] text-white font-semibold flex items-center justify-center gap-3 px-4 shadow-[0_8px_20px_rgba(0,0,0,0.4)] active:scale-[0.98] transition-all duration-200 cursor-pointer border border-white/10"
        >
          {/* Crisp Vector Google Mark */}
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              fill="#EA4335"
            />
          </svg>
          <span className="text-white text-base tracking-tight">Continue with Google</span>
        </button>

        {/* Secondary Action: Email Flow Button */}
        <button
          onClick={() => setShowEmailModal(true)}
          className="w-full h-[52px] rounded-2xl bg-[#262a31] hover:bg-[#31353c] text-[#c3f5ff] font-semibold flex items-center justify-center gap-2 px-4 shadow-sm active:scale-[0.98] transition-all duration-200 cursor-pointer border border-[#00e5ff]/15"
        >
          <span className="material-symbols-outlined text-[#00e5ff] text-[20px]">mail</span>
          <span className="text-sm">Continue with email</span>
        </button>
      </div>

      {/* Security & Protocol Meta Details */}
      <div className="px-6 text-center pb-8 z-10">
        <p className="text-xs text-[#849396] max-w-xs mx-auto leading-relaxed">
          By continuing, you agree to Konana&apos;s{' '}
          <span className="text-[#dfe2eb] underline underline-offset-2 hover:text-[#00e5ff] cursor-pointer">
            Terms of Service
          </span>{' '}
          &amp;{' '}
          <span className="text-[#dfe2eb] underline underline-offset-2 hover:text-[#00e5ff] cursor-pointer">
            Privacy Policy
          </span>
          .
        </p>
      </div>

      {/* Simulated Google Authenticator Glass Drawer Bottom Sheet */}
      {isSheetOpen && (
        <div
          className="fixed inset-0 bg-[#0a0e14]/80 backdrop-blur-sm z-50 flex items-end justify-center transition-opacity duration-300 animate-fadeIn"
          onClick={() => setIsSheetOpen(false)}
        >
          <div
            className="w-full max-w-md bg-[#1c2026] rounded-t-[28px] p-4 shadow-2xl relative z-50 flex flex-col gap-4 border-t border-[#00e5ff]/20 animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag Handle Pill */}
            <div className="w-10 h-1 bg-[#3b494c]/60 rounded-full mx-auto my-1"></div>

            {/* Drawer Header Bar */}
            <div className="flex items-center justify-between px-2 pt-1">
              <div className="flex items-center gap-2.5">
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="text-base text-[#dfe2eb] font-semibold">Sign in with Google</span>
              </div>
              <button
                onClick={() => setIsSheetOpen(false)}
                className="w-8 h-8 rounded-full bg-[#31353c] flex items-center justify-center text-[#bac9cc] hover:text-[#dfe2eb] active:scale-95 transition-all"
                aria-label="Close"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Scope Subtitle */}
            <div className="px-2">
              <p className="text-sm text-[#bac9cc]">
                Choose an account to continue to{' '}
                <span className="text-[#00e5ff] font-semibold">KONANA</span>
              </p>
            </div>

            {/* Account Selection List */}
            <div className="flex flex-col gap-2 mt-1">
              {/* Verified Active User Card (Alex Rivera) */}
              <button
                onClick={() => onLogin('Alex Rivera', 'alex.konana@gmail.com')}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#262a31] hover:bg-[#31353c] border border-[#00e5ff]/20 transition-all active:scale-[0.99] text-left cursor-pointer group shadow-lg"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Avatar with Verified Ring */}
                  <div className="relative w-11 h-11 rounded-full bg-[#269dbe] flex items-center justify-center text-[#002e3b] text-lg font-bold shrink-0 shadow-[0_0_12px_rgba(0,229,255,0.3)]">
                    <span>A</span>
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#00e5ff] flex items-center justify-center shadow-md">
                      <span
                        className="material-symbols-outlined text-[#001f24] text-[11px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check
                      </span>
                    </div>
                  </div>
                  {/* Identity Details */}
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm text-[#dfe2eb] font-semibold truncate group-hover:text-[#00e5ff] transition-colors">
                      Alex Rivera
                    </span>
                    <span className="text-xs text-[#849396] truncate">
                      alex.konana@gmail.com
                    </span>
                  </div>
                </div>
                {/* 1-Tap Indicator Tag */}
                <div className="px-2.5 py-1 rounded-full bg-[#00e5ff]/15 border border-[#00e5ff]/30 text-[#00e5ff] text-[10px] font-bold uppercase tracking-wider shrink-0 shadow-[0_0_8px_rgba(0,229,255,0.2)]">
                  Fast Login
                </div>
              </button>

              {/* Secondary Alternate Profile Entry */}
              <button
                onClick={() => setShowEmailModal(true)}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#181c22] hover:bg-[#262a31] border border-white/5 transition-all active:scale-[0.99] text-left cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-full bg-[#31353c] flex items-center justify-center text-[#bac9cc] shrink-0">
                    <span className="material-symbols-outlined text-[20px]">person_add</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm text-[#dfe2eb] font-medium truncate">
                      Use another account
                    </span>
                    <span className="text-xs text-[#849396] truncate">
                      Add or switch personal profiles
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#849396] text-[20px]">
                  chevron_right
                </span>
              </button>
            </div>

            {/* Native Android Security Confirmation Footnote */}
            <div className="px-2 pt-2 pb-3 flex items-start gap-2">
              <span className="material-symbols-outlined text-[#849396] text-[16px] mt-0.5">
                verified_user
              </span>
              <p className="text-xs text-[#849396] leading-tight">
                To continue, Google will securely share your name, email address, and language preference with KONANA.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Email Login Custom Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#1c2026] border border-[#00e5ff]/30 rounded-2xl p-6 w-full max-w-sm shadow-2xl relative">
            <button
              onClick={() => setShowEmailModal(false)}
              className="absolute top-4 right-4 text-[#849396] hover:text-[#dfe2eb]"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
            <h3 className="text-lg font-bold text-[#c3f5ff] mb-1">Sign in with Email</h3>
            <p className="text-xs text-[#849396] mb-4">
              Enter your identity credentials to connect to the Konana network.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onLogin(customName || 'Alex Rivera', customEmail || 'alex.konana@gmail.com');
              }}
              className="space-y-3"
            >
              <div>
                <label className="block text-xs font-medium text-[#bac9cc] mb-1">Full Name</label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full bg-[#10141a] border border-[#3b494c] rounded-xl px-3 py-2 text-sm text-[#dfe2eb] focus:outline-none focus:border-[#00e5ff]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#bac9cc] mb-1">Email Address</label>
                <input
                  type="email"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  placeholder="name@konana.io"
                  className="w-full bg-[#10141a] border border-[#3b494c] rounded-xl px-3 py-2 text-sm text-[#dfe2eb] focus:outline-none focus:border-[#00e5ff]"
                />
              </div>

              <button
                type="submit"
                className="w-full h-11 mt-4 rounded-xl bg-gradient-to-r from-[#00daf3] to-[#00e5ff] text-[#001f24] font-bold text-sm shadow-[0_0_16px_rgba(0,229,255,0.4)] active:scale-95 transition-all"
              >
                Enter Konana Vault
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
