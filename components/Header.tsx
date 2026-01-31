import React, { useState } from 'react';
import { Instagram, Facebook, ShoppingBag, Menu, X, LogIn, User, Shield, LogOut } from 'lucide-react';
import { NAV_ITEMS } from '../types';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Header: React.FC = () => {
  const { userRole, currentUser, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Déduit la page courante à partir de l'URL
  const currentPath = location.pathname.replace(/^\//, '') || 'boutique';

  const handleNavClick = (page: string) => {
    navigate(`/${page}`);
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsDropdownOpen(false);
      navigate('/login');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Déduit si on est sur une page admin
  const isAdminRoute = location.pathname.startsWith('/gestion');

  // Couleurs dynamiques
  const headerBg = isAdminRoute ? 'bg-[#C88D83] mb-12' : 'bg-cream';
  const textColor = isAdminRoute ? 'text-white' : 'text-charcoal';
  const hoverColor = isAdminRoute ? 'hover:text-white/80' : 'hover:text-terracotta';
  const svgFill = isAdminRoute ? '#C88D83' : '#F9F7F2';

  return (
    <header className={`relative w-full z-50 ${headerBg} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-1">
        {/* Top Row: Socials - Logo - Cart */}
        <div className="grid grid-cols-3 items-center h-14 md:h-20">

          {/* Left: Social Icons (Desktop) / Hamburger (Mobile) */}
          <div className="flex items-center justify-start gap-4">
            <button
              className={`md:hidden p-2 ${textColor}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className={`hidden md:flex gap-4 opacity-70 hover:opacity-100 transition-opacity ${textColor}`}>
              <a href="https://www.instagram.com/karaz.hana/" className={`transition-colors ${hoverColor}`} target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
              <a href="https://www.facebook.com/profile.php?id=61574172396909" className={`transition-colors ${hoverColor}`} target="_blank" rel="noopener noreferrer"><Facebook size={20} /></a>
            </div>
          </div>

          {/* Center: Logo */}
          <div
            className="flex flex-col items-center justify-center cursor-pointer group mx-auto"
            onClick={() => handleNavClick('accueil')}
          >
            <h1 className={`font-logo text-xl md:text-3xl lg:text-4xl tracking-widest uppercase transition-colors duration-500 text-center ${textColor} ${hoverColor}`}>
              Karaz Hana
            </h1>
          </div>

          {/* Right: Cart & Account */}
          <div className="flex items-center justify-end gap-4">
            {/* Admin Link if role is admin */}
            {userRole === 'admin' && (
              <Link to="/gestion" className={`hidden md:flex items-center gap-1 transition-colors ${textColor} ${hoverColor}`} title="Gestion">
                <Shield size={20} />
              </Link>
            )}

            {/* Account / Login Icon */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`flex items-center transition-colors ${textColor} ${hoverColor}`}
                >
                  <User size={20} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 z-[60] border border-gray-100">
                    <div className="px-4 py-3 border-b border-gray-100 bg-cream/30">
                      <p className="text-sm font-serif font-bold text-charcoal">{currentUser.displayName || 'Utilisateur'}</p>
                      <p className="text-xs text-charcoal/60 truncate">{currentUser.email}</p>
                    </div>

                    <div className="py-1">
                      {userRole === 'admin' && (
                        <Link
                          to="/gestion"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center w-full px-4 py-2 text-sm text-charcoal/80 hover:bg-cream/50 hover:text-terracotta transition-colors"
                        >
                          <Shield size={16} className="mr-2" />
                          Gestion
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} className="mr-2" />
                        Déconnexion
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className={`${textColor} ${hoverColor}`}>
                <LogIn size={20} />
              </Link>
            )}

            <button
              className={`relative p-2 transition-colors ${textColor} ${hoverColor}`}
              onClick={() => handleNavClick('boutique')}
            >
              <ShoppingBag size={20} />
              <span className="absolute top-1 right-0 h-2 w-2 bg-white rounded-full"></span>
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
                    ${currentPath === item.id ? `${textColor} font-normal` : `${textColor} opacity-60 hover:opacity-100`}
                  `}
                >
                  {item.label}
                  {currentPath === item.id && (
                    <span className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${isAdminRoute ? 'bg-white' : 'bg-terracotta'}`}></span>
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
          {/* Mobile Admin Link */}
          {userRole === 'admin' && (
            <Link to="/gestion" onClick={() => setMobileMenuOpen(false)} className="text-lg font-serif text-terracotta hover:text-terracotta/80 transition-colors mt-2">
              Gestion
            </Link>
          )}
          {!currentUser && (
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-lg font-serif text-charcoal hover:text-terracotta transition-colors">
              Se connecter
            </Link>
          )}
        </nav>
        <div className="mt-6 flex gap-4 text-charcoal">
          <a href="https://www.instagram.com/karaz.hana/" target="_blank" rel="noopener noreferrer" className="hover:text-terracotta transition-colors"><Instagram size={20} /></a>
          <a href="https://www.facebook.com/profile.php?id=61574172396909" target="_blank" rel="noopener noreferrer" className="hover:text-terracotta transition-colors"><Facebook size={20} /></a>
        </div>
      </div>

      {/* Bordure festonnée - positionnée en bas du header, chevauche le contenu */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-[calc(100%-2px)] pointer-events-none select-none z-50 text-[#C88D83]">
        <svg className="block w-full h-[25px] md:h-[35px]" viewBox="0 0 100 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          {/* Rectangle de jonction pour éviter la ligne */}
          <rect x="0" y="0" width="100" height="2" fill={svgFill} />
          {/* Demi-cercles arrondis */}
          <path d="M0,0 L0,2 Q2.5,10 5,2 Q7.5,10 10,2 Q12.5,10 15,2 Q17.5,10 20,2 Q22.5,10 25,2 Q27.5,10 30,2 Q32.5,10 35,2 Q37.5,10 40,2 Q42.5,10 45,2 Q47.5,10 50,2 Q52.5,10 55,2 Q57.5,10 60,2 Q62.5,10 65,2 Q67.5,10 70,2 Q72.5,10 75,2 Q77.5,10 80,2 Q82.5,10 85,2 Q87.5,10 90,2 Q92.5,10 95,2 Q97.5,10 100,2 L100,0 Z" fill={svgFill} />
        </svg>
      </div>
    </header>
  );
};