import React, { useEffect, useState } from 'react';
import { StoryCircle } from '../types';

interface StoryViewerModalProps {
  story: StoryCircle;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const StoryViewerModal: React.FC<StoryViewerModalProps> = ({
  story,
  onClose,
  onNext,
  onPrev,
}) => {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (onNext) onNext();
          else onClose();
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPaused, onNext, onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center select-none">
      <div className="relative w-full max-w-md h-full max-h-[860px] bg-[#0a0e14] sm:rounded-3xl overflow-hidden flex flex-col justify-between shadow-2xl border border-[#00e5ff]/20">
        {/* Progress Bar Header */}
        <div className="absolute top-0 inset-x-0 z-30 p-4 pt-6 bg-gradient-to-b from-black/80 to-transparent">
          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff] transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src={story.avatar}
                alt={story.userName}
                className="w-9 h-9 rounded-full object-cover border border-[#00e5ff]/50"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-white">{story.userName}</span>
                  {story.isLive && (
                    <span className="px-1.5 py-0.2 rounded bg-[#00e5ff] text-[#001f24] text-[9px] font-bold uppercase tracking-wider">
                      LIVE
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-[#849396]">{story.timestamp}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isPaused ? 'play_arrow' : 'pause'}
                </span>
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
          </div>
        </div>

        {/* Media Canvas with Navigation Taps */}
        <div className="relative flex-1 w-full bg-[#0a0e14] flex items-center justify-center overflow-hidden">
          <img
            src={story.mediaUrl}
            alt={story.caption}
            className="w-full h-full object-cover"
          />

          {/* Left tap area (prev) */}
          <div
            onClick={onPrev || onClose}
            className="absolute left-0 inset-y-0 w-1/3 z-20 cursor-pointer"
          ></div>
          {/* Right tap area (next) */}
          <div
            onClick={onNext || onClose}
            className="absolute right-0 inset-y-0 w-1/3 z-20 cursor-pointer"
          ></div>
        </div>

        {/* Caption & Reply Footer */}
        <div className="relative z-30 p-4 pb-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
          <p className="text-sm text-white mb-3 drop-shadow-md">{story.caption}</p>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder={`Reply to ${story.userName}...`}
              className="flex-1 bg-white/10 backdrop-blur-md rounded-full px-4 py-2.5 text-xs text-white placeholder:text-white/60 border border-white/15 focus:outline-none focus:border-[#00e5ff]"
            />
            <button
              onClick={() => setLiked(!liked)}
              className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-transform active:scale-125 ${
                liked ? 'bg-[#ffb4ab] text-[#690005]' : 'bg-white/10 text-white'
              }`}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: liked ? "'FILL' 1" : "'FILL' 0" }}
              >
                favorite
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
