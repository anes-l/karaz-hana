import React from 'react';
import { Instagram, Facebook, Mail, Heart } from 'lucide-react';
import { ScallopedBorder } from './ScallopedBorder';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-charcoal text-white overflow-hidden">
      {/* Scalloped border top */}
      <div className="absolute top-0 w-full transform -translate-y-full">
        <ScallopedBorder position="top" color="#4A4A4A" />
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-terracotta/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-sage/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">

        {/* Main content grid */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-12">

          {/* Left: Brand & tagline */}
          <div className="text-center md:text-left">
            <Link to="/accueil" className="inline-block group">
              <h2 className="font-logo text-3xl md:text-4xl text-terracotta uppercase tracking-wider group-hover:text-terracotta/80 transition-colors">
                Karaz Hana
              </h2>
            </Link>
            <p className="font-serif italic text-white/60 mt-4 text-lg leading-relaxed">
              L'art de capturer la beauté<br />dans chaque goutte d'eau
            </p>

            {/* Social icons */}
            <div className="flex gap-4 mt-6 justify-center md:justify-start">
              <a
                href="https://www.instagram.com/karaz.hana/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-terracotta/50 flex items-center justify-center transition-all hover:scale-110"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61574172396909"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-terracotta/50 flex items-center justify-center transition-all hover:scale-110"
              >
                <Facebook size={18} />
              </a>
              <a
                href="mailto:contact@karazhana.com"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-terracotta/50 flex items-center justify-center transition-all hover:scale-110"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Center: Navigation */}
          <div className="text-center">
            <h3 className="font-sans text-xs uppercase tracking-[0.3em] text-white/40 mb-6">Explorer</h3>
            <nav className="flex flex-col gap-3">
              <Link to="/accueil" className="font-sans text-sm text-white/70 hover:text-terracotta transition-colors">
                Accueil
              </Link>
              <Link to="/boutique" className="font-sans text-sm text-white/70 hover:text-terracotta transition-colors">
                Boutique
              </Link>
              <Link to="/ateliers" className="font-sans text-sm text-white/70 hover:text-terracotta transition-colors">
                Ateliers
              </Link>
              <Link to="/contact" className="font-sans text-sm text-white/70 hover:text-terracotta transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Right: Contact & newsletter teaser */}
          <div className="text-center md:text-right">
            <h3 className="font-sans text-xs uppercase tracking-[0.3em] text-white/40 mb-6">Me contacter</h3>
            <p className="font-sans text-sm text-white/70 mb-4">
              Une question, une commande ?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-terracotta hover:bg-terracotta/80 text-white rounded-full text-sm font-medium transition-colors"
            >
              <Mail size={16} />
              Écrivez-moi
            </Link>

            {/* Handwritten style note */}
            <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10 rotate-1 hover:rotate-0 transition-transform">
              <p className="font-serif italic text-white/50 text-sm">
                "Chaque œuvre est une conversation silencieuse entre le papier et l'âme."
              </p>
            </div>
          </div>
        </div>

        {/* Divider with decorative element */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px bg-white/10 flex-1 max-w-[100px]"></div>
          <div className="text-terracotta/50">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C7.5 2 4 6.5 4 11C4 16.5 8 21 12 22C16 21 20 16.5 20 11C20 6.5 16.5 2 12 2ZM12 20C9.5 19 6 15.5 6 11C6 8.5 8.5 4 12 4C15.5 4 18 8.5 18 11C18 15.5 14.5 19 12 20Z" />
            </svg>
          </div>
          <div className="h-px bg-white/10 flex-1 max-w-[100px]"></div>
        </div>

        {/* Bottom copyright */}
        <div className="text-center">
          <p className="font-sans text-xs text-white/30 flex items-center justify-center gap-1">
            © {new Date().getFullYear()} Karaz Hana · Fait avec
            <Heart size={12} className="text-terracotta" fill="currentColor" />
            par Anes Lachachi
          </p>
        </div>
      </div>
    </footer>
  );
};