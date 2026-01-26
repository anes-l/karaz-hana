import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';

export const Shop: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12 md:py-24 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-dusty-pink/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-sage/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-2xl w-full text-center space-y-8 z-10">
        
        {/* Watercolor Illustration Placeholder */}
        <div className="mx-auto w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-xl relative mb-8 rotate-3 transition-transform hover:rotate-0 duration-700">
           <img 
            src="https://picsum.photos/400/400?grayscale&blur=2" 
            alt="Aquarelle en cours" 
            className="w-full h-full object-cover opacity-80"
           />
           <div className="absolute inset-0 bg-terracotta/10 mix-blend-multiply"></div>
        </div>

        <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">
          La Boutique Arrive Bientôt
        </h2>
        
        <p className="font-sans text-charcoal/70 text-lg md:text-xl font-light leading-relaxed max-w-lg mx-auto">
          Je prépare actuellement une nouvelle collection d'originaux et de tirages d'art. 
          Chaque pièce est créée avec patience et passion.
        </p>

        <div className="pt-8">
          <p className="font-serif italic text-sage text-lg mb-4">Soyez les premiers informés</p>
          
          <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/40" size={18} />
              <input 
                type="email" 
                placeholder="Votre adresse email" 
                className="w-full pl-10 pr-4 py-3 bg-white border border-charcoal/10 rounded-none focus:outline-none focus:border-terracotta transition-colors font-sans font-light placeholder-charcoal/30"
              />
            </div>
            <button 
              type="submit"
              className="px-8 py-3 bg-charcoal text-white font-sans uppercase tracking-widest text-xs hover:bg-terracotta transition-colors duration-300 flex items-center justify-center gap-2"
            >
              S'inscrire <ArrowRight size={14} />
            </button>
          </form>
          <p className="text-xs text-charcoal/40 mt-3 font-light">Je promets de ne pas inonder votre boîte mail. Juste de la douceur.</p>
        </div>
      </div>
    </div>
  );
};