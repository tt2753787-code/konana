import React, { useState } from 'react';
import { CLOUD_VAULT_ITEMS } from '../data/mockData';
import { CloudVaultItem, FeedPost } from '../types';

interface MediaScreenProps {
  onInspectRaw: (post: FeedPost) => void;
}

export const MediaScreen: React.FC<MediaScreenProps> = ({ onInspectRaw }) => {
  const [items, setItems] = useState<CloudVaultItem[]>(CLOUD_VAULT_ITEMS);
  const [activeCategory, setActiveCategory] = useState<'all' | 'raw' | 'video'>('all');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const filteredItems = items.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setUploadSuccess(false);

    setTimeout(() => {
      const newItem: CloudVaultItem = {
        id: `vault_${Date.now()}`,
        title: `Konana_Raw_Capture_${Date.now().toString().slice(-4)}.DNG`,
        category: 'raw',
        fileSize: '52.4 MB',
        uploadedAt: 'Just now',
        previewUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAE5cjGqnZrOmdykmAI6gL5H-DuqWstuyR2pMGXyc9yjn9Mie2xvMjlJHQz82ZRo2XJ4gGt7J-81pFGV0P_0QBFFpjQIPd8Mh72-6nL3HVxrL0R_jXvRt4_22gavmQn4MC50eAEM7sCxbHQcx323uqddXho_J_bwydj5FVT7vT-LolK2hKBBupOm9ZKTldgFHkTiRPKc226tu-qilyo3m--wksDMrZ1c7QnvVJBRha-QFpv2qwMAh5ozw',
        resolution: '8192 × 5464 (14-bit)',
        isSynced: true,
      };

      setItems((prev) => [newItem, ...prev]);
      setIsUploading(false);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    }, 1800);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pb-28 pt-2 gap-5 select-none">
      {/* Cloud Storage Vault Bento Telemetry */}
      <div className="relative overflow-hidden rounded-2xl bg-[#262a31] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.5)] border border-[#00e5ff]/20">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#00e5ff] font-bold">
              Konana Cloud Vault
            </span>
            <h2 className="text-xl text-[#dfe2eb] font-bold mt-0.5">Media &amp; RAW Assets</h2>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#181c22] text-[#00e5ff] text-xs font-mono border border-[#00e5ff]/25">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-ping"></span>
            <span>35.8 / 50 GB</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="w-full h-2 rounded-full bg-[#10141a] overflow-hidden flex">
            <div
              className="h-full bg-gradient-to-r from-[#00daf3] via-[#00e5ff] to-[#6cd3f7] rounded-full shadow-[0_0_10px_rgba(0,229,255,0.7)]"
              style={{ width: '71.6%' }}
            ></div>
          </div>
          <div className="flex justify-between items-center text-[11px] text-[#849396] mt-1.5">
            <span>Encrypted P2P replication</span>
            <span className="text-[#c3f5ff] font-medium">14.2 GB Remaining</span>
          </div>
        </div>

        {/* Action Button: Upload */}
        <button
          onClick={handleSimulateUpload}
          disabled={isUploading}
          className="w-full mt-4 h-11 rounded-xl bg-[#00e5ff] hover:bg-[#6cd3f7] text-[#001f24] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(0,229,255,0.35)] active:scale-95 transition-all"
        >
          {isUploading ? (
            <>
              <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
              <span>Syncing RAW Packet...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
              <span>Upload RAW or 4K Video</span>
            </>
          )}
        </button>

        {uploadSuccess && (
          <div className="mt-2 p-2 rounded-lg bg-[#00e5ff]/15 border border-[#00e5ff]/40 text-[#00e5ff] text-xs text-center font-medium animate-fadeIn">
            ✓ Lossless 48MP RAW asset synced to Konana Cloud!
          </div>
        )}
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
            activeCategory === 'all'
              ? 'bg-[#00e5ff] text-[#001f24] shadow-[0_0_12px_rgba(0,229,255,0.3)]'
              : 'bg-[#262a31] text-[#bac9cc] hover:text-[#00e5ff]'
          }`}
        >
          All Vault Items
        </button>
        <button
          onClick={() => setActiveCategory('raw')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
            activeCategory === 'raw'
              ? 'bg-[#00e5ff] text-[#001f24] shadow-[0_0_12px_rgba(0,229,255,0.3)]'
              : 'bg-[#262a31] text-[#bac9cc] hover:text-[#00e5ff]'
          }`}
        >
          RAW 48MP
        </button>
        <button
          onClick={() => setActiveCategory('video')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
            activeCategory === 'video'
              ? 'bg-[#00e5ff] text-[#001f24] shadow-[0_0_12px_rgba(0,229,255,0.3)]'
              : 'bg-[#262a31] text-[#bac9cc] hover:text-[#00e5ff]'
          }`}
        >
          4K ProRes
        </button>
      </div>

      {/* Vault Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-[#181c22] overflow-hidden border border-[#00e5ff]/15 shadow-lg group hover:border-[#00e5ff]/40 transition-all"
          >
            <div className="relative aspect-video w-full bg-[#0a0e14] overflow-hidden">
              <img
                src={item.previewUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

              {/* Tag & File size */}
              <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-[#0a0e14]/80 backdrop-blur-md text-[10px] text-[#00e5ff] font-mono border border-[#00e5ff]/20">
                {item.fileSize}
              </div>

              {item.resolution && (
                <div className="absolute bottom-2.5 left-2.5 text-xs text-[#dfe2eb] font-semibold drop-shadow-md">
                  {item.resolution}
                </div>
              )}

              {/* Inspect trigger */}
              <button
                onClick={() =>
                  onInspectRaw({
                    id: item.id,
                    author: {
                      id: 'user_alex',
                      name: 'Alex Rivera',
                      handle: '@alex_rivera',
                      email: 'alex.konana@gmail.com',
                      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJCL2EFAHwDjXGPZ5JJjXIWco6Jt-R21_Lk81taOJfueGeCEQyBieHktvu6j8VZpuybPgBEa9USd1om6QSdM6T0puqMdHbHmnIQux-IEUZsl_xiy5oTVbVAtgFSfoN-l6gbTnDcO_4Oxj67nn1CUs7I5_k3LapORassSqeX8OzqtQhTiecey1WWInm3c3Z-YHo7g4twbVSPzRrMthgE8XALc6aN_JSrZGU73hIutrLPbNKE_f6iSGp6g',
                      isOnline: true,
                    },
                    location: 'Konana Vault Master',
                    timestamp: item.uploadedAt,
                    mediaType: item.category === 'video' ? 'video' : 'image',
                    mediaUrl: item.previewUrl,
                    tag: item.title,
                    qualityBadge: item.category === 'video' ? '4K PRORES' : 'RAW 48MP',
                    caption: `Full resolution master asset. Encrypted lossless backup on Konana node.`,
                    likes: 112,
                    commentsCount: 24,
                  })
                }
                className="absolute bottom-2.5 right-2.5 px-3 py-1.5 rounded-full bg-[#00e5ff] text-[#001f24] text-xs font-bold flex items-center gap-1 shadow-[0_0_12px_rgba(0,229,255,0.4)] active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[16px]">fullscreen</span>
                <span>Inspect RAW</span>
              </button>
            </div>

            <div className="p-3 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-[#dfe2eb] truncate max-w-[240px]">
                  {item.title}
                </h4>
                <span className="text-[11px] text-[#849396]">{item.uploadedAt}</span>
              </div>
              <div className="flex items-center gap-1 text-[#00e5ff]">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span className="text-[10px] font-mono">100% Synced</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
