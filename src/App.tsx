/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType, StoryCircle, FeedPost } from './types';
import { LIVE_CIRCLES, FEED_POSTS } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { OnboardingScreen } from './components/OnboardingScreen';
import { HomeScreen } from './components/HomeScreen';
import { FriendsScreen } from './components/FriendsScreen';
import { ChatScreen } from './components/ChatScreen';
import { MediaScreen } from './components/MediaScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { StoryViewerModal } from './components/StoryViewerModal';
import { RawMediaModal } from './components/RawMediaModal';
import { CallModal } from './components/CallModal';
import { ComposeModal } from './components/ComposeModal';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [viewMode, setViewMode] = useState<'mobile-frame' | 'responsive'>('mobile-frame');

  // Modals state
  const [activeStory, setActiveStory] = useState<StoryCircle | null>(null);
  const [inspectingPost, setInspectingPost] = useState<FeedPost | null>(null);
  const [activeCall, setActiveCall] = useState<'voice' | 'video' | null>(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  // Story next/prev handling
  const handleNextStory = () => {
    if (!activeStory) return;
    const currentIndex = LIVE_CIRCLES.findIndex((s) => s.id === activeStory.id);
    if (currentIndex >= 0 && currentIndex < LIVE_CIRCLES.length - 1) {
      setActiveStory(LIVE_CIRCLES[currentIndex + 1]);
    } else {
      setActiveStory(null);
    }
  };

  const handlePrevStory = () => {
    if (!activeStory) return;
    const currentIndex = LIVE_CIRCLES.findIndex((s) => s.id === activeStory.id);
    if (currentIndex > 0) {
      setActiveStory(LIVE_CIRCLES[currentIndex - 1]);
    } else {
      setActiveStory(null);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0e14] text-[#dfe2eb] flex flex-col items-center">
      {/* Top Experience Showcase Control Toolbar */}
      <nav aria-label="Demo View Switcher" className="w-full bg-[#10141a]/95 backdrop-blur-xl border-b border-[#00e5ff]/15 px-3 py-2 z-50 sticky top-0 flex flex-wrap items-center justify-between gap-2 shadow-lg">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00e5ff]/15 border border-[#00e5ff]/30 text-[#00e5ff] text-[11px] font-bold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse"></span>
            KONANA OS v2.4
          </span>
          <span className="text-xs text-[#849396] hidden sm:inline">
            Obsidian Cyan Luxury Architecture
          </span>
        </div>

        {/* Quick Screen Selector Pills */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => setIsAuthenticated(false)}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              !isAuthenticated
                ? 'bg-[#00e5ff] text-[#001f24] shadow-[0_0_10px_rgba(0,229,255,0.4)]'
                : 'bg-[#181c22] text-[#bac9cc] hover:text-[#00e5ff]'
            }`}
          >
            Google 1-Tap
          </button>
          <button
            onClick={() => {
              setIsAuthenticated(true);
              setActiveTab('home');
            }}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              isAuthenticated && activeTab === 'home'
                ? 'bg-[#00e5ff] text-[#001f24] shadow-[0_0_10px_rgba(0,229,255,0.4)]'
                : 'bg-[#181c22] text-[#bac9cc] hover:text-[#00e5ff]'
            }`}
          >
            Home Feed
          </button>
          <button
            onClick={() => {
              setIsAuthenticated(true);
              setActiveTab('friends');
            }}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              isAuthenticated && activeTab === 'friends'
                ? 'bg-[#00e5ff] text-[#001f24] shadow-[0_0_10px_rgba(0,229,255,0.4)]'
                : 'bg-[#181c22] text-[#bac9cc] hover:text-[#00e5ff]'
            }`}
          >
            Friends &amp; Search
          </button>
          <button
            onClick={() => {
              setIsAuthenticated(true);
              setActiveTab('chat');
            }}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              isAuthenticated && activeTab === 'chat'
                ? 'bg-[#00e5ff] text-[#001f24] shadow-[0_0_10px_rgba(0,229,255,0.4)]'
                : 'bg-[#181c22] text-[#bac9cc] hover:text-[#00e5ff]'
            }`}
          >
            Elena Chat
          </button>
          <button
            onClick={() => {
              setIsAuthenticated(true);
              setActiveTab('media');
            }}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              isAuthenticated && activeTab === 'media'
                ? 'bg-[#00e5ff] text-[#001f24] shadow-[0_0_10px_rgba(0,229,255,0.4)]'
                : 'bg-[#181c22] text-[#bac9cc] hover:text-[#00e5ff]'
            }`}
          >
            Cloud Vault
          </button>
          <button
            onClick={() => {
              setIsAuthenticated(true);
              setActiveTab('profile');
            }}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              isAuthenticated && activeTab === 'profile'
                ? 'bg-[#00e5ff] text-[#001f24] shadow-[0_0_10px_rgba(0,229,255,0.4)]'
                : 'bg-[#181c22] text-[#bac9cc] hover:text-[#00e5ff]'
            }`}
          >
            Alex Profile
          </button>
        </div>

        {/* Viewport Mode Switcher */}
        <div className="flex items-center gap-1 bg-[#181c22] p-0.5 rounded-full border border-white/5">
          <button
            onClick={() => setViewMode('mobile-frame')}
            className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-all ${
              viewMode === 'mobile-frame'
                ? 'bg-[#262a31] text-[#00e5ff] shadow-sm'
                : 'text-[#849396] hover:text-[#dfe2eb]'
            }`}
            title="Android Flagship Viewport"
          >
            <span className="material-symbols-outlined text-[15px]">smartphone</span>
            <span className="hidden sm:inline">Mobile Frame</span>
          </button>
          <button
            onClick={() => setViewMode('responsive')}
            className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-all ${
              viewMode === 'responsive'
                ? 'bg-[#262a31] text-[#00e5ff] shadow-sm'
                : 'text-[#849396] hover:text-[#dfe2eb]'
            }`}
            title="Expand Full Width"
          >
            <span className="material-symbols-outlined text-[15px]">fit_screen</span>
            <span className="hidden sm:inline">Fluid</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="w-full flex justify-center py-0 sm:py-6 px-0 sm:px-4">
        {/* Mobile Device Enclosure Container */}
        <div
          className={`w-full transition-all duration-300 relative bg-[#10141a] overflow-hidden ${
            viewMode === 'mobile-frame'
              ? 'max-w-[420px] min-h-[880px] sm:rounded-[44px] sm:border-[8px] sm:border-[#1c2026] sm:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_20px_rgba(0,229,255,0.15)] sm:ring-1 sm:ring-[#00e5ff]/20'
              : 'max-w-2xl min-h-screen'
          }`}
        >
          {/* Top Notch / Camera Punch-Hole on Frame View */}
          {viewMode === 'mobile-frame' && (
            <div className="hidden sm:flex absolute top-3 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#0a0e14] rounded-full z-50 items-center justify-center pointer-events-none">
              <div className="w-3 h-3 rounded-full bg-[#181c22] border border-[#00e5ff]/30 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#00e5ff]/60"></div>
              </div>
            </div>
          )}

          {/* Screen Content Routing */}
          {!isAuthenticated ? (
            <OnboardingScreen
              onLogin={() => {
                setIsAuthenticated(true);
                setActiveTab('home');
              }}
            />
          ) : (
            <div className="relative min-h-[850px] flex flex-col justify-between bg-[#10141a]">
              {/* Persistent Header with Contextual Awareness */}
              <Header
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onOpenSearch={() => setActiveTab('friends')}
                onOpenProfile={() => setActiveTab('profile')}
                onBackFromChat={() => setActiveTab('home')}
                onStartCall={(type) => setActiveCall(type)}
              />

              {/* Active Tab Screen */}
              <main className="flex-1 w-full">
                {activeTab === 'home' && (
                  <HomeScreen
                    onOpenChat={() => setActiveTab('chat')}
                    onOpenStory={(story) => setActiveStory(story)}
                    onInspectRaw={(post) => setInspectingPost(post)}
                    onOpenCompose={() => setIsComposeOpen(true)}
                    onExploreMedia={() => setActiveTab('media')}
                    onSeeAllFriends={() => setActiveTab('friends')}
                  />
                )}

                {activeTab === 'friends' && (
                  <FriendsScreen
                    onOpenChat={() => setActiveTab('chat')}
                    onOpenUserProfile={() => setActiveTab('profile')}
                  />
                )}

                {activeTab === 'chat' && (
                  <ChatScreen
                    onInspectRaw={(post) => setInspectingPost(post)}
                    onStartCall={(type) => setActiveCall(type)}
                  />
                )}

                {activeTab === 'media' && (
                  <MediaScreen onInspectRaw={(post) => setInspectingPost(post)} />
                )}

                {activeTab === 'profile' && (
                  <ProfileScreen
                    onLogout={() => setIsAuthenticated(false)}
                    onOpenVault={() => setActiveTab('media')}
                  />
                )}
              </main>

              {/* Fixed Bottom Tab Navigation */}
              {activeTab !== 'chat' && (
                <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} unreadCount={3} />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modals & Overlays */}
      {activeStory && (
        <StoryViewerModal
          story={activeStory}
          onClose={() => setActiveStory(null)}
          onNext={handleNextStory}
          onPrev={handlePrevStory}
        />
      )}

      {inspectingPost && (
        <RawMediaModal post={inspectingPost} onClose={() => setInspectingPost(null)} />
      )}

      {activeCall && <CallModal type={activeCall} onClose={() => setActiveCall(null)} />}

      {isComposeOpen && (
        <ComposeModal
          onClose={() => setIsComposeOpen(false)}
          onSelectAction={(action) => {
            if (action === 'chat') setActiveTab('chat');
            else if (action === 'media') setActiveTab('media');
            else setActiveStory(LIVE_CIRCLES[0]);
          }}
        />
      )}
    </div>
  );
}
