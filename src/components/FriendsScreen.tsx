import React, { useState } from 'react';
import {
  ELENA_USER,
  ONLINE_USERS,
  SUGGESTED_USERS,
  FRIENDS_LIST,
} from '../data/mockData';
import { UserProfile } from '../types';

interface FriendsScreenProps {
  onOpenChat: (userId?: string) => void;
  onOpenUserProfile?: (user: UserProfile) => void;
}

export const FriendsScreen: React.FC<FriendsScreenProps> = ({
  onOpenChat,
  onOpenUserProfile,
}) => {
  const [searchQuery, setSearchQuery] = useState('@elena');
  const [activeFilter, setActiveFilter] = useState<'all' | 'online' | 'mutual' | 'recent'>('all');
  const [friends, setFriends] = useState(FRIENDS_LIST);
  const [friendStatuses, setFriendStatuses] = useState<{ [key: string]: boolean }>({});
  const [onlineList] = useState(ONLINE_USERS);

  const toggleFriend = (id: string) => {
    setFriendStatuses((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleResetSearch = () => {
    setSearchQuery('@elena');
    setActiveFilter('all');
  };

  // Check if query matches Elena or generic search
  const isQueryMatchingElena =
    searchQuery.trim().toLowerCase().includes('elena') ||
    searchQuery.trim().toLowerCase().includes('@elena') ||
    searchQuery.trim().toLowerCase() === '@';

  const isQueryEmpty = searchQuery.trim().length === 0;

  // Filter friends list based on search and active filter
  const filteredFriends = friends.filter((friend) => {
    if (activeFilter === 'online' && !friend.isOnline) return false;
    if (!isQueryEmpty && !isQueryMatchingElena) {
      const q = searchQuery.toLowerCase().replace('@', '');
      return (
        friend.name.toLowerCase().includes(q) ||
        friend.handle.toLowerCase().includes(q) ||
        friend.bio?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pb-28 pt-2 gap-5 select-none">
      {/* Search & Filter Unit */}
      <section className="flex flex-col gap-2.5 pt-1">
        {/* Search Input Floating Pill */}
        <div className="relative flex items-center w-full h-[52px] px-3.5 rounded-full bg-[#262a31]/95 border border-[#00e5ff]/20 shadow-[0_4px_24px_rgba(0,0,0,0.5)] focus-within:border-[#00e5ff] transition-colors">
          <span className="material-symbols-outlined text-[20px] text-[#00e5ff] drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search people on Konana..."
            className="flex-1 bg-transparent px-2.5 text-[#dfe2eb] text-sm placeholder:text-[#849396] focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              aria-label="Clear Search Input"
              className="flex items-center justify-center w-7 h-7 rounded-full bg-[#31353c] text-[#bac9cc] hover:text-[#00e5ff] transition-transform active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>

        {/* Filter Chips Horizontal Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setActiveFilter('all')}
            className={`flex items-center gap-1.5 h-8 px-3.5 rounded-full text-xs font-semibold transition-all ${
              activeFilter === 'all'
                ? 'bg-[#00e5ff] text-[#001f24] shadow-[0_0_14px_rgba(0,229,255,0.35)]'
                : 'bg-[#262a31] text-[#bac9cc] hover:text-[#00e5ff]'
            }`}
          >
            <span>All</span>
          </button>

          <button
            onClick={() => setActiveFilter('online')}
            className={`flex items-center gap-1.5 h-8 px-3.5 rounded-full text-xs font-semibold transition-all ${
              activeFilter === 'online'
                ? 'bg-[#00e5ff] text-[#001f24] shadow-[0_0_14px_rgba(0,229,255,0.35)]'
                : 'bg-[#262a31] text-[#bac9cc] hover:text-[#00e5ff]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse"></span>
            <span>Online Now</span>
          </button>

          <button
            onClick={() => setActiveFilter('mutual')}
            className={`flex items-center gap-1.5 h-8 px-3.5 rounded-full text-xs font-semibold transition-all ${
              activeFilter === 'mutual'
                ? 'bg-[#00e5ff] text-[#001f24] shadow-[0_0_14px_rgba(0,229,255,0.35)]'
                : 'bg-[#262a31] text-[#bac9cc] hover:text-[#00e5ff]'
            }`}
          >
            <span>Mutual Friends</span>
          </button>

          <button
            onClick={() => setActiveFilter('recent')}
            className={`flex items-center gap-1.5 h-8 px-3.5 rounded-full text-xs font-semibold transition-all ${
              activeFilter === 'recent'
                ? 'bg-[#00e5ff] text-[#001f24] shadow-[0_0_14px_rgba(0,229,255,0.35)]'
                : 'bg-[#262a31] text-[#bac9cc] hover:text-[#00e5ff]'
            }`}
          >
            <span>Recently Active</span>
          </button>
        </div>
      </section>

      {/* Live Search Discovery Card (Query: "@elena") */}
      {isQueryMatchingElena && (
        <section className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] uppercase tracking-wider text-[#00daf3] font-bold">
              Instant Match
            </span>
            <span className="text-[11px] text-[#bac9cc]">
              Query: <span className="text-[#00e5ff] font-semibold">{searchQuery}</span>
            </span>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-[#181c22] p-4 shadow-[0_4px_24px_-2px_rgba(0,0,0,0.7)] border border-[#00e5ff]/25 flex flex-col gap-3.5">
            {/* Glow ambient backdrop element */}
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-[#00e5ff]/10 blur-2xl pointer-events-none"></div>

            <div className="flex items-start gap-3.5">
              <div className="relative shrink-0">
                <img
                  className="w-14 h-14 rounded-full object-cover shadow-[0_0_16px_rgba(0,229,255,0.25)] border border-[#00e5ff]/40"
                  src={ELENA_USER.avatar}
                  alt={ELENA_USER.name}
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff] ring-2 ring-[#181c22]"></span>
              </div>
              <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base text-[#dfe2eb] font-bold truncate">
                    {ELENA_USER.name}
                  </h3>
                  <span
                    className="material-symbols-outlined text-[16px] text-[#00e5ff]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                </div>
                <span className="text-xs text-[#00e5ff] font-semibold">{ELENA_USER.handle}</span>
                <span className="text-xs text-[#849396] truncate">{ELENA_USER.email}</span>
                <div className="flex items-center gap-1.5 mt-1 text-[#bac9cc] text-[11px]">
                  <span className="material-symbols-outlined text-[13px] text-[#6cd3f7]">
                    group
                  </span>
                  <span>18 mutual friends</span>
                </div>
              </div>
            </div>

            {/* Action Row */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => onOpenChat('user_elena')}
                className="flex-1 h-11 flex items-center justify-center gap-1.5 rounded-full bg-[#00e5ff] text-[#001f24] text-sm font-bold shadow-[0_0_18px_rgba(0,229,255,0.4)] hover:bg-[#6cd3f7] active:scale-[0.98] transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Message</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 h-11 px-4 rounded-full bg-[#262a31] text-[#00e5ff] text-xs font-semibold border border-[#00e5ff]/20">
                <span
                  className="material-symbols-outlined text-[18px] text-[#00e5ff]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <span>Connected</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Online Friends Rail */}
      <section className="flex flex-col gap-2 -mx-4">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-1.5">
            <h2 className="text-base text-[#dfe2eb] font-semibold">Online Now</h2>
            <span className="flex items-center justify-center px-1.5 py-0.5 rounded-full bg-[#00e5ff]/20 text-[#00e5ff] text-[10px] font-bold">
              {onlineList.length + 9}
            </span>
          </div>
          <button
            onClick={() => setActiveFilter('online')}
            className="text-[11px] uppercase tracking-wider text-[#00e5ff] font-semibold hover:underline"
          >
            See All
          </button>
        </div>

        {/* Bubble Rail */}
        <div className="flex items-center gap-3.5 overflow-x-auto px-4 pb-1 no-scrollbar">
          {onlineList.map((user) => (
            <div
              key={user.id}
              onClick={() => onOpenChat(user.id)}
              className="flex flex-col items-center gap-1 shrink-0 cursor-pointer group"
            >
              <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-[#00e5ff] to-[#6cd3f7] shadow-[0_0_12px_rgba(0,229,255,0.35)] transition-transform group-hover:scale-105">
                <img
                  className="w-13 h-13 rounded-full object-cover p-0.5 bg-[#0a0e14]"
                  src={user.avatar}
                  alt={user.name}
                />
                <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-[#00e5ff] shadow-[0_0_6px_#00e5ff] ring-2 ring-[#10141a]"></span>
              </div>
              <span className="text-[11px] text-[#dfe2eb] group-hover:text-[#00e5ff] max-w-[62px] truncate text-center font-medium">
                {user.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Suggested For You (Card Carousel) */}
      <section className="flex flex-col gap-2 -mx-4">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-1.5">
            <h2 className="text-base text-[#dfe2eb] font-semibold">Suggested for You</h2>
            <span className="material-symbols-outlined text-[18px] text-[#00e5ff]">
              auto_awesome
            </span>
          </div>
          <span className="text-[11px] text-[#849396]">Based on activity</span>
        </div>

        <div className="flex gap-3 overflow-x-auto px-4 pb-1 no-scrollbar">
          {SUGGESTED_USERS.map((user) => {
            const isAdded = friendStatuses[user.id];
            return (
              <div
                key={user.id}
                className="w-[190px] shrink-0 rounded-2xl bg-[#181c22] p-3.5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.6)] border border-white/5"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-2">
                    <img
                      className="w-16 h-16 rounded-full object-cover shadow-[0_0_12px_rgba(0,229,255,0.2)] border border-[#00e5ff]/20"
                      src={user.avatar}
                      alt={user.name}
                    />
                    <span
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-[#181c22] ${
                        user.isOnline ? 'bg-[#00e5ff]' : 'bg-[#31353c]'
                      }`}
                    ></span>
                  </div>
                  <h4 className="text-sm font-bold text-[#dfe2eb] truncate w-full">{user.name}</h4>
                  <span className="text-xs text-[#00e5ff] mb-1 font-semibold">{user.handle}</span>
                  <p className="text-[11px] text-[#bac9cc] line-clamp-2 mb-2 leading-tight">
                    {user.bio}
                  </p>
                  <div className="flex items-center gap-1 text-[#6cd3f7] bg-[#262a31]/80 px-2 py-0.5 rounded-full text-[10px] mb-3 border border-[#00e5ff]/10">
                    <span className="material-symbols-outlined text-[12px] text-[#6cd3f7]">
                      hub
                    </span>
                    <span>{user.mutualFriends} mutuals</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleFriend(user.id)}
                  className={`w-full h-8 flex items-center justify-center gap-1 rounded-full text-xs font-bold active:scale-95 transition-all ${
                    isAdded
                      ? 'bg-[#262a31] text-[#00e5ff] border border-[#00e5ff]/40'
                      : 'bg-[#00e5ff] text-[#001f24] shadow-[0_0_12px_rgba(0,229,255,0.3)] hover:bg-[#6cd3f7]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">
                    {isAdded ? 'check' : 'person_add'}
                  </span>
                  <span>{isAdded ? 'Added' : 'Add Friend'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Your Friends List (328 friends) */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-baseline gap-1.5">
            <h2 className="text-base text-[#dfe2eb] font-semibold">Your Friends</h2>
            <span className="text-xs text-[#00e5ff] font-bold">328</span>
          </div>
          <div className="flex items-center gap-1 text-[#849396] text-xs cursor-pointer hover:text-[#dfe2eb]">
            <span className="material-symbols-outlined text-[16px]">swap_vert</span>
            <span>Recent First</span>
          </div>
        </div>

        {/* Friends Stack Container */}
        <div className="flex flex-col gap-2">
          {filteredFriends.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center justify-between p-3 rounded-2xl bg-[#181c22] hover:bg-[#262a31] transition-all border border-white/5 group"
            >
              <div
                onClick={() => onOpenChat(friend.id)}
                className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer"
              >
                <div className="relative shrink-0">
                  <img
                    className="w-12 h-12 rounded-full object-cover border border-[#00e5ff]/20"
                    src={friend.avatar}
                    alt={friend.name}
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-[#181c22] ${
                      friend.isOnline
                        ? 'bg-[#00e5ff] shadow-[0_0_6px_#00e5ff]'
                        : 'bg-[#3b494c]'
                    }`}
                  ></span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-[#dfe2eb] truncate group-hover:text-[#00e5ff] transition-colors">
                      {friend.name}
                    </span>
                    <span className="text-[11px] text-[#00e5ff] font-semibold">
                      {friend.handle}
                    </span>
                  </div>
                  <p className="text-xs text-[#849396] truncate">{friend.bio}</p>
                  <span
                    className={`text-[10px] font-medium ${
                      friend.isOnline ? 'text-[#00e5ff] font-semibold' : 'text-[#849396]'
                    }`}
                  >
                    {friend.lastActive}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onOpenChat(friend.id)}
                aria-label={`Direct message ${friend.name}`}
                className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-[#262a31] text-[#00e5ff] hover:bg-[#00e5ff] hover:text-[#001f24] shadow-[0_0_12px_rgba(0,229,255,0.15)] active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[19px]">chat_bubble</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Empty State Demo Panel (Toggled if search doesn't match) */}
      {!isQueryMatchingElena && filteredFriends.length === 0 && (
        <section className="flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-[#181c22] shadow-[0_4px_24px_rgba(0,0,0,0.6)] border border-[#00e5ff]/20 my-4">
          <div className="relative flex items-center justify-center w-20 h-20 mb-3">
            <div className="absolute inset-0 rounded-full bg-[#00e5ff]/10 blur-xl animate-pulse"></div>
            <div className="w-16 h-16 rounded-full bg-[#262a31] flex items-center justify-center shadow-[0_0_16px_rgba(0,229,255,0.2)]">
              <span className="material-symbols-outlined text-[32px] text-[#00e5ff]">
                person_search
              </span>
            </div>
          </div>
          <h3 className="text-lg text-[#dfe2eb] font-semibold mb-1">No users found</h3>
          <p className="text-xs text-[#849396] max-w-[260px] mb-4">
            We couldn&apos;t locate anyone matching &quot;{searchQuery}&quot; on the Konana network.
          </p>
          <button
            onClick={handleResetSearch}
            className="h-10 px-5 flex items-center gap-1.5 rounded-full bg-[#00e5ff] text-[#001f24] text-xs font-bold shadow-[0_0_16px_rgba(0,229,255,0.35)] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">restart_alt</span>
            <span>Reset Search (@elena)</span>
          </button>
        </section>
      )}
    </div>
  );
};
