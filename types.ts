export type Page = 'accueil' | 'boutique' | 'ateliers' | 'contact';

export interface NavItem {
  id: Page;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'boutique', label: 'Boutique' },
  { id: 'ateliers', label: 'Ateliers' },
  { id: 'contact', label: 'Contact' },
];

export interface Workshop {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  price: string;
  duration?: string;
  level?: string;
  audience?: string;
  quote?: string; // New field for the highlighted quote
  description: string;
  moreInfo?: string;
  imageUrl: string;
  isUpcoming: boolean;
}