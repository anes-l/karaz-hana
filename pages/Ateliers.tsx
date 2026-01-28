import React from 'react';
import { Calendar, MapPin, Clock, Banknote, Users, Hourglass, Ticket, Star, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';

export const Ateliers: React.FC = () => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    // Slider State
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [touchStart, setTouchStart] = React.useState(0);
    const [touchEnd, setTouchEnd] = React.useState(0);

    const slides = [
        {
            type: 'video',
            src: '/0424.mp4',
            poster: '/hana.jpg',
            title: 'Atelier en plein air',
            subtitle: 'Créer au milieu de la nature, là où tout commence.'
        },
        {
            type: 'video',
            src: '/plage.mp4',
            poster: '/hana.jpg',
            title: 'Atelier à la plage',
            subtitle: "L'inspiration au rythme des vagues."
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) {
            nextSlide();
        }
        if (isRightSwipe) {
            prevSlide();
        }

        setTouchStart(0);
        setTouchEnd(0);
    };

    const testimonials = [
        {
            text: "Franchement, j'ai participé à trois ateliers et c'était vraiment magnifique. Je ne regrette absolument pas. J'adore l'ambiance, ta méthode, les ateliers en plein air et surtout ta gentillesse avec tout le monde.",
            author: "Participante"
        },
        {
            text: "J'ai participé à pas mal d'ateliers et je dirais que à chaque fois je passe un excellent moment. Je fais de nouvelles connaissances et j'apprends beaucoup côté aquarelle. C'est un moment de pure bonheur et de tranquillité.",
            author: "Participante"
        },
        {
            text: "Très bonne découverte, je suis de nature une personne très fermée à la nouveauté et pourtant ton atelier m'a directement donné envie de m'inscrire et depuis je me suis réconcilié avec l'aventure et l'inconnu.",
            author: "Participant"
        },
        {
            text: "I've loved all 3 workshops I attended with you. You're always very helpful in explaining everything and I can't wait to learn more!",
            author: "Participante"
        },
        {
            text: "C'est une belle découverte pour moi, une escapade de la routine, rencontrer des gens et surtout s'exprimer par la peinture 🥰",
            author: "Participante"
        },
        {
            text: "J'adore tes ateliers et toi aussi t'es une personne incroyable <3",
            author: "Participante"
        },
        {
            text: "Je te félicite pour ce concept, bon courage et continue à faire de l'art ✨",
            author: "Participant"
        }
    ];

    return (
        <div className="w-full">
            {/* Section Vision Board - Prochain Atelier */}
            <section className="bg-terracotta py-16 md:py-24 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-12 text-center">
                        <span className="inline-block bg-white/30 text-white text-xs uppercase tracking-widest px-6 py-2 rounded-full mb-4 font-medium shadow-md">
                            Prochain Atelier
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
                        {/* Colonne Image + Texte (Gauche) */}
                        <div className="flex flex-col gap-10">
                            <div className="relative flex justify-center">
                                <div className="relative z-10 rotate-[-2deg] hover:rotate-0 transition-transform duration-500 w-full max-w-md mx-auto">
                                    {/* Effet 'Scotch' en haut */}
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-40 h-10 bg-white/30 backdrop-blur-sm border border-white/40 shadow-sm rotate-1 z-20" />

                                    <img
                                        src="/vision-board-workshop.png"
                                        alt="Exemple de Vision Board illustré"
                                        className="rounded-lg shadow-[4px_4px_25px_rgba(0,0,0,0.15)] w-full object-cover aspect-[4/5] bg-cream border-4 border-white"
                                    />
                                </div>

                                {/* Élément décoratif arrière-plan */}
                                <div className="absolute top-8 -left-6 w-full h-full border-2 border-white/20 rounded-lg -z-0 rotate-3 max-w-md" />
                            </div>

                            {/* Titre Mobile (visible uniquement sur mobile) - Placé entre l'image et le texte */}
                            <div className="block md:hidden mt-8 text-center">
                                <h1 className="font-serif text-4xl text-white mb-2 leading-tight drop-shadow">
                                    Vision Board <span className="text-cream">illustré</span> à l'aquarelle
                                </h1>
                            </div>

                            {/* Texte descriptif déplacé ici */}
                            <div className="mt-4">
                                <p className="font-sans text-white/90 text-lg md:text-xl mb-4 leading-relaxed italic border-l-4 border-white/40 pl-4">
                                    "Un atelier pour soi, pour créer ce que l'on veut voir grandir dans sa vie."
                                </p>

                                <div className="space-y-6 text-white/90 font-sans leading-relaxed">
                                    <p>
                                        À travers la réalisation d'un <strong>vision board illustré à l'aquarelle</strong>, je vous guide pour découvrir les bases de l'illustration, accessibles à tous les niveaux, dans une ambiance simple et chaleureuse.
                                    </p>
                                    <p>
                                        Ici, la technique de l'aquarelle se mêle à la réflexion personnelle.
                                    </p>
                                    <p>
                                        Un espace où l'on apprend, on échange et on explore ensemble, en toute authenticité.
                                    </p>
                                </div>

                                <div className={`space-y-6 text-white/90 font-sans leading-relaxed transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-[800px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                                    <p>
                                        Au-delà de la création, ce moment sera aussi un <strong>espace de réflexion et de discussion</strong> autour de cette tendance que l'on voit émerger, de son sens et de la manière dont elle peut s'inscrire dans nos valeurs et notre religion.
                                    </p>
                                    <p>
                                        Le temps de discussion sera animé par une amie passionnée par l'analyse et l'échange d'idées, afin d'ouvrir le dialogue avec bienveillance et profondeur.
                                    </p>
                                    <p>
                                        Vous repartez avec votre création personnelle, de nouvelles bases artistiques, et surtout un moment pour vous recentrer et poser vos intentions avec sens.
                                    </p>
                                    <p className="font-medium text-cream">
                                        Venez avec <strong>une idée claire des objectifs</strong> que vous souhaitez représenter.
                                    </p>
                                    <p className="font-bold text-white">
                                        Tout le matériel est fourni.
                                    </p>
                                </div>

                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="mt-4 flex items-center gap-2 text-white font-medium hover:text-white/80 transition-colors border-b border-transparent hover:border-white/50 pb-1"
                                >
                                    {isExpanded ? (
                                        <>
                                            <ChevronUp size={20} />
                                            Réduire
                                        </>
                                    ) : (
                                        <>
                                            <ChevronDown size={20} />
                                            En savoir plus sur l'atelier
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Colonne Contenu (Droite) - Titre + Infos Pratiques */}
                        <div className="flex flex-col justify-start items-start md:items-start sticky top-24">
                            <h1 className="hidden md:block font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-10 leading-tight drop-shadow">
                                Vision Board <span className="text-cream">illustré</span> à l'aquarelle
                            </h1>

                            {/* Informations Pratiques */}
                            <div className="w-full bg-white/90 rounded-2xl p-8 border border-white/40 relative overflow-hidden shadow-xl">
                                <div className="absolute top-0 right-0 w-20 h-20 bg-terracotta/10 rounded-bl-full" />

                                <h3 className="font-serif text-2xl text-terracotta mb-6 flex items-center gap-3">
                                    <span className="w-8 h-[1px] bg-terracotta"></span>
                                    Informations pratiques
                                </h3>

                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <MapPin className="text-terracotta shrink-0 mt-1" size={20} />
                                        <div>
                                            <span className="font-medium text-charcoal block">Lieu</span>
                                            <span className="text-charcoal/70 text-sm">Café littéraire La Habana, Bouhanak les 400, Palais des poètes, Tlemcen, 13000</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Calendar className="text-terracotta shrink-0 mt-1" size={20} />
                                        <div>
                                            <span className="font-medium text-charcoal block">Date</span>
                                            <span className="text-charcoal/70 text-sm">7 février 2026</span>
                                        </div>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Clock className="text-terracotta shrink-0" size={20} />
                                        <span className="text-charcoal/70 text-sm"><strong className="text-charcoal font-medium">Horaire :</strong> 9h30</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Hourglass className="text-terracotta shrink-0" size={20} />
                                        <span className="text-charcoal/70 text-sm"><strong className="text-charcoal font-medium">Durée :</strong> 3 heures</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Banknote className="text-terracotta shrink-0" size={20} />
                                        <span className="text-charcoal/70 text-sm"><strong className="text-charcoal font-medium">Tarif :</strong> 1 200 DA – paiement sur place</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Users className="text-terracotta shrink-0 mt-1" size={20} />
                                        <div>
                                            <span className="font-medium text-charcoal block">Public</span>
                                            <span className="text-charcoal/70 text-sm">Adultes et adolescents à partir de 16 ans</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Star className="text-terracotta shrink-0 mt-1" size={20} />
                                        <div>
                                            <span className="font-medium text-charcoal block">Niveau</span>
                                            <span className="text-charcoal/70 text-sm">Accessible à tous, débutants bienvenus</span>
                                        </div>
                                    </li>

                                </ul>

                                <div className="mt-8 pt-6 border-t border-terracotta/10">
                                    <a
                                        href="/contact"
                                        className="w-full md:w-auto inline-flex justify-center items-center gap-2 bg-terracotta text-white px-8 py-4 rounded-full font-medium uppercase tracking-widest text-sm hover:bg-terracotta/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 group"
                                    >
                                        <Ticket className="group-hover:animate-pulse" size={20} />
                                        Réserver ma place
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Anciens Ateliers - Photos */}
            <section className="py-20 md:py-28 px-4 bg-gradient-to-b from-dusty-pink/5 via-cream to-cream overflow-hidden">
                <div className="max-w-6xl mx-auto">
                    {/* Titre décoratif */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-4 mb-4">
                            <svg width="40" height="20" viewBox="0 0 40 20" className="text-terracotta/30">
                                <path d="M0,10 Q10,0 20,10 Q30,20 40,10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                            <span className="text-terracotta/50 text-sm uppercase tracking-[0.3em] font-medium">Galerie</span>
                            <svg width="40" height="20" viewBox="0 0 40 20" className="text-terracotta/30 rotate-180">
                                <path d="M0,10 Q10,0 20,10 Q30,20 40,10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        </div>
                        <h2 className="font-serif text-3xl md:text-5xl text-charcoal mb-4">
                            Moments capturés
                        </h2>
                        <p className="font-sans text-charcoal/50 max-w-lg mx-auto text-sm md:text-base">
                            Quelques souvenirs de mes ateliers passés, entre nature, créativité et bienveillance.
                        </p>
                    </div>

                    {/* Styles pour l'animation marquee */}
                    <style>{`
                        @keyframes marquee {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        @keyframes marquee-reverse {
                            0% { transform: translateX(-50%); }
                            100% { transform: translateX(0); }
                        }
                        .animate-marquee {
                            animation: marquee 40s linear infinite;
                        }
                        .animate-marquee-reverse {
                            animation: marquee-reverse 40s linear infinite;
                        }
                        .marquee-content:hover {
                            animation-play-state: paused;
                        }
                    `}</style>
                    <div className="relative w-[99vw] left-[50%] right-[50%] -ml-[49.5vw] -mr-[49.5vw] overflow-hidden">
                        {/* First Row: Nature & Workshops */}
                        <div className="flex mb-8 overflow-hidden group">
                            <div className="flex animate-marquee marquee-content">
                                {/* Photos (Repeated twice for seamless loop) */}
                                {[...Array(2)].map((_, i) => (
                                    <React.Fragment key={i}>
                                        <img src="https://picsum.photos/seed/art1/400/500" alt="Atelier moment" className="h-64 md:h-80 w-auto object-cover mx-2 rounded-sm" />
                                        <img src="https://picsum.photos/seed/art2/400/500" alt="Atelier moment" className="h-64 md:h-80 w-auto object-cover mx-2 rounded-sm" />
                                        <img src="https://picsum.photos/seed/art3/400/500" alt="Atelier moment" className="h-64 md:h-80 w-auto object-cover mx-2 rounded-sm" />
                                        <img src="https://picsum.photos/seed/art4/400/500" alt="Atelier moment" className="h-64 md:h-80 w-auto object-cover mx-2 rounded-sm" />
                                        <img src="https://picsum.photos/seed/art5/400/500" alt="Atelier moment" className="h-64 md:h-80 w-auto object-cover mx-2 rounded-sm" />
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        {/* Second Row: Detailed & Artistic (Reverse Direction) */}
                        <div className="flex overflow-hidden group">
                            <div className="flex animate-marquee-reverse marquee-content">
                                {/* Photos (Repeated twice for seamless loop) */}
                                {[...Array(2)].map((_, i) => (
                                    <React.Fragment key={i}>
                                        <img src="https://picsum.photos/seed/paint1/400/500" alt="Atelier détail" className="h-64 md:h-80 w-auto object-cover mx-2 rounded-sm" />
                                        <img src="https://picsum.photos/seed/paint2/400/500" alt="Atelier détail" className="h-64 md:h-80 w-auto object-cover mx-2 rounded-sm" />
                                        <img src="https://picsum.photos/seed/paint3/400/500" alt="Atelier détail" className="h-64 md:h-80 w-auto object-cover mx-2 rounded-sm" />
                                        <img src="https://picsum.photos/seed/paint4/400/500" alt="Atelier détail" className="h-64 md:h-80 w-auto object-cover mx-2 rounded-sm" />
                                        <img src="https://picsum.photos/seed/paint5/400/500" alt="Atelier détail" className="h-64 md:h-80 w-auto object-cover mx-2 rounded-sm" />
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Vidéo Slider */}
            <section
                className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden group"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                    >
                        <div className="absolute inset-0 bg-sage/30">
                            <video
                                className="w-full h-full object-cover"
                                autoPlay
                                muted
                                loop
                                playsInline
                                poster={slide.poster}
                            >
                                <source src={slide.src} type="video/mp4" />
                            </video>
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-charcoal/40" />
                        </div>

                        {/* Contenu Texte */}
                        <div className="absolute inset-0 flex items-center justify-center text-center px-12 md:px-20">
                            <div className="transform transition-all duration-700 translate-y-0 opacity-100">
                                <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-4 drop-shadow-lg">
                                    {slide.title}
                                </h2>
                                <p className="font-sans text-white/90 text-lg md:text-xl max-w-xl mx-auto drop-shadow-md">
                                    {slide.subtitle}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Navigation Arrows (Desktop) */}
                <button
                    onClick={prevSlide}
                    className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 items-center justify-center text-white hover:scale-110 transition-transform drop-shadow-lg"
                    aria-label="Previous slide"
                >
                    <ChevronLeft size={48} />
                </button>

                <button
                    onClick={nextSlide}
                    className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 items-center justify-center text-white hover:scale-110 transition-transform drop-shadow-lg"
                    aria-label="Next slide"
                >
                    <ChevronRight size={48} />
                </button>

                {/* Indicateurs (Dots) */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white scale-110' : 'bg-white/40 hover:bg-white/60'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </section>

            {/* Ateliers Personnalisés */}
            <section className="py-24 md:py-32 px-4 bg-gradient-to-br from-sage/5 via-cream to-dusty-pink/10 relative overflow-hidden">
                {/* Éléments décoratifs d'arrière-plan */}
                <div className="absolute top-10 left-10 opacity-10">
                    <svg width="120" height="120" viewBox="0 0 120 120" className="text-sage">
                        <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" />
                    </svg>
                </div>
                <div className="absolute bottom-20 right-10 opacity-10">
                    <svg width="80" height="80" viewBox="0 0 80 80" className="text-terracotta">
                        <path d="M10,40 Q40,10 70,40 Q40,70 10,40" fill="none" stroke="currentColor" strokeWidth="1" />
                    </svg>
                </div>

                <div className="max-w-5xl mx-auto relative">
                    {/* Titre artistique */}
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <svg width="50" height="20" viewBox="0 0 50 20" className="text-terracotta/40">
                                <path d="M0,10 C10,0 20,20 30,10 C40,0 50,10 50,10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                            <span className="text-terracotta/70 text-xs uppercase tracking-[0.4em] font-medium">Sur mesure</span>
                            <svg width="50" height="20" viewBox="0 0 50 20" className="text-terracotta/40 rotate-180">
                                <path d="M0,10 C10,0 20,20 30,10 C40,0 50,10 50,10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        </div>
                        <h2 className="font-serif text-4xl md:text-6xl text-charcoal mb-6 leading-tight">
                            Un atelier<br />
                            <span className="italic text-terracotta/80">rien que pour vous</span>
                        </h2>
                        <p className="font-sans text-charcoal/50 max-w-md mx-auto text-sm md:text-base leading-relaxed">
                            Envie d'un moment créatif unique ? Je crée des ateliers sur mesure pour vos occasions spéciales.
                        </p>
                    </div>

                    {/* Cartes style carnet de croquis */}
                    <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                        {[
                            {
                                title: 'Anniversaire',
                                description: 'Célébrez avec un atelier créatif mémorable entre proches.',
                                rotation: -3,
                                bg: 'bg-amber-50/60',
                                svg: <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-terracotta/60"><circle cx="20" cy="25" r="12" /><path d="M20 13 L20 5 M14 8 L14 4 M26 8 L26 4" /><path d="M20 5 C20 3 22 2 22 2 M14 4 C14 2 16 1 16 1 M26 4 C26 2 28 1 28 1" /></svg>
                            },
                            {
                                title: 'Entre amis',
                                description: 'Un moment de partage et de créativité pour renforcer vos liens.',
                                rotation: 2,
                                bg: 'bg-rose-50/50',
                                svg: <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-terracotta/60"><circle cx="12" cy="15" r="6" /><circle cx="28" cy="15" r="6" /><path d="M6 35 C6 25 18 25 20 25 C22 25 34 25 34 35" /></svg>
                            },
                            {
                                title: 'EVJF / EVG',
                                description: 'Une activité originale pour fêter les futurs mariés.',
                                rotation: -1.5,
                                bg: 'bg-orange-50/40',
                                svg: <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-terracotta/60"><path d="M20 35 L8 20 C4 14 8 6 16 10 L20 15 L24 10 C32 6 36 14 32 20 Z" /></svg>
                            }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className={`${item.bg} w-64 p-8 relative group cursor-pointer`}
                                style={{
                                    transform: `rotate(${item.rotation}deg)`,
                                    boxShadow: '6px 6px 0 rgba(0,0,0,0.05)'
                                }}
                            >
                                {/* Bord façon papier déchiré */}
                                <div className="absolute inset-0 border-2 border-charcoal/5" />

                                {/* Coin plié */}
                                <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-white/80 to-transparent"
                                    style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
                                />

                                {/* Contenu */}
                                <div className="text-center">
                                    <div className="flex justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                                        {item.svg}
                                    </div>
                                    <h3 className="font-serif text-xl text-charcoal mb-3">
                                        {item.title}
                                    </h3>
                                    <div className="w-12 h-[1px] bg-terracotta/30 mx-auto mb-4" />
                                    <p className="font-sans text-charcoal/60 text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Petit dessin décoratif en bas */}
                                <div className="absolute bottom-3 right-3 opacity-20 group-hover:opacity-40 transition-opacity">
                                    <svg width="24" height="24" viewBox="0 0 24 24" className="text-terracotta">
                                        <path d="M12,2 L12,22 M2,12 L22,12" fill="none" stroke="currentColor" strokeWidth="0.5" />
                                        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="0.5" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Autres options + CTA */}
                    <div className="text-center mt-20">
                        <div className="inline-flex flex-wrap justify-center gap-4 mb-8">
                            {['Team building', 'Retraite bien-être', "Événement d'entreprise"].map((tag, i) => (
                                <span
                                    key={i}
                                    className="px-4 py-2 bg-white/60 text-charcoal/50 text-xs uppercase tracking-widest rounded-full border border-charcoal/10"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <p className="font-sans text-charcoal/40 text-sm mb-8 italic">
                            ...et bien plus encore, tout est possible !
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-terracotta text-white rounded-full font-medium uppercase tracking-widest text-sm hover:bg-terracotta/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                        >
                            <span>✉</span>
                            Discutons de votre projet
                        </a>
                    </div>
                </div>
            </section>

            {/* Témoignages */}
            <section className="py-20 md:py-28 px-4 bg-gradient-to-b from-cream via-dusty-pink/10 to-cream overflow-hidden">
                <div className="max-w-6xl mx-auto">
                    {/* Titre style manuscrit */}
                    <div className="text-center mb-16">
                        <span className="inline-block text-terracotta/60 text-6xl md:text-8xl font-serif leading-none select-none" style={{ fontFamily: 'Georgia, serif' }}>
                            "
                        </span>
                        <h2 className="font-serif text-3xl md:text-5xl text-charcoal -mt-8 mb-4">
                            Leurs mots, ma source d'inspiration
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-terracotta/40 to-transparent mx-auto" />
                    </div>

                    {/* Grille de témoignages style notes artistiques */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {testimonials.map((testimonial, i) => {
                            const rotations = [-2, 1.5, -1, 2, -1.5, 1, -0.5];
                            const bgColors = [
                                'bg-white',
                                'bg-amber-50/80',
                                'bg-white',
                                'bg-rose-50/60',
                                'bg-white',
                                'bg-orange-50/50',
                                'bg-white'
                            ];
                            return (
                                <div
                                    key={i}
                                    className={`${bgColors[i % bgColors.length]} p-6 md:p-8 rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] 
                                        hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.08)] transition-all duration-300 
                                        border border-charcoal/5 relative group`}
                                    style={{
                                        transform: `rotate(${rotations[i % rotations.length]}deg)`,
                                    }}
                                >
                                    {/* Decoration coin */}
                                    <div className="absolute top-3 right-3 w-8 h-8 opacity-20 group-hover:opacity-40 transition-opacity">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-terracotta">
                                            <path d="M12 2L12 22M2 12L22 12M5 5L19 19M19 5L5 19" strokeWidth="0.5" />
                                        </svg>
                                    </div>

                                    {/* Guillemet décoratif */}
                                    <span className="text-4xl md:text-5xl text-terracotta/20 font-serif leading-none block mb-2 select-none">
                                        ❝
                                    </span>

                                    <p className="font-sans text-charcoal/75 leading-relaxed text-sm md:text-base mb-6" style={{ fontStyle: 'italic' }}>
                                        {testimonial.text}
                                    </p>

                                    {/* Signature style manuscrit */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-[2px] bg-gradient-to-r from-terracotta/60 to-transparent" />
                                        <span className="text-xs uppercase tracking-[0.2em] text-charcoal/50 font-medium">
                                            {testimonial.author}
                                        </span>
                                    </div>

                                    {/* Petit élément décoratif en bas */}
                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-10">
                                        <svg width="40" height="10" viewBox="0 0 40 10">
                                            <path d="M0,5 Q10,0 20,5 Q30,10 40,5" fill="none" stroke="currentColor" strokeWidth="1" className="text-terracotta" />
                                        </svg>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Élément décoratif final */}
                    <div className="flex justify-center mt-16">
                        <div className="flex items-center gap-4 text-charcoal/20">
                            <div className="w-12 h-[1px] bg-current" />
                            <span className="text-2xl">✦</span>
                            <div className="w-12 h-[1px] bg-current" />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-16 bg-dusty-pink/20 text-center px-4">
                <div className="max-w-2xl mx-auto">
                    <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-4">
                        Envie de participer ?
                    </h2>
                    <p className="font-sans text-charcoal/70 mb-8">
                        Rejoignez-moi pour un moment de créativité et de partage.
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-terracotta text-white rounded-full font-medium uppercase tracking-widest text-sm hover:bg-terracotta/90 transition-colors shadow-lg"
                    >
                        Me contacter
                    </a>
                </div>
            </section>
        </div>
    );
};
