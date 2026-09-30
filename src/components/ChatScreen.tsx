import React, { useState, useEffect, useRef } from 'react';
import {
  CURRENT_USER,
  ELENA_USER,
  INITIAL_CHAT_MESSAGES,
} from '../data/mockData';
import { ChatMessage, FeedPost } from '../types';

interface ChatScreenProps {
  onInspectRaw: (post: FeedPost) => void;
  onStartCall: (type: 'voice' | 'video') => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  onInspectRaw,
  onStartCall,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(12);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioIntervalRef = useRef<any>(null);

  // Audio waveform simulation
  useEffect(() => {
    if (isPlayingAudio) {
      audioIntervalRef.current = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 34) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 1;
        });
      }, 500);
    } else {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    }
    return () => {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    };
  }, [isPlayingAudio]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderId: CURRENT_USER.id,
      senderName: CURRENT_USER.name,
      senderAvatar: CURRENT_USER.avatar,
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isEncrypted: true,
      status: 'read',
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setShowEmojiPicker(false);

    // Simulate Elena typing and replying
    setIsTyping(true);
    setTimeout(() => {
      const replies = [
        "That's unbelievable speed! The color reproduction on the RAW file is flawless.",
        "Just received the sync packet on my end. 0% loss on 48MP.",
        "Let me run this through our shader test bench right now.",
        "Brilliant! The new P2P conduit is holding up even on high bitrate video.",
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];

      const elenaMsg: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        senderId: ELENA_USER.id,
        senderName: ELENA_USER.name,
        senderAvatar: ELENA_USER.avatar,
        text: randomReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isEncrypted: true,
        status: 'read',
      };

      setMessages((prev) => [...prev, elenaMsg]);
      setIsTyping(false);
    }, 2000);
  };

  const handleQuickUpload = (type: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (type === 'camera' || type === 'media') {
      const mediaMsg: ChatMessage = {
        id: `msg_media_${Date.now()}`,
        senderId: CURRENT_USER.id,
        senderName: CURRENT_USER.name,
        senderAvatar: CURRENT_USER.avatar,
        timestamp: timeStr,
        isEncrypted: true,
        status: 'read',
        media: {
          type: 'image',
          url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmNTkmJQbUjoYMn8gNzSJlKfNXJIQ8hPSe4jsvui0MSY3WV0CEXlFO2NnyraORP1T0ISANsdWuFYmauHOlU4JyFlgo8PXh6vemFiRwKBVWETd-Ess62pnXRw4Wsm-akI0mGPqpI3XtTkd8xifc9PXEIbeyM7dwtnzW2GjzL0mhgGVT36z630Oae5UAtRQ-vZm0OtcGCExv6dRnaB3ljSIxYCYFnMJUUFMNzc5nuGuBAHR1GAPnpRJqxw',
          caption: 'Instant Camera Upload • Tokyo Station',
          size: '18.4 MB (Lossless)',
          isCloudSynced: true,
        },
      };
      setMessages((prev) => [...prev, mediaMsg]);
    } else if (type === 'audio') {
      const audioMsg: ChatMessage = {
        id: `msg_audio_${Date.now()}`,
        senderId: CURRENT_USER.id,
        senderName: CURRENT_USER.name,
        senderAvatar: CURRENT_USER.avatar,
        timestamp: timeStr,
        isEncrypted: true,
        status: 'read',
        media: {
          type: 'audio',
          duration: '0:22',
        },
      };
      setMessages((prev) => [...prev, audioMsg]);
    } else if (type === 'location') {
      const locMsg: ChatMessage = {
        id: `msg_loc_${Date.now()}`,
        senderId: CURRENT_USER.id,
        senderName: CURRENT_USER.name,
        senderAvatar: CURRENT_USER.avatar,
        text: '📍 Shared Live P2P encrypted coordinates: 35.6595° N, 139.7005° E (Shibuya)',
        timestamp: timeStr,
        isEncrypted: true,
        status: 'read',
      };
      setMessages((prev) => [...prev, locMsg]);
    } else {
      const fileMsg: ChatMessage = {
        id: `msg_file_${Date.now()}`,
        senderId: CURRENT_USER.id,
        senderName: CURRENT_USER.name,
        senderAvatar: CURRENT_USER.avatar,
        text: '📎 Shared Konana_Vault_Sync_Manifest_v2.json (142 KB)',
        timestamp: timeStr,
        isEncrypted: true,
        status: 'read',
      };
      setMessages((prev) => [...prev, fileMsg]);
    }
  };

  const addEmoji = (emoji: string) => {
    setInputText((prev) => prev + emoji);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto relative select-none pb-28">
      {/* Top Action Sub-bar with Elena's Presence Telemetry */}
      <div className="sticky top-0 z-40 px-4 py-2.5 bg-[#0a0e14]/90 backdrop-blur-xl flex items-center justify-between shadow-[0_8px_30px_rgba(0,0,0,0.45)] border-b border-[#00e5ff]/10">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative shrink-0">
            <div className="w-11 h-11 rounded-full overflow-hidden shadow-[0_0_12px_rgba(0,229,255,0.2)] border border-[#00e5ff]/30">
              <img
                src={ELENA_USER.avatar}
                alt={ELENA_USER.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#00e5ff] rounded-full shadow-[0_0_8px_#00e5ff] flex items-center justify-center ring-2 ring-[#0a0e14]">
              <span className="w-1.5 h-1.5 bg-[#001f24] rounded-full animate-ping"></span>
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-sm text-[#dfe2eb] font-bold truncate">
                {ELENA_USER.name}
              </span>
              <span
                className="material-symbols-outlined text-[#00e5ff] text-[16px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </div>
            {isTyping ? (
              <div className="flex items-center gap-1.5">
                <span className="flex gap-0.5 items-center">
                  <span className="w-1 h-1 bg-[#00e5ff] rounded-full animate-bounce"></span>
                  <span className="w-1 h-1 bg-[#00e5ff] rounded-full animate-bounce [animation-delay:0.15s]"></span>
                  <span className="w-1 h-1 bg-[#00e5ff] rounded-full animate-bounce [animation-delay:0.3s]"></span>
                </span>
                <span className="text-[10px] text-[#00e5ff] tracking-wider uppercase font-semibold">
                  typing...
                </span>
              </div>
            ) : (
              <span className="text-[11px] text-[#6cd3f7]">Active now • Encrypted</span>
            )}
          </div>
        </div>

        {/* Calls & Contextual Overflow */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onStartCall('voice')}
            aria-label="Start Voice Call"
            className="w-9 h-9 rounded-full bg-[#1c2026] flex items-center justify-center text-[#6cd3f7] hover:text-[#00e5ff] hover:bg-[#262a31] active:scale-95 transition-all shadow-md border border-white/5"
          >
            <span className="material-symbols-outlined text-[19px]">call</span>
          </button>
          <button
            onClick={() => onStartCall('video')}
            aria-label="Start Video Call"
            className="w-9 h-9 rounded-full bg-[#1c2026] flex items-center justify-center text-[#6cd3f7] hover:text-[#00e5ff] hover:bg-[#262a31] active:scale-95 transition-all shadow-md border border-white/5"
          >
            <span className="material-symbols-outlined text-[19px]">videocam</span>
          </button>
          <button
            aria-label="Conversation Options"
            className="w-9 h-9 rounded-full bg-[#1c2026] flex items-center justify-center text-[#849396] hover:text-[#dfe2eb] hover:bg-[#262a31] active:scale-95 transition-all shadow-md border border-white/5"
          >
            <span className="material-symbols-outlined text-[19px]">more_vert</span>
          </button>
        </div>
      </div>

      {/* Message Stream Flow */}
      <div className="flex flex-col px-4 pt-3 pb-4 space-y-4">
        {/* Date Separation Pill */}
        <div className="flex justify-center items-center my-1">
          <div className="px-3.5 py-1 rounded-full bg-[#262a31]/80 backdrop-blur-md shadow-sm border border-[#00e5ff]/10">
            <span className="text-[10px] text-[#bac9cc] tracking-wider uppercase font-semibold">
              Today, October 24
            </span>
          </div>
        </div>

        {/* Render Messages */}
        {messages.map((msg) => {
          const isMe = msg.senderId === CURRENT_USER.id;

          // Case 1: Audio Memo Bubble
          if (msg.media?.type === 'audio') {
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  isMe ? 'items-end self-end' : 'items-start self-start'
                } max-w-[88%] space-y-1`}
              >
                <div
                  className={`rounded-2xl ${
                    isMe ? 'rounded-tr-xs bg-[#181c22]' : 'rounded-tl-xs bg-[#262a31]'
                  } px-4 py-3 text-[#dfe2eb] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.6)] w-full border border-[#00e5ff]/15`}
                >
                  <div className="flex items-center gap-3">
                    {/* Play Trigger Button */}
                    <button
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      aria-label="Play audio snippet"
                      className={`w-11 h-11 rounded-full bg-[#00e5ff] text-[#001f24] flex items-center justify-center shadow-[0_0_16px_rgba(0,229,255,0.4)] active:scale-90 transition-transform shrink-0 ${
                        isPlayingAudio ? 'shadow-[0_0_24px_rgba(0,229,255,0.8)]' : ''
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-[24px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {isPlayingAudio ? 'pause' : 'play_arrow'}
                      </span>
                    </button>

                    {/* Waveform Visualizer & Playhead */}
                    <div className="flex-1 flex flex-col justify-center gap-1.5 min-w-0">
                      <div className="flex items-center gap-[3px] h-7 w-full overflow-hidden">
                        {[
                          12, 20, 28, 16, 24, 8, 20, 24, 12, 28, 16, 20, 8, 24, 12, 20, 8, 16,
                        ].map((height, i) => {
                          const isBarPlayed = i < (audioProgress / 34) * 18;
                          return (
                            <span
                              key={i}
                              style={{ height: `${height}px` }}
                              className={`w-[3px] rounded-full transition-colors ${
                                isBarPlayed
                                  ? 'bg-[#00e5ff] shadow-[0_0_6px_#00e5ff]'
                                  : 'bg-[#3b494c]'
                              }`}
                            ></span>
                          );
                        })}
                      </div>
                      <div className="flex justify-between items-center text-[#849396] text-[10px] font-mono">
                        <span className="text-[#00e5ff] font-medium">
                          0:{audioProgress.toString().padStart(2, '0')}
                        </span>
                        <span>{msg.media.duration || '0:34'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-1">
                  <span className="text-[10px] text-[#849396]">{msg.timestamp}</span>
                  <span className="w-1 h-1 bg-[#3b494c] rounded-full"></span>
                  <span className="text-[10px] text-[#849396]">Audio memo</span>
                </div>
              </div>
            );
          }

          // Case 2: Media Card Bubble (Image or Video)
          if (msg.media?.type === 'image' && msg.media.url) {
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  isMe ? 'items-end self-end' : 'items-start self-start'
                } max-w-[88%] space-y-1`}
              >
                <div className="rounded-2xl rounded-tr-xs overflow-hidden bg-[#181c22] shadow-[0_10px_28px_rgba(0,0,0,0.65)] relative w-full group cursor-pointer border border-[#00e5ff]/20">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={msg.media.url}
                      alt={msg.media.caption || 'Cloud media'}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e14] via-[#0a0e14]/25 to-transparent"></div>

                    {/* Cloud Sync Telemetry Chip */}
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-[#0a0e14]/85 backdrop-blur-md flex items-center gap-1.5 shadow-md border border-[#00e5ff]/20">
                      <span className="material-symbols-outlined text-[#00e5ff] text-[14px]">
                        cloud_done
                      </span>
                      <span className="text-[10px] text-[#c3f5ff] font-semibold">
                        Synced to Cloud Storage • {msg.media.size || '4.8 MB'}
                      </span>
                    </div>

                    {/* Inspect Tap Trigger */}
                    <button
                      onClick={() =>
                        onInspectRaw({
                          id: msg.id,
                          author: isMe ? CURRENT_USER : ELENA_USER,
                          location: 'Konana Cloud Vault',
                          timestamp: msg.timestamp,
                          mediaType: 'image',
                          mediaUrl: msg.media!.url!,
                          tag: 'Encrypted RAW Cloud Asset',
                          qualityBadge: 'RAW LOSSLESS',
                          caption: msg.media?.caption,
                          likes: 88,
                          commentsCount: 12,
                        })
                      }
                      className="absolute bottom-2.5 right-2.5 px-3 py-1.5 rounded-full bg-[#262a31]/90 backdrop-blur-md flex items-center gap-1 text-[#dfe2eb] shadow-lg border border-white/10 hover:border-[#00e5ff] active:scale-95 transition-all"
                    >
                      <span className="material-symbols-outlined text-[#00e5ff] text-[15px]">
                        fullscreen
                      </span>
                      <span className="text-[11px] font-semibold">Inspect RAW</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 pr-1">
                  <span className="text-[10px] text-[#849396]">{msg.timestamp}</span>
                  <span
                    className="material-symbols-outlined text-[15px] text-[#00e5ff] font-bold"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    done_all
                  </span>
                </div>
              </div>
            );
          }

          // Case 3: Text Message Bubble
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${
                isMe ? 'items-end self-end' : 'items-start self-start'
              } max-w-[85%] space-y-1`}
            >
              <div
                className={`rounded-2xl px-4 py-2.5 shadow-lg ${
                  isMe
                    ? 'rounded-tr-xs bg-gradient-to-br from-[#00e5ff] via-[#00daf3] to-[#269dbe] text-[#001f24] shadow-[0_8px_24px_-4px_rgba(0,229,255,0.32)] font-medium'
                    : 'rounded-tl-xs bg-[#262a31] text-[#dfe2eb] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.6)] border border-[#00e5ff]/10'
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>

              <div className="flex items-center gap-1.5 px-1">
                <span className="text-[10px] text-[#849396]">{msg.timestamp}</span>
                {isMe ? (
                  <span
                    className="material-symbols-outlined text-[15px] text-[#00e5ff] font-bold"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    done_all
                  </span>
                ) : (
                  <>
                    <span className="w-1 h-1 bg-[#3b494c] rounded-full"></span>
                    <span className="text-[10px] text-[#849396]">Encrypted</span>
                  </>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Interactive Cloud & Media Drawer (Bento Panel) */}
      {isDrawerOpen && (
        <div className="mx-4 mb-3 p-3.5 rounded-2xl bg-[#1c2026]/95 backdrop-blur-2xl shadow-[0_12px_36px_rgba(0,0,0,0.7)] border border-[#00e5ff]/20 animate-fadeIn">
          <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-[#00e5ff]/10">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#00e5ff] text-[18px]">
                cloud_sync
              </span>
              <span className="text-xs text-[#dfe2eb] font-bold tracking-wide">
                Konana Quick Transfer
              </span>
            </div>
            <span className="text-[10px] text-[#849396] font-mono">Ultra-Fast P2P</span>
          </div>

          {/* Quick Attach Options Grid */}
          <div className="grid grid-cols-5 gap-1.5 text-center">
            {/* Camera */}
            <button
              onClick={() => handleQuickUpload('camera')}
              aria-label="Camera Capture"
              className="flex flex-col items-center gap-1 p-1.5 rounded-xl bg-[#262a31] hover:bg-[#31353c] active:scale-95 transition-transform border border-white/5"
            >
              <div className="w-10 h-10 rounded-full bg-[#1c2026] flex items-center justify-center text-[#00e5ff] shadow-inner">
                <span className="material-symbols-outlined text-[20px]">photo_camera</span>
              </div>
              <span className="text-[10px] text-[#dfe2eb] truncate w-full">Camera</span>
            </button>

            {/* Photos & Videos */}
            <button
              onClick={() => handleQuickUpload('media')}
              aria-label="Cloud Photos and Videos"
              className="flex flex-col items-center gap-1 p-1.5 rounded-xl bg-[#262a31] hover:bg-[#31353c] active:scale-95 transition-transform border border-white/5"
            >
              <div className="w-10 h-10 rounded-full bg-[#1c2026] flex items-center justify-center text-[#c3f5ff] shadow-inner">
                <span className="material-symbols-outlined text-[20px]">perm_media</span>
              </div>
              <span className="text-[10px] text-[#dfe2eb] truncate w-full">Cloud 4K</span>
            </button>

            {/* Documents */}
            <button
              onClick={() => handleQuickUpload('files')}
              aria-label="Attach Documents"
              className="flex flex-col items-center gap-1 p-1.5 rounded-xl bg-[#262a31] hover:bg-[#31353c] active:scale-95 transition-transform border border-white/5"
            >
              <div className="w-10 h-10 rounded-full bg-[#1c2026] flex items-center justify-center text-[#6cd3f7] shadow-inner">
                <span className="material-symbols-outlined text-[20px]">folder_zip</span>
              </div>
              <span className="text-[10px] text-[#dfe2eb] truncate w-full">Files</span>
            </button>

            {/* Live Location */}
            <button
              onClick={() => handleQuickUpload('location')}
              aria-label="Share Live Location"
              className="flex flex-col items-center gap-1.5 p-1.5 rounded-xl bg-[#262a31] hover:bg-[#31353c] active:scale-95 transition-transform border border-white/5"
            >
              <div className="w-10 h-10 rounded-full bg-[#1c2026] flex items-center justify-center text-[#7bd0ff] shadow-inner">
                <span className="material-symbols-outlined text-[20px]">share_location</span>
              </div>
              <span className="text-[10px] text-[#dfe2eb] truncate w-full">Live Map</span>
            </button>

            {/* Voice Note */}
            <button
              onClick={() => handleQuickUpload('audio')}
              aria-label="Record Voice Memo"
              className="flex flex-col items-center gap-1.5 p-1.5 rounded-xl bg-[#262a31] hover:bg-[#31353c] active:scale-95 transition-transform border border-white/5"
            >
              <div className="w-10 h-10 rounded-full bg-[#1c2026] flex items-center justify-center text-[#00daf3] shadow-inner">
                <span className="material-symbols-outlined text-[20px]">mic</span>
              </div>
              <span className="text-[10px] text-[#dfe2eb] truncate w-full">Audio</span>
            </button>
          </div>
        </div>
      )}

      {/* Emoji Picker Popup */}
      {showEmojiPicker && (
        <div className="mx-4 mb-2 p-2.5 rounded-2xl bg-[#1c2026] border border-[#00e5ff]/20 shadow-xl flex items-center justify-between gap-1 overflow-x-auto">
          {['🚀', '✨', '⚡️', '🔥', '📸', '💯', '🦾', '🕹', '🌐'].map((emoji) => (
            <button
              key={emoji}
              onClick={() => addEmoji(emoji)}
              className="text-xl p-1.5 hover:bg-[#262a31] rounded-xl active:scale-125 transition-transform"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {/* Floating Communication Composer Bar */}
      <div className="sticky bottom-2 z-30 px-4 w-full">
        <form
          onSubmit={handleSendMessage}
          className="w-full h-[56px] px-2.5 rounded-full bg-[#0a0e14]/95 backdrop-blur-2xl flex items-center gap-2 shadow-[0_12px_40px_rgba(0,0,0,0.85)] border border-[#00e5ff]/25 focus-within:border-[#00e5ff]"
        >
          {/* Attachment Toggle Button */}
          <button
            type="button"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            aria-label="Toggle Attachments"
            className={`w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-transform ${
              isDrawerOpen ? 'bg-[#00e5ff] text-[#001f24]' : 'bg-[#262a31] text-[#00e5ff]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isDrawerOpen ? 'close' : 'add'}
            </span>
          </button>

          {/* Capsule Message Input */}
          <div className="flex-1 flex items-center h-full px-1 min-w-0">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type a message..."
              className="w-full bg-transparent text-sm text-[#dfe2eb] placeholder:text-[#849396] focus:outline-none caret-[#00e5ff]"
            />
          </div>

          {/* Emoji Trigger */}
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            aria-label="Insert Reaction"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#849396] hover:text-[#dfe2eb] active:scale-95 transition-colors"
          >
            <span className="material-symbols-outlined text-[19px]">sentiment_satisfied</span>
          </button>

          {/* Voice Mic Trigger */}
          <button
            type="button"
            onClick={() => handleQuickUpload('audio')}
            aria-label="Voice Input"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#849396] hover:text-[#00e5ff] active:scale-95 transition-colors"
          >
            <span className="material-symbols-outlined text-[19px]">mic</span>
          </button>

          {/* Primary Glow Send Action Trigger */}
          <button
            type="submit"
            aria-label="Send Message"
            className="w-10 h-10 rounded-full bg-[#00e5ff] text-[#001f24] flex items-center justify-center shadow-[0_0_18px_rgba(0,229,255,0.45)] hover:shadow-[0_0_24px_rgba(0,229,255,0.65)] active:scale-90 transition-all shrink-0 cursor-pointer"
          >
            <span
              className="material-symbols-outlined text-[20px] -translate-x-0.5"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              send
            </span>
          </button>
        </form>

        {/* End-to-End Encryption Security Micro-Badge */}
        <div className="w-full py-1.5 flex items-center justify-center gap-1.5 text-center mt-1">
          <span className="material-symbols-outlined text-[12px] text-[#00e5ff]">lock</span>
          <span className="text-[10px] text-[#849396] tracking-wider">
            Messages are end-to-end encrypted. Stored securely on Konana Cloud.
          </span>
        </div>
      </div>
    </div>
  );
};
