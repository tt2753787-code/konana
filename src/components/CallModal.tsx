import React, { useEffect, useState } from 'react';
import { ELENA_USER } from '../data/mockData';

interface CallModalProps {
  type: 'voice' | 'video';
  onClose: () => void;
}

export const CallModal: React.FC<CallModalProps> = ({ type, onClose }) => {
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(type === 'video');

  useEffect(() => {
    const timer = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0e14]/95 backdrop-blur-2xl flex items-center justify-center p-4 select-none">
      <div className="relative w-full max-w-sm bg-[#181c22] rounded-3xl overflow-hidden border border-[#00e5ff]/25 shadow-2xl p-6 text-center flex flex-col items-center justify-between min-h-[460px]">
        {/* Top Status */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-xs text-[#00e5ff] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-ping"></span>
            <span>END-TO-END ENCRYPTED CALL</span>
          </div>
          <p className="text-xs text-[#849396] font-mono">{formatTime(duration)}</p>
        </div>

        {/* Center Visual */}
        <div className="flex flex-col items-center my-6">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-36 h-36 rounded-full bg-[#00e5ff]/15 animate-ping opacity-75"></div>
            <div className="relative w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-[#00e5ff] to-[#6cd3f7] shadow-[0_0_30px_rgba(0,229,255,0.4)]">
              <img
                src={ELENA_USER.avatar}
                alt={ELENA_USER.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <h3 className="text-xl font-bold text-[#dfe2eb] mt-4">{ELENA_USER.name}</h3>
          <span className="text-xs text-[#00e5ff] font-semibold">{ELENA_USER.handle}</span>
        </div>

        {/* Controls Bar */}
        <div className="flex items-center justify-center gap-4 w-full pt-4 border-t border-white/5">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isMuted ? 'bg-[#ffb4ab] text-[#690005]' : 'bg-[#262a31] text-[#dfe2eb] hover:bg-[#31353c]'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">
              {isMuted ? 'mic_off' : 'mic'}
            </span>
          </button>

          <button
            onClick={() => setIsVideoEnabled(!isVideoEnabled)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isVideoEnabled
                ? 'bg-[#262a31] text-[#00e5ff] border border-[#00e5ff]/40'
                : 'bg-[#262a31] text-[#849396]'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">
              {isVideoEnabled ? 'videocam' : 'videocam_off'}
            </span>
          </button>

          <button
            onClick={onClose}
            className="w-14 h-14 rounded-full bg-[#93000a] hover:bg-[#ba1a1a] text-white flex items-center justify-center shadow-[0_0_16px_rgba(255,84,73,0.5)] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[26px]">call_end</span>
          </button>
        </div>
      </div>
    </div>
  );
};
