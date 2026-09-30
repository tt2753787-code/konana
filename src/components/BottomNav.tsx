import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  unreadCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  unreadCount = 3,
}) => {
  const navItems: { id: TabType; label: string; icon: string }[] = [
    { id: 'home', label: 'HOME', icon: 'roofing' },
    { id: 'friends', label: 'FRIENDS', icon: 'diversity_3' },
    { id: 'chat', label: 'CHAT', icon: 'chat_bubble' },
    { id: 'media', label: 'MEDIA', icon: 'perm_media' },
    { id: 'profile', label: 'PROFILE', icon: 'account_circle' },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-[#0a0e14]/85 backdrop-blur-2xl shadow-[0_-8px_32px_rgba(0,0,0,0.7)] border-t border-[#00e5ff]/10">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center justify-center gap-1 w-14 h-14 transition-all duration-200 ${
                isActive
                  ? 'text-[#00e5ff] font-semibold drop-shadow-[0_0_12px_rgba(0,229,255,0.6)]'
                  : 'text-[#849396] hover:text-[#bac9cc]'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-[23px] transition-transform duration-200"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>

                {/* Unread badge on Chat */}
                {item.id === 'chat' && unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 rounded-full bg-[#00e5ff] text-[#001f24] font-bold text-[10px] leading-tight shadow-[0_0_8px_rgba(0,229,255,0.7)]">
                    {unreadCount}
                  </span>
                )}
              </div>

              <span className="text-[10px] tracking-wider uppercase font-medium">
                {item.label}
              </span>

              {/* Active ambient glowing dot */}
              {isActive && (
                <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-[#00e5ff] shadow-[0_0_6px_#00e5ff]"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
