import React, { useState } from 'react';
import { Instagram, Facebook, Search, ShoppingBag, Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../types';
import { useLocation, useNavigate } from 'react-router-dom';
import { ScallopedBorder } from './ScallopedBorder';


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
        <div className="flex justify-between items-center h-14 md:h-20">
          
          {/* Left: Social Icons (Desktop) / Hamburger (Mobile) */}
          <div className="flex-1 flex items-center justify-start gap-4">
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
            className="flex-shrink-0 flex flex-col items-center justify-center cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <h1 className="font-logo text-xl md:text-3xl lg:text-4xl tracking-widest text-charcoal uppercase group-hover:text-terracotta transition-colors duration-500">
              Karaz Hana
            </h1>
            <span className="text-[10px] md:text-xs font-sans tracking-[0.2em] text-sage mt-1 uppercase">
              Aquarelle & Poésie
            </span>
          </div>

          {/* Right: Cart & Account */}
          <div className="flex-1 flex items-center justify-end gap-4">
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

      {/* Decorative Scalloped Edge */}
      <div className="absolute bottom-0 w-full transform translate-y-[99%] text-cream">
        <ScallopedBorder position="bottom" color="#F9F7F2" />
      </div>
    </header>
  );
};