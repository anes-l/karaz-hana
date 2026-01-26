export type Page = 'home' | 'shop' | 'books' | 'universe' | 'contact';

export interface NavItem {
  id: Page;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Accueil' },
  { id: 'shop', label: 'Boutique' },
  { id: 'books', label: 'Livres' },
  { id: 'universe', label: 'Mon Univers' },
  { id: 'contact', label: 'Contact' },
];