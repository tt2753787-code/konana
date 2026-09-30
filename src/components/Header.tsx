import React from 'react';
import { KONANA_LOGO_URL, CURRENT_USER, ELENA_USER } from '../data/mockData';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenSearch?: () => void;
  onOpenProfile?: () => void;
  onBackFromChat?: () => void;
  onStartCall?: (type: 'voice' | 'video') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenProfile,
  onBackFromChat,
  onStartCall,
}) => {
  // If we are on Chat tab, display the specialized chat top bar
  if (activeTab === 'chat') {
    return (
      <header className="sticky top-0 inset-x-0 z-50 bg-[#0a0e14]/85 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.5)] border-b border-[#00e5ff]/10">
        {/* Android system status bar */}
        <div className="flex items-center justify-between px-4 py-1.5 text-[#bac9cc] text-xs">
          <span className="font-semibold tracking-wide text-[#dfe2eb]">09:41</span>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[15px]">signal_cellular_4_bar</span>
            <span className="material-symbols-outlined text-[15px]">wifi</span>
            <span className="material-symbols-outlined text-[15px]">battery_full</span>
          </div>
        </div>

        {/* Chat Header Navigation Bar */}
        <div className="h-14 px-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <button
              aria-label="Back"
              onClick={onBackFromChat || (() => setActiveTab('home'))}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#00e5ff] hover:bg-[#181c22] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back_ios_new</span>
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-[#00e5ff]/30 p-0.5">
              <img
                src={KONANA_LOGO_URL}
                alt="Konana"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-base font-semibold text-[#dfe2eb] tracking-wide truncate">
              Chat Conversation
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onStartCall?.('voice')}
              className="w-9 h-9 rounded-full bg-[#181c22] flex items-center justify-center text-[#6cd3f7] hover:text-[#00e5ff] hover:bg-[#262a31] transition-all"
              title="Voice Call"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
            </button>
            <button
              onClick={() => onStartCall?.('video')}
              className="w-9 h-9 rounded-full bg-[#181c22] flex items-center justify-center text-[#6cd3f7] hover:text-[#00e5ff] hover:bg-[#262a31] transition-all"
              title="Video Call"
            >
              <span className="material-symbols-outlined text-[18px]">videocam</span>
            </button>
            <button
              onClick={onOpenProfile || (() => setActiveTab('profile'))}
              aria-label="User Profile"
              className="relative p-0.5 rounded-full hover:ring-2 hover:ring-[#00e5ff]/50 transition-all shrink-0"
            >
              <img
                src={CURRENT_USER.avatar}
                alt={CURRENT_USER.name}
                className="w-8 h-8 rounded-full object-cover shadow-[0_0_10px_rgba(0,229,255,0.3)]"
              />
            </button>
          </div>
        </div>
      </header>
    );
  }

  // Standard Header for Home, Friends, Media, Profile
  return (
    <header className="sticky top-0 inset-x-0 z-50 bg-[#0a0e14]/85 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.5)] border-b border-[#00e5ff]/10">
      {/* Android system status bar */}
      <div className="flex items-center justify-between px-4 py-1.5 text-[#bac9cc] text-xs">
        <span className="font-semibold tracking-wide text-[#dfe2eb]">09:41</span>
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[15px]">signal_cellular_4_bar</span>
          <span className="material-symbols-outlined text-[15px]">wifi</span>
          <span className="material-symbols-outlined text-[15px]">battery_full</span>
        </div>
      </div>

      {/* Main App Bar */}
      <div className="h-14 px-4 flex items-center justify-between">
        <div
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <img
            src={KONANA_LOGO_URL}
            alt="KONANA Emblem"
            className="h-7 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]"
          />
          <span className="text-xl font-bold tracking-wider text-[#00e5ff] drop-shadow-[0_0_12px_rgba(0,229,255,0.4)]">
            KONANA
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            aria-label="Search"
            onClick={onOpenSearch || (() => setActiveTab('friends'))}
            className="w-10 h-10 flex items-center justify-center rounded-full text-[#bac9cc] hover:text-[#00e5ff] hover:bg-[#181c22] transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          <button
            aria-label="User Profile"
            onClick={onOpenProfile || (() => setActiveTab('profile'))}
            className="w-10 h-10 flex items-center justify-center p-1 rounded-full group"
          >
            <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-[#00e5ff]/60 to-[#6cd3f7]/40 transition-transform group-hover:scale-105">
              <img
                src={CURRENT_USER.avatar}
                alt="Profile"
                className="w-7 h-7 rounded-full object-cover shadow-[0_0_10px_rgba(0,229,255,0.3)]"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#00e5ff] ring-2 ring-[#10141a]"></span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
