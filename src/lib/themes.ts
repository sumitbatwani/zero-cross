export type ThemeId = 'default' | 'midnight' | 'forest' | 'candy' | 'obsidian';

export interface Theme {
  id: ThemeId;
  name: string;
  isPremium: boolean;
  price: string;
  stripeUrl: string;
  // Preview colors (shown in swatch regardless of active theme)
  previewX: string;
  previewO: string;
  previewAccent: string;
  previewBg: string;
}

export const THEMES: Theme[] = [
  {
    id: 'default',
    name: 'Classic',
    isPremium: false,
    price: 'Free',
    stripeUrl: '',
    previewX: '#e53e3e',
    previewO: '#3182ce',
    previewAccent: '#6c63ff',
    previewBg: '#f0f2f5',
  },
  {
    id: 'midnight',
    name: 'Midnight Neon',
    isPremium: true,
    price: '$1.99',
    stripeUrl: 'YOUR_STRIPE_PAYMENT_LINK_MIDNIGHT',
    previewX: '#ff2d78',
    previewO: '#00d4ff',
    previewAccent: '#bf00ff',
    previewBg: '#0a0a0f',
  },
  {
    id: 'forest',
    name: 'Enchanted Forest',
    isPremium: true,
    price: '$1.99',
    stripeUrl: 'YOUR_STRIPE_PAYMENT_LINK_FOREST',
    previewX: '#ff6b35',
    previewO: '#4fc978',
    previewAccent: '#8bc34a',
    previewBg: '#1a2314',
  },
  {
    id: 'candy',
    name: 'Candy Pop',
    isPremium: true,
    price: '$1.99',
    stripeUrl: 'YOUR_STRIPE_PAYMENT_LINK_CANDY',
    previewX: '#e91e8c',
    previewO: '#7c4dff',
    previewAccent: '#ff4081',
    previewBg: '#fff0f6',
  },
  {
    id: 'obsidian',
    name: 'Obsidian Gold',
    isPremium: true,
    price: '$1.99',
    stripeUrl: 'YOUR_STRIPE_PAYMENT_LINK_OBSIDIAN',
    previewX: '#ffd700',
    previewO: '#c0a050',
    previewAccent: '#ffc107',
    previewBg: '#0c0c0c',
  },
];

export const THEME_MAP = Object.fromEntries(
  THEMES.map((t) => [t.id, t])
) as Record<ThemeId, Theme>;

export const VALID_THEME_IDS = THEMES.map((t) => t.id);

export const LS_ACTIVE = 'zc-active-theme';
export const LS_UNLOCKED = 'zc-unlocked-themes';
