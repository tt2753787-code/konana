import React, { useState } from 'react';

interface ComposeModalProps {
  onClose: () => void;
  onSelectAction: (action: 'chat' | 'media' | 'broadcast') => void;
}

export const ComposeModal: React.FC<ComposeModalProps> = ({ onClose, onSelectAction }) => {
  const [broadcastCaption, setBroadcastCaption] = useState('');
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastSent, setBroadcastSent] = useState(false);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastCaption.trim()) return;

    setIsBroadcasting(true);
    setTimeout(() => {
      setIsBroadcasting(false);
      setBroadcastSent(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0e14]/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 select-none">
      <div className="w-full max-w-md bg-[#1c2026] rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-[#00e5ff]/20 animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00e5ff] text-[22px]">
              auto_awesome
            </span>
            <h3 className="text-base font-bold text-[#dfe2eb]">Konana Quick Actions</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#262a31] text-[#bac9cc] hover:text-[#dfe2eb] flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-3 gap-2.5 mb-4">
          <button
            onClick={() => {
              onSelectAction('chat');
              onClose();
            }}
            className="p-3 rounded-2xl bg-[#262a31] hover:bg-[#31353c] text-center flex flex-col items-center gap-1.5 border border-[#00e5ff]/15 active:scale-95 transition-all"
          >
            <div className="w-11 h-11 rounded-full bg-[#181c22] flex items-center justify-center text-[#00e5ff]">
              <span className="material-symbols-outlined text-[22px]">chat_add_on</span>
            </div>
            <span className="text-xs font-semibold text-[#dfe2eb]">New Chat</span>
          </button>

          <button
            onClick={() => {
              onSelectAction('media');
              onClose();
            }}
            className="p-3 rounded-2xl bg-[#262a31] hover:bg-[#31353c] text-center flex flex-col items-center gap-1.5 border border-[#00e5ff]/15 active:scale-95 transition-all"
          >
            <div className="w-11 h-11 rounded-full bg-[#181c22] flex items-center justify-center text-[#c3f5ff]">
              <span className="material-symbols-outlined text-[22px]">cloud_upload</span>
            </div>
            <span className="text-xs font-semibold text-[#dfe2eb]">Upload RAW</span>
          </button>

          <button
            onClick={() => {
              onSelectAction('broadcast');
            }}
            className="p-3 rounded-2xl bg-[#262a31] hover:bg-[#31353c] text-center flex flex-col items-center gap-1.5 border border-[#00e5ff]/15 active:scale-95 transition-all"
          >
            <div className="w-11 h-11 rounded-full bg-[#181c22] flex items-center justify-center text-[#6cd3f7]">
              <span className="material-symbols-outlined text-[22px]">podcasts</span>
            </div>
            <span className="text-xs font-semibold text-[#dfe2eb]">Live Circle</span>
          </button>
        </div>

        {/* Live Circle Instant Broadcast input */}
        <form onSubmit={handleBroadcast} className="space-y-2 pt-2 border-t border-white/5">
          <label className="block text-xs font-semibold text-[#6cd3f7]">
            Broadcast to Your Circle
          </label>
          <div className="relative">
            <input
              type="text"
              value={broadcastCaption}
              onChange={(e) => setBroadcastCaption(e.target.value)}
              placeholder="What are you creating right now?..."
              className="w-full bg-[#10141a] border border-[#3b494c] rounded-xl px-3.5 py-2.5 text-xs text-[#dfe2eb] placeholder:text-[#849396] focus:outline-none focus:border-[#00e5ff]"
            />
            <button
              type="submit"
              disabled={isBroadcasting || !broadcastCaption.trim()}
              className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-[#00e5ff] text-[#001f24] font-bold text-xs disabled:opacity-40 flex items-center gap-1 shadow-md"
            >
              {isBroadcasting ? (
                <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
              ) : (
                <span className="material-symbols-outlined text-[16px]">send</span>
              )}
              <span>Publish</span>
            </button>
          </div>

          {broadcastSent && (
            <p className="text-xs text-[#00e5ff] text-center mt-2 font-medium">
              ✓ Broadcast live across all your connected peers!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
