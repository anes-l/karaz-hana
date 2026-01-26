import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HomeProps {
    onNavigate: (page: any) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex flex-col md:flex-row">
        
        {/* Left: Image Area */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-auto relative overflow-hidden group">
          <div className="absolute inset-0 bg-charcoal/10 z-10 group-hover:bg-transparent transition-colors duration-700"></div>
          <img 
            src="https://picsum.photos/800/1200" 
            alt="Portrait de Karaz Hana" 
            className="w-full h-full object-cover object-center transform scale-105 group-hover:scale-100 transition-transform duration-[2s] ease-in-out"
          />
        </div>

        {/* Right: Content Area (with overlap logic handled by negative margins on large screens) */}
        <div className="w-full md:w-1/2 bg-cream flex flex-col justify-center items-center p-8 md:p-16 lg:p-24 relative">
          
          {/* Overlapping Card Effect */}
          <div className="bg-white p-8 md:p-12 lg:p-16 shadow-2xl md:-ml-24 z-20 rounded-tr-[5rem] rounded-bl-[5rem] border-r-4 border-b-4 border-dusty-pink/30 relative max-w-xl">
             
             {/* Decorative floral element (top right) */}
             <div className="absolute -top-6 -right-6 text-sage/20">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C7.5 2 4 6.5 4 11C4 16.5 8 21 12 22C16 21 20 16.5 20 11C20 6.5 16.5 2 12 2ZM12 20C9.5 19 6 15.5 6 11C6 8.5 8.5 4 12 4C15.5 4 18 8.5 18 11C18 15.5 14.5 19 12 20Z"/>
                </svg>
             </div>

             <span className="font-sans uppercase tracking-[0.3em] text-xs text-sage mb-4 block">
                L'âme de l'artiste
             </span>
             
             <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6 leading-tight">
               L'art de capturer <br/>
               <span className="italic text-terracotta">l'éphémère</span>
             </h2>
             
             <p className="font-sans font-light text-charcoal/80 text-lg leading-relaxed mb-8">
               Bienvenue dans mon univers. Je suis Karaz Hana, aquarelliste passionnée par la lumière et les textures naturelles.
               Mes œuvres sont des fenêtres ouvertes sur des jardins imaginaires où le temps se suspend.
             </p>

             <button 
                onClick={() => onNavigate('universe')}
                className="group flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-charcoal hover:text-terracotta transition-colors"
             >
               Découvrir mon univers
               <span className="block w-8 h-[1px] bg-charcoal group-hover:w-12 group-hover:bg-terracotta transition-all duration-300"></span>
             </button>
          </div>

          {/* Background Text Decoration */}
          <div className="absolute bottom-10 right-10 md:right-20 pointer-events-none select-none overflow-hidden">
             <span className="font-serif text-[10rem] text-dusty-pink/20 leading-none opacity-50">K.H</span>
          </div>
        </div>

      </section>

      {/* Quote / Transition Section */}
      <section className="py-24 px-4 bg-cream text-center relative">
        <div className="max-w-3xl mx-auto">
            <p className="font-serif text-2xl md:text-3xl italic text-charcoal/80 leading-relaxed">
            "L'aquarelle n'est pas seulement de la peinture et de l'eau, c'est une conversation silencieuse entre le papier et l'émotion."
            </p>
            <div className="w-16 h-1 bg-terracotta mx-auto mt-8 rounded-full"></div>
        </div>
      </section>
    </div>
  );
};