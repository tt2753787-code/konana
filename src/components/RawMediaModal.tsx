import React, { useState } from 'react';
import { FeedPost } from '../types';

interface RawMediaModalProps {
  post: FeedPost;
  onClose: () => void;
}

export const RawMediaModal: React.FC<RawMediaModalProps> = ({ post, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.5, 1));

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0e14]/95 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-4 select-none">
      <div className="relative w-full max-w-lg bg-[#181c22] rounded-3xl overflow-hidden border border-[#00e5ff]/30 shadow-2xl flex flex-col max-h-[92vh]">
        {/* Top Control Bar */}
        <div className="px-4 py-3 bg-[#10141a]/90 backdrop-blur-md flex items-center justify-between border-b border-[#00e5ff]/15">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00e5ff] text-[20px]">
              raw_on
            </span>
            <div>
              <h3 className="text-sm font-bold text-[#dfe2eb] leading-tight truncate max-w-[200px]">
                {post.tag || 'Konana Master Asset'}
              </h3>
              <span className="text-[10px] text-[#849396] font-mono">
                {post.qualityBadge || 'RAW 48MP'} • Lossless Encrypted
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 1}
              className="w-8 h-8 rounded-full bg-[#262a31] text-[#bac9cc] hover:text-[#00e5ff] disabled:opacity-40 flex items-center justify-center text-xs"
            >
              <span className="material-symbols-outlined text-[18px]">zoom_out</span>
            </button>
            <span className="text-[10px] font-mono text-[#00e5ff] w-8 text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 3}
              className="w-8 h-8 rounded-full bg-[#262a31] text-[#bac9cc] hover:text-[#00e5ff] disabled:opacity-40 flex items-center justify-center text-xs"
            >
              <span className="material-symbols-outlined text-[18px]">zoom_in</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#31353c] text-white hover:bg-[#3f444c] flex items-center justify-center ml-1"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Media Canvas */}
        <div className="relative flex-1 min-h-[300px] max-h-[500px] bg-[#0a0e14] overflow-hidden flex items-center justify-center">
          <img
            src={post.mediaUrl}
            alt={post.tag}
            style={{ transform: `scale(${zoomLevel})` }}
            className="w-full h-full object-contain transition-transform duration-300"
          />
        </div>

        {/* EXIF Metadata Card */}
        <div className="p-4 bg-[#181c22] border-t border-[#00e5ff]/10 space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="p-2 rounded-xl bg-[#10141a] border border-white/5">
              <span className="block text-[10px] text-[#849396] uppercase">Resolution</span>
              <span className="text-xs font-bold text-[#dfe2eb] font-mono">8192 × 5464</span>
            </div>
            <div className="p-2 rounded-xl bg-[#10141a] border border-white/5">
              <span className="block text-[10px] text-[#849396] uppercase">Color Depth</span>
              <span className="text-xs font-bold text-[#00e5ff] font-mono">14-bit DNG</span>
            </div>
            <div className="p-2 rounded-xl bg-[#10141a] border border-white/5">
              <span className="block text-[10px] text-[#849396] uppercase">Optics</span>
              <span className="text-xs font-bold text-[#dfe2eb] font-mono">50mm f/1.2</span>
            </div>
            <div className="p-2 rounded-xl bg-[#10141a] border border-white/5">
              <span className="block text-[10px] text-[#849396] uppercase">Sensor ISO</span>
              <span className="text-xs font-bold text-[#6cd3f7] font-mono">ISO 400</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5 text-xs text-[#bac9cc]">
              <span className="material-symbols-outlined text-[16px] text-[#00e5ff]">verified</span>
              <span>SHA-256 Validated • 0% Compression</span>
            </div>
            <button
              onClick={() => {
                const a = document.createElement('a');
                a.href = post.mediaUrl;
                a.download = `${post.tag.replace(/\s+/g, '_')}_RAW.png`;
                a.target = '_blank';
                a.click();
              }}
              className="px-3.5 py-1.5 rounded-full bg-[#00e5ff] text-[#001f24] text-xs font-bold flex items-center gap-1 shadow-[0_0_12px_rgba(0,229,255,0.4)] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Download RAW</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
