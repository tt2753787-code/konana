import React, { useState } from 'react';
import {
  CURRENT_USER,
  LIVE_CIRCLES,
  SUGGESTED_USERS,
  FEED_POSTS,
} from '../data/mockData';
import { StoryCircle, FeedPost } from '../types';

interface HomeScreenProps {
  onOpenChat: (userId?: string) => void;
  onOpenStory: (story: StoryCircle) => void;
  onInspectRaw: (post: FeedPost) => void;
  onOpenCompose: () => void;
  onExploreMedia: () => void;
  onSeeAllFriends: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onOpenChat,
  onOpenStory,
  onInspectRaw,
  onOpenCompose,
  onExploreMedia,
  onSeeAllFriends,
}) => {
  const [posts, setPosts] = useState(FEED_POSTS);
  const [friendStatuses, setFriendStatuses] = useState<{ [key: string]: boolean }>({});
  const [dismissedSuggestions, setDismissedSuggestions] = useState<string[]>([]);
  const [unreadChatCount, setUnreadChatCount] = useState(3);
  const [savedPosts, setSavedPosts] = useState<{ [key: string]: boolean }>({});

  const toggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            isLiked,
            likes: isLiked ? post.likes + 1 : post.likes - 1,
          };
        }
        return post;
      })
    );
  };

  const toggleBookmark = (postId: string) => {
    setSavedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const toggleFriend = (id: string) => {
    setFriendStatuses((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const dismissSuggestion = (id: string) => {
    setDismissedSuggestions((prev) => [...prev, id]);
  };

  const markAllRead = () => {
    setUnreadChatCount(0);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pb-28 pt-3 space-y-6 select-none">
      {/* Welcome & Cloud Telemetry Bento Card */}
      <div className="relative overflow-hidden rounded-2xl bg-[#262a31] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.4)] border border-[#00e5ff]/15">
        {/* Ambient micro-glow background flare */}
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-[#00e5ff]/10 blur-2xl pointer-events-none"></div>

        <div className="flex items-start justify-between relative z-10">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-[#6cd3f7] font-semibold">
              Vault Synchronized
            </span>
            <h2 className="text-xl sm:text-2xl text-[#dfe2eb] font-bold tracking-tight">
              Welcome back, Alex
            </h2>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0a0e14]/80 text-[#00e5ff] shadow-sm border border-[#00e5ff]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse"></span>
            <span className="text-[10px] font-bold tracking-wide">ENCRYPTED</span>
          </div>
        </div>

        {/* Sync status & progress telemetry */}
        <div className="mt-4 pt-1 relative z-10">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <div className="flex items-center gap-1.5 text-[#dfe2eb] font-medium">
              <span className="material-symbols-outlined text-[15px] text-[#00e5ff]">
                cloud_done
              </span>
              <span>All media synced</span>
            </div>
            <span className="text-[#bac9cc] text-[11px]">14.2 GB of 50 GB free</span>
          </div>
          {/* Mini Cyan Track Indicator */}
          <div className="w-full h-1.5 rounded-full bg-[#0a0e14] overflow-hidden flex">
            <div
              className="h-full bg-gradient-to-r from-[#269dbe] via-[#00e5ff] to-[#c3f5ff] rounded-full shadow-[0_0_8px_rgba(0,229,255,0.7)] transition-all duration-500"
              style={{ width: '71.6%' }}
            ></div>
          </div>
        </div>
      </div>

      {/* Live Circles Carousel (Quick Status / Stories) */}
      <div className="flex flex-col space-y-2 -mx-4">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-base text-[#dfe2eb] font-semibold tracking-tight">
              Live Circles
            </span>
            <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-ping"></span>
          </div>
          <button
            onClick={onOpenCompose}
            className="text-[11px] uppercase tracking-wider text-[#6cd3f7] hover:text-[#00e5ff] transition-colors font-semibold"
          >
            Broadcast
          </button>
        </div>

        <div className="flex items-center gap-3.5 overflow-x-auto px-4 pt-1 pb-2 no-scrollbar scroll-smooth">
          {LIVE_CIRCLES.map((circle) => {
            const isSelf = circle.id === 'story_you';
            return (
              <div
                key={circle.id}
                onClick={() => onOpenStory(circle)}
                className={`flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group ${
                  circle.isViewed ? 'opacity-70' : 'opacity-100'
                }`}
              >
                <div
                  className={`relative w-16 h-16 rounded-full p-[2.5px] transition-transform duration-200 group-hover:scale-105 group-active:scale-95 ${
                    isSelf
                      ? 'bg-[#31353c]'
                      : circle.isLive
                      ? 'bg-gradient-to-tr from-[#00e5ff] via-[#6cd3f7] to-[#c3f5ff] shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                      : 'bg-[#31353c]'
                  }`}
                >
                  <div className="w-full h-full p-0.5 rounded-full bg-[#10141a] overflow-hidden">
                    <img
                      src={circle.avatar}
                      alt={circle.userName}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  {/* Add icon on Alex's circle */}
                  {isSelf && (
                    <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#00e5ff] text-[#001f24] flex items-center justify-center shadow-[0_0_8px_rgba(0,229,255,0.8)]">
                      <span className="material-symbols-outlined text-[15px] font-bold">add</span>
                    </div>
                  )}
                </div>

                <span
                  className={`text-[11px] truncate max-w-[64px] text-center font-medium ${
                    isSelf
                      ? 'text-[#bac9cc] group-hover:text-[#00e5ff]'
                      : 'text-[#dfe2eb] group-hover:text-[#00e5ff]'
                  }`}
                >
                  {circle.userName}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Suggested Connections Hub */}
      <div className="flex flex-col space-y-2 -mx-4">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#00e5ff]">
              person_add
            </span>
            <h3 className="text-base text-[#dfe2eb] font-semibold tracking-tight">
              Suggested for you
            </h3>
          </div>
          <button
            onClick={onSeeAllFriends}
            className="text-[11px] text-[#00e5ff] font-semibold uppercase tracking-wider hover:opacity-80 transition-opacity"
          >
            See all ({SUGGESTED_USERS.length})
          </button>
        </div>

        {/* Horizontal Swipe Cards */}
        <div className="flex items-center gap-3 overflow-x-auto px-4 pt-0.5 pb-2 no-scrollbar">
          {SUGGESTED_USERS.filter((u) => !dismissedSuggestions.includes(u.id)).map((user) => {
            const isConnected = friendStatuses[user.id];
            return (
              <div
                key={user.id}
                className="w-64 shrink-0 rounded-2xl bg-[#262a31] p-3.5 flex flex-col justify-between shadow-[0_4px_16px_rgba(0,0,0,0.35)] border border-white/5 relative overflow-hidden group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="relative shrink-0">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover shadow-[0_0_10px_rgba(0,229,255,0.2)]"
                    />
                    {user.isOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#00e5ff] ring-2 ring-[#262a31]"></span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-[#dfe2eb] font-semibold truncate">
                        {user.name}
                      </span>
                      {user.isVerified && (
                        <span
                          className="material-symbols-outlined text-[14px] text-[#00e5ff]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          verified
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#bac9cc] truncate">
                      {user.mutualFriends ? `${user.mutualFriends} mutual friends` : user.bio}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => toggleFriend(user.id)}
                    className={`flex-1 py-1.5 rounded-full font-bold text-xs tracking-wide shadow-md active:scale-95 transition-all text-center ${
                      isConnected
                        ? 'bg-[#181c22] text-[#6cd3f7] border border-[#00e5ff]/30'
                        : 'bg-[#00e5ff] text-[#001f24] hover:bg-[#6cd3f7] shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                    }`}
                  >
                    {isConnected ? '✓ Requested' : 'Add Friend'}
                  </button>
                  <button
                    onClick={() => dismissSuggestion(user.id)}
                    aria-label="Dismiss"
                    className="w-7 h-7 rounded-full bg-[#31353c] flex items-center justify-center text-[#bac9cc] hover:text-[#dfe2eb] active:scale-95 transition-transform"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Conversations Hub */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-base text-[#dfe2eb] font-semibold tracking-tight">
              Recent Chats
            </h3>
            {unreadChatCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#00e5ff] text-[#001f24] text-[10px] font-bold shadow-[0_0_10px_rgba(0,229,255,0.4)]">
                {unreadChatCount} NEW
              </span>
            )}
          </div>
          <button
            onClick={markAllRead}
            className="text-[11px] uppercase tracking-wider text-[#6cd3f7] hover:text-[#00e5ff] transition-colors font-semibold"
          >
            Mark Read
          </button>
        </div>

        <div className="flex flex-col space-y-2">
          {/* Chat 1: Elena Rostova (Unread, Active indicator) */}
          <div
            onClick={() => onOpenChat('user_elena')}
            className="relative overflow-hidden rounded-2xl bg-[#262a31] p-3.5 flex items-center gap-3.5 shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:bg-[#31353c] active:bg-[#1c2026] transition-all cursor-pointer border border-[#00e5ff]/20 group"
          >
            {/* Luminous left unread indicator line */}
            {unreadChatCount > 0 && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00e5ff] shadow-[0_0_8px_rgba(0,229,255,0.8)]"></div>
            )}
            <div className="relative w-12 h-12 shrink-0">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbLrNFlbHWklSfK-3IRFqXBq6mpNc-GSReGKt82kmxm6pcJPyB1HTbAgKZPq_vnbvXVUBCiUJaDVmNP9S0RGFN3EaC94jsXKYa-d4GtnNNsKHgTB9hVr4--PcMYpbFwETTcUrqevimRLQ1wEawZIQCVSs3JQmeL65aUUJb0mJERp5QdzjuwAsPjg8usAHVWJNy4wS6SFp23q2o8AHToIiEpksT_nJweFxXBJM7N1OzR77gCBa3CXzWzg"
                alt="Elena Rostova"
                className="w-full h-full rounded-full object-cover shadow-[0_0_12px_rgba(0,229,255,0.3)]"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#00e5ff] shadow-[0_0_6px_rgba(0,229,255,0.9)] ring-2 ring-[#262a31]"></span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#dfe2eb] font-bold truncate group-hover:text-[#00e5ff] transition-colors">
                  Elena Rostova
                </span>
                <span className="text-[11px] text-[#00e5ff] font-semibold">2m ago</span>
              </div>
              <p className="text-xs text-[#dfe2eb] truncate font-medium mt-0.5">
                Sent you 3 photos from Tokyo
              </p>
            </div>
            {unreadChatCount > 0 && (
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="w-5 h-5 rounded-full bg-[#00e5ff] text-[#001f24] text-[10px] font-bold flex items-center justify-center shadow-[0_0_8px_rgba(0,229,255,0.6)]">
                  {unreadChatCount}
                </span>
              </div>
            )}
          </div>

          {/* Chat 2: Marcus Chen */}
          <div
            onClick={() => onOpenChat('user_marcus')}
            className="relative overflow-hidden rounded-2xl bg-[#181c22] p-3.5 flex items-center gap-3.5 shadow-sm hover:bg-[#262a31] transition-all cursor-pointer border border-white/5 group"
          >
            <div className="relative w-12 h-12 shrink-0">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLL0kjfRibBBfyza1t2GO7m5TykB4pZzKpXuz1BRmsVDxn4E8yCbuXq5OIDlY_L2_Gtr60bzH8F-IFMgx96TNHrn9CEL8fQWuEUqAo4jbfPPxJV97e5CkpqpUMJcXi5JbtlllN7loBbFmeQclaBffhLeIXTF2f1OoVOnjXRPQ3-N-oGzyz-QQDQT_1NdWHYdC9Is389T8bTMBaIcBuOXgVOW6oxDLcw9QyS7xnsl0FW6Rvq1VD-D7HVg"
                alt="Marcus Chen"
                className="w-full h-full rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#849396] ring-2 ring-[#181c22]"></span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#dfe2eb] font-semibold truncate group-hover:text-[#00e5ff] transition-colors">
                  Marcus Chen
                </span>
                <span className="text-[11px] text-[#849396]">14m ago</span>
              </div>
              <p className="text-xs text-[#bac9cc] truncate mt-0.5">
                Let&apos;s test the new cloud storage API
              </p>
            </div>
            <div className="shrink-0 text-[#849396]">
              <span className="material-symbols-outlined text-[18px]">done_all</span>
            </div>
          </div>

          {/* Chat 3: Design Guild Group */}
          <div
            onClick={() => onOpenChat('group_design')}
            className="relative overflow-hidden rounded-2xl bg-[#181c22] p-3.5 flex items-center gap-3.5 shadow-sm hover:bg-[#262a31] transition-all cursor-pointer border border-white/5 group"
          >
            <div className="relative w-12 h-12 shrink-0 rounded-full bg-[#31353c] flex items-center justify-center text-[#00e5ff] font-bold shadow-inner">
              <span className="material-symbols-outlined text-[22px]">group_work</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="text-sm text-[#dfe2eb] font-semibold truncate group-hover:text-[#00e5ff] transition-colors">
                    Design Guild Group
                  </span>
                  <span className="material-symbols-outlined text-[13px] text-[#849396]">
                    lock
                  </span>
                </div>
                <span className="text-[11px] text-[#849396]">1h ago</span>
              </div>
              <p className="text-xs text-[#bac9cc] truncate mt-0.5">
                New mockup looks fire 🔥
              </p>
            </div>
            <div className="shrink-0 text-[#849396]">
              <span className="material-symbols-outlined text-[18px]">done</span>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Shared Media Feed */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#00e5ff]">
              perm_media
            </span>
            <h3 className="text-base text-[#dfe2eb] font-semibold tracking-tight">
              Latest Shared Media
            </h3>
          </div>
          <button
            onClick={onExploreMedia}
            className="text-[11px] uppercase tracking-wider text-[#6cd3f7] hover:text-[#00e5ff] transition-colors font-semibold"
          >
            Explore
          </button>
        </div>

        {/* Feed Posts */}
        {posts.map((post) => {
          const isSaved = savedPosts[post.id];
          return (
            <div
              key={post.id}
              className="rounded-2xl bg-[#262a31] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.45)] border border-[#00e5ff]/10"
            >
              {/* Author Info Header */}
              <div className="p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-9 h-9 rounded-full object-cover border border-[#00e5ff]/30"
                  />
                  <div>
                    <h4 className="text-sm text-[#dfe2eb] font-semibold leading-tight">
                      {post.author.name}
                    </h4>
                    <span className="text-[11px] text-[#849396]">
                      {post.location} • {post.timestamp}
                    </span>
                  </div>
                </div>
                <button
                  aria-label="More options"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#849396] hover:text-[#dfe2eb]"
                >
                  <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                </button>
              </div>

              {/* Rich Visual Component */}
              <div
                onClick={() => onInspectRaw(post)}
                className="relative w-full aspect-[4/3] bg-[#0a0e14] group cursor-pointer overflow-hidden"
              >
                <img
                  src={post.mediaUrl}
                  alt={post.tag}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"></div>

                {/* Video Play Button if video */}
                {post.mediaType === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#00e5ff]/90 text-[#001f24] flex items-center justify-center shadow-[0_0_24px_rgba(0,229,255,0.7)] group-hover:scale-110 active:scale-95 transition-transform">
                      <span
                        className="material-symbols-outlined text-[32px] ml-1"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        play_arrow
                      </span>
                    </div>
                  </div>
                )}

                {/* Tagged Pill Overlay */}
                <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-[#0a0e14]/80 backdrop-blur-md flex items-center gap-1.5 text-[#dfe2eb] text-xs shadow-md border border-white/10">
                  <span className="material-symbols-outlined text-[14px] text-[#00e5ff]">
                    local_offer
                  </span>
                  <span className="font-medium">{post.tag}</span>
                </div>

                {/* High-Res Badge */}
                {post.qualityBadge && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-[#0a0e14]/70 backdrop-blur-md text-[#00e5ff] text-[10px] font-bold uppercase tracking-wider border border-[#00e5ff]/30">
                    {post.qualityBadge}
                  </div>
                )}

                {/* Duration Tag if video */}
                {post.duration && (
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-[#0a0e14]/80 backdrop-blur-md text-[#dfe2eb] text-[11px] font-mono">
                    {post.duration}
                  </div>
                )}
              </div>

              {/* Engagement Telemetry Footer */}
              <div className="p-3.5 flex items-center justify-between bg-[#262a31]">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1.5 transition-colors ${
                      post.isLiked
                        ? 'text-[#ffb4ab] drop-shadow-[0_0_8px_rgba(255,180,171,0.5)]'
                        : 'text-[#849396] hover:text-[#dfe2eb]'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: post.isLiked ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      favorite
                    </span>
                    <span className="text-xs font-bold">{post.likes}</span>
                  </button>

                  <button
                    onClick={() => onInspectRaw(post)}
                    className="flex items-center gap-1.5 text-[#849396] hover:text-[#dfe2eb] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">mode_comment</span>
                    <span className="text-xs font-semibold">{post.commentsCount}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: post.tag,
                          text: post.caption,
                          url: window.location.href,
                        }).catch(() => {});
                      } else {
                        onInspectRaw(post);
                      }
                    }}
                    className="text-[#849396] hover:text-[#dfe2eb] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">share</span>
                  </button>
                </div>

                <button
                  onClick={() => toggleBookmark(post.id)}
                  className={`transition-colors ${
                    isSaved ? 'text-[#00e5ff]' : 'text-[#849396] hover:text-[#00e5ff]'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {isSaved ? 'bookmark' : 'bookmark_border'}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Action Button (FAB) */}
      <div className="fixed right-5 bottom-20 z-40">
        <button
          onClick={onOpenCompose}
          aria-label="New Chat or Share Media"
          className="h-13 px-5 rounded-full bg-[#00e5ff] text-[#001f24] flex items-center gap-2 shadow-[0_6px_24px_rgba(0,229,255,0.55),0_0_12px_rgba(0,229,255,0.4)] hover:bg-[#6cd3f7] active:scale-95 transition-all focus:outline-none cursor-pointer"
        >
          <span className="material-symbols-outlined text-[24px] font-bold">add</span>
          <span className="text-xs font-bold tracking-wider uppercase">COMPOSE</span>
        </button>
      </div>
    </div>
  );
};
