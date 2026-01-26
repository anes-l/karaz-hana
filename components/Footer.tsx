import React from 'react';
import { ScallopedBorder } from './ScallopedBorder';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-white pt-20 pb-10 text-charcoal">
      <div className="absolute top-0 w-full transform -translate-y-full text-white">
         <ScallopedBorder position="top" color="#FFFFFF" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-8">
        
        <h2 className="font-logo text-4xl text-terracotta uppercase tracking-wider">Karaz Hana</h2>
        
        <div className="flex gap-8 text-sm font-sans tracking-widest uppercase text-charcoal/60">
            <a href="#" className="hover:text-charcoal transition-colors">Instagram</a>
            <a href="#" className="hover:text-charcoal transition-colors">Pinterest</a>
            <a href="#" className="hover:text-charcoal transition-colors">Contact</a>
        </div>

        <div className="w-full h-px bg-charcoal/10 max-w-xs mx-auto"></div>

        <p className="font-sans font-light text-xs text-charcoal/40">
          © {new Date().getFullYear()} Karaz Hana. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};