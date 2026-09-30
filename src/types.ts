export type TabType = 'home' | 'friends' | 'chat' | 'media' | 'profile';

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  email: string;
  avatar: string;
  bio?: string;
  role?: string;
  isOnline: boolean;
  isVerified?: boolean;
  mutualFriends?: number;
  lastActive?: string;
}

export interface StoryCircle {
  id: string;
  userId: string;
  userName: string;
  avatar: string;
  isLive: boolean;
  isViewed: boolean;
  mediaUrl: string;
  caption: string;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text?: string;
  timestamp: string;
  isEncrypted: boolean;
  status: 'sent' | 'delivered' | 'read';
  media?: {
    type: 'image' | 'audio' | 'video' | 'file';
    url?: string;
    caption?: string;
    size?: string;
    duration?: string;
    isCloudSynced?: boolean;
  };
}

export interface FeedPost {
  id: string;
  author: UserProfile;
  location: string;
  timestamp: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  tag: string;
  qualityBadge?: string;
  caption?: string;
  likes: number;
  isLiked?: boolean;
  commentsCount: number;
  isSaved?: boolean;
  duration?: string;
}

export interface CloudVaultItem {
  id: string;
  title: string;
  category: 'raw' | 'video' | 'document' | 'audio';
  fileSize: string;
  uploadedAt: string;
  previewUrl: string;
  resolution?: string;
  isSynced: boolean;
}
