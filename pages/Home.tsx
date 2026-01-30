import React from 'react';
import { ArrowRight } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex flex-col md:flex-row">

        {/* Left: Image Area */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-auto relative overflow-hidden group rounded-[50px]">

          <img
            src="/hana.jpg"
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
                <path d="M12 2C7.5 2 4 6.5 4 11C4 16.5 8 21 12 22C16 21 20 16.5 20 11C20 6.5 16.5 2 12 2ZM12 20C9.5 19 6 15.5 6 11C6 8.5 8.5 4 12 4C15.5 4 18 8.5 18 11C18 15.5 14.5 19 12 20Z" />
              </svg>
            </div>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal mb-6 leading-tight">
              Salut, je suis <span className="italic text-terracotta">Hanane</span> !
            </h2>

            <p className="font-sans font-medium text-charcoal text-lg mb-4">
              Aquarelliste sensible à la beauté du monde naturel.
            </p>

            <div className="font-sans font-light text-charcoal/80 text-base leading-relaxed space-y-4 mb-8">
              <p>
                Ma créativité naît de l'observation de la nature, de ses formes délicates et de ses couleurs changeantes. Ce lien est aussi scientifique : <strong className="font-medium">écologue de formation</strong>, spécialisée en écologie végétale, j'ai transformé cette passion en langage visuel à travers l'aquarelle.
              </p>
              <p>
                Installée dans une petite ville au nord de l'Algérie, je peins pour donner des couleurs à vos souvenirs et à vos rêves, et inviter à la contemplation du vivant.
              </p>
              <p>
                Au fil des années, j'ai développé un style personnel, délicat et organique. Je réalise des <strong className="font-medium">commandes personnalisées</strong>, crée des œuvres uniques et propose des <strong className="font-medium">ateliers ouverts à tous les âges</strong>.
              </p>
              <p>
                Prenez le temps de découvrir mon univers. Et si une œuvre vous touche ou qu'une idée vous traverse l'esprit, <a href="/contact" className="text-terracotta underline underline-offset-2 hover:text-terracotta/80 transition-colors">écrivez-moi</a> 💛
              </p>
            </div>

            <a
              href="/contact"
              className="inline-flex items-center gap-3 px-6 py-3 bg-terracotta text-white rounded-full text-sm font-medium uppercase tracking-widest hover:bg-terracotta/90 transition-colors shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              Contactez-moi
            </a>
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