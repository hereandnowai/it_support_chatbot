export interface User {
  id: string;
  email: string;
  role: 'admin' | 'employee';
}

export interface StatCardData {
  title: string;
  value: string;
  icon: React.ReactElement<{ className?: string }>;
  bgColor: string;
  textColor?: string; // Added for branding
  iconColor?: string; // Added for branding
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
  quickReplies?: QuickReplyAction[];
  avatar?: string; // Added for bot avatar
}

export interface QuickReplyAction {
  id: string;
  label: string;
  payload: string; // What to send to the bot
}

export interface AnalyticsData {
  name: string;
  count: number;
}

// For Gemini API
export interface GroundingChunkWeb {
  uri?: string;
  title?: string;
}

export interface GroundingChunkRetrievedContext {
  uri?: string; // Made optional to match SDK
  title?: string; // Made optional to match SDK
}

export interface GroundingChunk {
  web?: GroundingChunkWeb;
  retrievedContext?: GroundingChunkRetrievedContext;
}
export interface GroundingMetadata {
  groundingChunks?: GroundingChunk[];
  searchQueries?: string[];
}
export interface Candidate {
  groundingMetadata?: GroundingMetadata;
  // other candidate properties
}

export interface GeminiGenerateContentResponse {
  text: string;
  candidates?: Candidate[];
  // other properties
}

// Interface for GeminiChatSession was simplified and seems unused directly,
// but kept for potential future reference or if it was intended for other parts.
// If it's truly unused, it could be removed.
export interface GeminiChatSession {
  sendMessage: (message: string | { parts: { text: string }[] }) => Promise<{ text: string }>;
}