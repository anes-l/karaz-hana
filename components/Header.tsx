import React, { useState } from 'react';
import { Instagram, Facebook, Search, ShoppingBag, Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../types';
import { useLocation, useNavigate } from 'react-router-dom';
// import { ScallopedBorder } from './ScallopedBorder';


export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Déduit la page courante à partir de l'URL
  const currentPath = location.pathname.replace(/^\//, '') || 'shop';

  const handleNavClick = (page: string) => {
    navigate(page === 'home' ? '/home' : `/${page}`);
    setMobileMenuOpen(false);
  };

  return (
    <header className="relative w-full bg-cream z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-1">
        {/* Top Row: Socials - Logo - Cart */}
        <div className="grid grid-cols-3 items-center h-14 md:h-20">
          
          {/* Left: Social Icons (Desktop) / Hamburger (Mobile) */}
          <div className="flex items-center justify-start gap-4">
            <button 
              className="md:hidden p-2 text-charcoal"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="hidden md:flex gap-4 text-charcoal/70 hover:text-charcoal transition-colors">
              <a href="#" className="hover:text-terracotta transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-terracotta transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-terracotta transition-colors"><Search size={20} /></a>
            </div>
          </div>

          {/* Center: Logo */}
          <div 
            className="flex flex-col items-center justify-center cursor-pointer group mx-auto"
            onClick={() => handleNavClick('home')}
          >
            <h1 className="font-logo text-xl md:text-3xl lg:text-4xl tracking-widest text-charcoal uppercase group-hover:text-terracotta transition-colors duration-500 text-center">
              Karaz Hana
            </h1>
            {/* Sous-titre supprimé */}
          </div>

          {/* Right: Cart & Account */}
          <div className="flex items-center justify-end gap-4">
            <button 
              className="relative p-2 text-charcoal hover:text-terracotta transition-colors"
              onClick={() => handleNavClick('shop')}
            >
              <ShoppingBag size={20} />
              <span className="absolute top-1 right-0 h-2 w-2 bg-terracotta rounded-full"></span>
            </button>
            <span className="hidden md:inline-block text-sm font-light text-charcoal/70">
              FR / EN
            </span>
          </div>
        </div>

        {/* Bottom Row: Navigation (Desktop) */}
        <nav className="hidden md:flex justify-center items-center py-2 mt-0">
          <ul className="flex space-x-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    text-sm uppercase tracking-[0.2em] font-light transition-all duration-300 relative
                    ${currentPath === item.id ? 'text-charcoal font-normal' : 'text-charcoal/60 hover:text-terracotta'}
                  `}
                >
                  {item.label}
                  {currentPath === item.id && (
                    <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-terracotta rounded-full"></span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={`
          fixed inset-0 bg-cream/95 backdrop-blur-sm z-40 transition-transform duration-500 ease-in-out md:hidden flex flex-col items-center justify-center
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <nav className="flex flex-col gap-4 text-center">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="text-lg font-serif text-charcoal hover:text-terracotta transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="mt-6 flex gap-4 text-charcoal">
          <Instagram size={20} />
          <Facebook size={20} />
        </div>
      </div>

      {/* Decorative Scalloped Edge supprimée */}
      {/* Bordure scalloped décorative en bas du header */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none select-none">
        <div className="w-full">
          <svg className="block w-full h-[16px] md:h-[24px]" viewBox="0 0 1200 24" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,0 Q12,24 24,0 Q36,24 48,0 Q60,24 72,0 Q84,24 96,0 Q108,24 120,0 Q132,24 144,0 Q156,24 168,0 Q180,24 192,0 Q204,24 216,0 Q228,24 240,0 Q252,24 264,0 Q276,24 288,0 Q300,24 312,0 Q324,24 336,0 Q348,24 360,0 Q372,24 384,0 Q396,24 408,0 Q420,24 432,0 Q444,24 456,0 Q468,24 480,0 Q492,24 504,0 Q516,24 528,0 Q540,24 552,0 Q564,24 576,0 Q588,24 600,0 Q612,24 624,0 Q636,24 648,0 Q660,24 672,0 Q684,24 696,0 Q708,24 720,0 Q732,24 744,0 Q756,24 768,0 Q780,24 792,0 Q804,24 816,0 Q828,24 840,0 Q852,24 864,0 Q876,24 888,0 Q900,24 912,0 Q924,24 936,0 Q948,24 960,0 Q972,24 984,0 Q996,24 1008,0 Q1020,24 1032,0 Q1044,24 1056,0 Q1068,24 1080,0 Q1092,24 1104,0 Q1116,24 1128,0 Q1140,24 1152,0 Q1164,24 1176,0 Q1188,24 1200,0" fill="none" stroke="#222" strokeWidth="24" />
          </svg>
        </div>
      </div>
    </header>
  );
};