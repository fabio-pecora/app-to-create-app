export type Ingredient = { name: string; allergen?: boolean };
export type MenuItem = { title: string; price: number; desc?: string; ingredients?: Ingredient[] };
export type MenuSection = { section: string; items: MenuItem[] };

export type StyleId = 'neoBistro' | 'streetFood' | 'fineDining' | 'familyTrattoria';

export type AppStyle = {
  id: StyleId;
  name: string;
  vibe: string;
  colors: { bg: string; text: string; muted: string; border: string; header: string; accent: string };
  // pattern di layout/style unici (usati da Preview e generator)
  layout: 'tab-top' | 'drawer' | 'bottom-cards' | 'hero-scroll';
  effects: { rounded: number; elevation: number; shadow: boolean; parallax: boolean };
};
