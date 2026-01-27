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