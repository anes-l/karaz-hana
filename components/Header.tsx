import React, { useState } from 'react';
import { Instagram, Facebook, ShoppingBag, Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../types';
import { useLocation, useNavigate } from 'react-router-dom';
// import { ScallopedBorder } from './ScallopedBorder';


export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Déduit la page courante à partir de l'URL
  const currentPath = location.pathname.replace(/^\//, '') || 'boutique';

  const handleNavClick = (page: string) => {
    navigate(`/${page}`);
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
              <a href="https://www.instagram.com/karaz.hana/" className="hover:text-terracotta transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-terracotta transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          {/* Center: Logo */}
          <div
            className="flex flex-col items-center justify-center cursor-pointer group mx-auto"
            onClick={() => handleNavClick('accueil')}
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
              onClick={() => handleNavClick('boutique')}
            >
              <ShoppingBag size={20} />
              <span className="absolute top-1 right-0 h-2 w-2 bg-terracotta rounded-full"></span>
            </button>
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

      {/* Bordure festonnée - positionnée en bas du header, chevauche le contenu */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-[calc(100%-2px)] pointer-events-none select-none z-50">
        <svg className="block w-full h-[25px] md:h-[35px]" viewBox="0 0 100 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          {/* Rectangle de jonction pour éviter la ligne */}
          <rect x="0" y="0" width="100" height="2" fill="#F9F7F2" />
          {/* Demi-cercles arrondis */}
          <path d="M0,0 L0,2 Q2.5,10 5,2 Q7.5,10 10,2 Q12.5,10 15,2 Q17.5,10 20,2 Q22.5,10 25,2 Q27.5,10 30,2 Q32.5,10 35,2 Q37.5,10 40,2 Q42.5,10 45,2 Q47.5,10 50,2 Q52.5,10 55,2 Q57.5,10 60,2 Q62.5,10 65,2 Q67.5,10 70,2 Q72.5,10 75,2 Q77.5,10 80,2 Q82.5,10 85,2 Q87.5,10 90,2 Q92.5,10 95,2 Q97.5,10 100,2 L100,0 Z" fill="#F9F7F2" />
        </svg>
      </div>
    </header>
  );
};