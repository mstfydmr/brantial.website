export type LeaderboardCategory = Record<string, unknown>;
export type Leaderboard = Record<string, LeaderboardCategory>;

export const VISIBLE: LeaderboardCategory = {
  'software-companies': [
    {
      rank: 1,
      company: 'Microsoft',
      topPlatform: 'gemini',
      visibilityScore: 60.0,
      domain: 'microsoft.com',
    },
    {
      rank: 2,
      company: 'Salesforce',
      topPlatform: 'google-ai-mode',
      visibilityScore: 53.51,
      domain: 'salesforce.com',
    },
    {
      rank: 3,
      company: 'Google',
      topPlatform: 'google-ai-overviews',
      visibilityScore: 38.92,
      domain: 'google.com',
    },
    {
      rank: 4,
      company: 'Adobe',
      topPlatform: 'gemini',
      visibilityScore: 35.14,
      domain: 'adobe.com',
    },
    {
      rank: 5,
      company: 'ServiceNow',
      topPlatform: 'copilot',
      visibilityScore: 25.95,
      domain: 'servicenow.com',
    },
    {
      rank: 6,
      company: 'Apple',
      topPlatform: 'perplexity',
      visibilityScore: 23.78,
      domain: 'apple.com',
    },
    {
      rank: 7,
      company: 'Oracle',
      topPlatform: 'chatgpt',
      visibilityScore: 23.6,
      domain: 'oracle.com',
    },
    {
      rank: 8,
      company: 'Amazon',
      topPlatform: 'grok',
      visibilityScore: 21.62,
      domain: 'amazon.com',
    },
    {
      rank: 9,
      company: 'HubSpot',
      topPlatform: 'google-ai-overviews',
      visibilityScore: 20.9,
      domain: 'hubspot.com',
    },
  ],

  'streaming-platforms': [
    {
      rank: 1,
      company: 'Netflix',
      topPlatform: 'gemini',
      visibilityScore: 79.67,
      domain: 'netflix.com',
    },
    {
      rank: 2,
      company: 'Hulu',
      topPlatform: 'gemini',
      visibilityScore: 70.42,
      domain: 'hulu.com',
    },
    {
      rank: 3,
      company: 'Disney',
      topPlatform: 'gemini',
      visibilityScore: 63.34,
      domain: 'disneyplus.com',
    },
    {
      rank: 4,
      company: 'Amazon',
      topPlatform: 'gemini',
      visibilityScore: 53.72,
      domain: 'amazon.com',
    },
    {
      rank: 5,
      company: 'Max',
      topPlatform: 'gemini',
      visibilityScore: 48.64,
      domain: 'max.com',
    },
    {
      rank: 6,
      company: 'Apple',
      topPlatform: 'chatgpt',
      visibilityScore: 42.47,
      domain: 'apple.com',
    },
    {
      rank: 7,
      company: 'Paramount',
      topPlatform: 'perplexity',
      visibilityScore: 29.22,
      domain: 'paramountplus.com',
    },
    {
      rank: 8,
      company: 'Peacock',
      topPlatform: 'gemini',
      visibilityScore: 28.31,
      domain: 'peacocktv.com',
    },
    {
      rank: 9,
      company: 'Tubi',
      topPlatform: 'chatgpt',
      visibilityScore: 23.23,
      domain: 'tubi.tv',
    },
    {
      rank: 10,
      company: 'YouTube',
      topPlatform: 'grok',
      visibilityScore: 19.96,
      domain: 'youtube.com',
      change: 1,
    },
  ],

  'wireless-providers': [
    {
      rank: 1,
      company: 'T-Mobile',
      topPlatform: 'gemini',
      visibilityScore: 94.81,
      domain: 't-mobile.com',
    },
    {
      rank: 2,
      company: 'Verizon',
      topPlatform: 'gemini',
      visibilityScore: 85.53,
      domain: 'verizon.com',
    },
    {
      rank: 3,
      company: 'AT&T',
      topPlatform: 'gemini',
      visibilityScore: 80.71,
      domain: 'att.com',
    },
    {
      rank: 4,
      company: 'Mint Mobile',
      topPlatform: 'gemini',
      visibilityScore: 72.73,
      domain: 'mintmobile.com',
    },
    {
      rank: 5,
      company: 'Visible',
      topPlatform: 'google-ai-mode',
      visibilityScore: 58.63,
      domain: 'visible.com',
    },
    {
      rank: 6,
      company: 'US Mobile',
      topPlatform: 'gemini',
      visibilityScore: 41.19,
      domain: 'usmobile.com',
    },
    {
      rank: 7,
      company: 'Consumer Cellular',
      topPlatform: 'grok',
      visibilityScore: 35.25,
      domain: 'consumercellular.com',
    },
    {
      rank: 8,
      company: 'Google Fi',
      topPlatform: 'chatgpt',
      visibilityScore: 23.75,
      domain: 'google.com',
    },
    {
      rank: 9,
      company: 'Tello',
      topPlatform: 'copilot',
      visibilityScore: 21.15,
      domain: 'tello.com',
    },
    {
      rank: 10,
      company: 'Cricket Wireless',
      topPlatform: 'grok',
      visibilityScore: 15.58,
      domain: 'cricketwireless.com',
    },
  ],
};
export const RISING: LeaderboardCategory = {
  'software-companies': [
    {
      rank: 173,
      company: 'Digital Silk',
      topPlatform: 'chatgpt',
      visibilityScore: 1.0,
      change: 375,
    },
    {
      rank: 170,
      company: 'Lucid',
      topPlatform: 'grok',
      visibilityScore: 1.0,
      change: 359,
    },
    {
      rank: 90,
      company: 'Cleveroad',
      topPlatform: 'google-ai-overviews',
      visibilityScore: 1.62,
      change: 354,
    },
    {
      rank: 144,
      company: 'D.E. Shaw Group',
      topPlatform: 'copilot',
      visibilityScore: 1.0,
      change: 344,
    },
    {
      rank: 213,
      company: 'FATbit',
      topPlatform: 'grok',
      visibilityScore: 1.0,
      change: 332,
    },
  ],
  'car-manufacturers': [
    {
      rank: 65,
      company: 'Maybach',
      topPlatform: 'gemini',
      visibilityScore: 1.0,
      change: 17,
      domain: 'maybach.com',
    },
    {
      rank: 59,
      company: 'MotorTrend',
      topPlatform: 'google-ai-mode',
      visibilityScore: 1.0,
      change: 16,
      domain: 'motortrend.com',
    },
    {
      rank: 67,
      company: 'Infiniti',
      topPlatform: 'grok',
      visibilityScore: 1.0,
      change: 16,
      domain: 'infiniti.com',
    },
    {
      rank: 52,
      company: 'McLaren',
      topPlatform: 'chatgpt',
      visibilityScore: 1.0,
      change: 14,
      domain: 'mclaren.com',
    },
    {
      rank: 53,
      company: 'Mercedes-Maybach',
      topPlatform: 'google-ai-mode',
      visibilityScore: 1.0,
      change: 14,
      domain: 'mercedes-benz.com',
    },
  ],
  'wireless-providers': [
    {
      rank: 35,
      company: 'Excess Telecom',
      topPlatform: 'copilot',
      visibilityScore: 1.67,
      change: 66,
      domain: 'excesstelecom.com',
    },
    {
      rank: 54,
      company: 'Toms Guide',
      topPlatform: 'google-ai-mode',
      visibilityScore: 1.0,
      change: 61,
      domain: 'tomsguide.com',
    },
    {
      rank: 57,
      company: 'U.S. Cellular',
      topPlatform: 'chatgpt',
      visibilityScore: 1.0,
      change: 45,
      domain: 'uscellular.com',
    },
    {
      rank: 50,
      company: 'Mobimatter',
      topPlatform: 'perplexity',
      visibilityScore: 1.0,
      change: 39,
      domain: 'mobimatter.com',
    },
    {
      rank: 51,
      company: 'PrimeWay Federal Credit Union',
      topPlatform: 'google-ai-mode',
      visibilityScore: 1.0,
      change: 34,
      domain: 'primewayfcu.com',
    },
  ],
};
export const TRENDING: LeaderboardCategory = {};

export const LEADERBOARD: Leaderboard = {
  visible: VISIBLE,
  rising: RISING,
  trending: TRENDING,
};

export type PlatformInfo = {
  displayName: string;
  website?: string;
  logoUrl?: string;
  domain?: string;
};

export const PLATFORMS: Record<string, PlatformInfo> = {
  chatgpt: {
    displayName: 'ChatGPT',
    website: 'https://chat.openai.com',
    domain: 'openai.com',
  },
  gemini: {
    displayName: 'Gemini',
    website: 'https://gemini.google.com',
    domain: 'gemini.google.com',
  },
  'google-ai-mode': {
    displayName: 'Google AI Mode',
    domain: 'google.com',
  },
  'google-ai-overviews': {
    displayName: 'Google AI Overviews',
    domain: 'google.com',
  },
  copilot: {
    displayName: 'Copilot',
    website: 'https://copilot.microsoft.com',
    domain: 'copilot.microsoft.com',
  },
  perplexity: {
    displayName: 'Perplexity',
    website: 'https://www.perplexity.ai',
    domain: 'perplexity.ai',
  },
  grok: {
    displayName: 'Grok',
    domain: 'x.ai',
  },
};

export type Industry = { id: string; displayName: string };

export const INDUSTRIES: Record<string, Industry> = {
  'software-companies': {
    id: 'software-companies',
    displayName: 'Software Companies',
  },
  'wireless-providers': {
    id: 'wireless-providers',
    displayName: 'Wireless Providers',
  },
  'streaming-platforms': {
    id: 'streaming-platforms',
    displayName: 'Streaming Platforms',
  },
};
