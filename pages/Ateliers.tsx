import React from 'react';
import { Calendar, MapPin, Clock, Banknote, Users, Hourglass, Ticket, Star, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Workshop } from '../types';

export const Ateliers: React.FC = () => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [upcomingWorkshop, setUpcomingWorkshop] = React.useState<Workshop | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchUpcomingWorkshop = async () => {
            try {
                const q = query(collection(db, 'workshops'), where('isUpcoming', '==', true));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const doc = querySnapshot.docs[0];
                    setUpcomingWorkshop({ id: doc.id, ...doc.data() } as Workshop);
                }
            } catch (error) {
                console.error("Error fetching workshop:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUpcomingWorkshop();
    }, []);

    // Slider State
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [touchStart, setTouchStart] = React.useState(0);

    // Lightbox State
    const [lightboxImage, setLightboxImage] = React.useState<string | null>(null);
    const [touchEnd, setTouchEnd] = React.useState(0);

    // Auto-scroll logic
    const scrollRef1 = React.useRef<HTMLDivElement>(null);
    const scrollRef2 = React.useRef<HTMLDivElement>(null);
    const scrollRef3 = React.useRef<HTMLDivElement>(null);

    // Auto-scroll logic helper - Simplified and Robust
    const useAutoScroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right' = 'left', speed = 1.0, isLightboxOpen: boolean) => {
        const isPaused = React.useRef(false);
        const isDragging = React.useRef(false);
        const startX = React.useRef(0);
        const scrollLeftStart = React.useRef(0);

        React.useEffect(() => {
            const el = ref.current;
            if (!el) return;

            // Give images some time to load before measuring
            const timeout = setTimeout(() => {
                if (el && direction === 'right' && el.scrollLeft === 0) {
                    el.scrollLeft = el.scrollWidth / 2;
                }
            }, 500);

            let animationId: number;
            const animate = () => {
                const currentEl = ref.current;
                if (!currentEl || isPaused.current || isDragging.current || isLightboxOpen) {
                    animationId = requestAnimationFrame(animate);
                    return;
                }

                const halfWidth = currentEl.scrollWidth / 2;
                if (halfWidth > 0) {
                    if (direction === 'left') {
                        currentEl.scrollLeft += speed;
                        if (currentEl.scrollLeft >= halfWidth) currentEl.scrollLeft -= halfWidth;
                    } else {
                        currentEl.scrollLeft -= speed;
                        if (currentEl.scrollLeft <= 0) currentEl.scrollLeft += halfWidth;
                    }
                }
                animationId = requestAnimationFrame(animate);
            };

            animationId = requestAnimationFrame(animate);
            return () => {
                cancelAnimationFrame(animationId);
                clearTimeout(timeout);
            };
        }, [direction, speed, isLightboxOpen]);

        const onMouseDown = (e: React.MouseEvent) => {
            if (!ref.current) return;
            isDragging.current = true;
            startX.current = e.pageX - ref.current.offsetLeft;
            scrollLeftStart.current = ref.current.scrollLeft;
            isPaused.current = true;
        };

        const onMouseMove = (e: React.MouseEvent) => {
            if (!isDragging.current || !ref.current) return;
            e.preventDefault();
            const x = e.pageX - ref.current.offsetLeft;
            const walk = (x - startX.current) * 2;
            ref.current.scrollLeft = scrollLeftStart.current - walk;
        };

        const stopDragging = () => {
            isDragging.current = false;
        };

        return {
            onMouseEnter: () => { isPaused.current = true; },
            onMouseLeave: () => {
                isPaused.current = false;
                stopDragging();
            },
            onMouseDown,
            onMouseMove,
            onMouseUp: stopDragging,
            onTouchStart: () => { isPaused.current = true; },
            onTouchEnd: () => { isPaused.current = false; },
            style: { touchAction: 'pan-x', scrollBehavior: 'auto' } as React.CSSProperties
        };
    };

    const scrollProps1 = useAutoScroll(scrollRef1, 'left', 1.0, !!lightboxImage);
    const scrollProps2 = useAutoScroll(scrollRef2, 'right', 1.0, !!lightboxImage);
    const scrollProps3 = useAutoScroll(scrollRef3, 'left', 1.0, !!lightboxImage);
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

                    {loading ? (
                        <div className="text-white text-center">Chargement des informations...</div>
                    ) : upcomingWorkshop ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
                            {/* Colonne Image + Texte (Gauche) */}
                            <div className="flex flex-col gap-10">
                                <div className="relative flex justify-center">
                                    <div className="relative z-10 rotate-[-2deg] hover:rotate-0 transition-transform duration-500 w-full max-w-md mx-auto">
                                        {/* Effet 'Scotch' en haut */}
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-40 h-10 bg-white/30 backdrop-blur-sm border border-white/40 shadow-sm rotate-1 z-20" />

                                        <img
                                            src={upcomingWorkshop.imageUrl}
                                            alt={upcomingWorkshop.title}
                                            className="rounded-lg shadow-[4px_4px_25px_rgba(0,0,0,0.15)] w-full object-cover aspect-[4/5] bg-cream border-4 border-white"
                                        />
                                    </div>

                                    {/* Élément décoratif arrière-plan */}
                                    <div className="absolute top-8 -left-6 w-full h-full border-2 border-white/20 rounded-lg -z-0 rotate-3 max-w-md" />
                                </div>

                                {/* Titre Mobile (visible uniquement sur mobile) */}
                                <div className="block md:hidden mt-8 text-center">
                                    <h1 className="font-serif text-4xl text-white mb-2 leading-tight drop-shadow">
                                        {upcomingWorkshop.title}
                                    </h1>
                                </div>

                                {/* Texte descriptif */}
                                <div className="mt-4">
                                    {/* Citation (si présente) */}
                                    {upcomingWorkshop.quote && (
                                        <div className="font-serif text-white/90 text-xl md:text-2xl mb-8 leading-relaxed italic border-l-4 border-white/40 pl-6 py-1">
                                            "{upcomingWorkshop.quote}"
                                        </div>
                                    )}

                                    {/* Description Courte */}
                                    <div className="font-sans text-white/90 text-lg md:text-xl mb-4 leading-relaxed space-y-4">
                                        {upcomingWorkshop.description?.split('\n').map((para, idx) => (
                                            <p key={idx} dangerouslySetInnerHTML={{
                                                __html: para
                                                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                                            }} />
                                        ))}
                                    </div>

                                    {/* Infos Détaillées (Collapsible) */}
                                    <div className={`space-y-4 text-white/90 font-sans leading-relaxed transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-[800px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                                        {upcomingWorkshop.moreInfo?.split('\n').map((para, idx) => (
                                            <p key={idx} dangerouslySetInnerHTML={{
                                                __html: para
                                                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                                            }} />
                                        ))}

                                        {!upcomingWorkshop.moreInfo && (
                                            <p className="italic opacity-70">Plus de détails bientôt...</p>
                                        )}


                                    </div>

                                    {/* Bouton Voir Plus - Masqué si pas de détails supplémentaires */}
                                    {upcomingWorkshop.moreInfo && (
                                        <button
                                            onClick={() => setIsExpanded(!isExpanded)}
                                            className="mt-6 flex items-center gap-2 text-white font-medium hover:text-white/80 transition-colors border-b border-white/30 hover:border-white/80 pb-1"
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
                                    )}
                                </div>
                            </div>

                            {/* Colonne Contenu (Droite) - Titre + Infos Pratiques */}
                            <div className="flex flex-col justify-start items-start md:items-start sticky top-24">
                                <h1 className="hidden md:block font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-10 leading-tight drop-shadow">
                                    {upcomingWorkshop.title}
                                </h1>

                                {/* Informations Pratiques */}
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
                                                <span className="text-charcoal/70 text-sm">{upcomingWorkshop.location}</span>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Calendar className="text-terracotta shrink-0 mt-1" size={20} />
                                            <div>
                                                <span className="font-medium text-charcoal block">Date</span>
                                                <span className="text-charcoal/70 text-sm">{upcomingWorkshop.date}</span>
                                            </div>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Clock className="text-terracotta shrink-0" size={20} />
                                            <span className="text-charcoal/70 text-sm"><strong className="text-charcoal font-medium">Horaire :</strong> {upcomingWorkshop.time}</span>
                                        </li>
                                        {upcomingWorkshop.duration && (
                                            <li className="flex items-center gap-3">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-terracotta shrink-0"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                                <span className="text-charcoal/70 text-sm"><strong className="text-charcoal font-medium">Durée :</strong> {upcomingWorkshop.duration}</span>
                                            </li>
                                        )}
                                        <li className="flex items-center gap-3">
                                            <Banknote className="text-terracotta shrink-0" size={20} />
                                            <span className="text-charcoal/70 text-sm"><strong className="text-charcoal font-medium">Tarif :</strong> {upcomingWorkshop.price} – paiement sur place</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Users className="text-terracotta shrink-0 mt-1" size={20} />
                                            <div>
                                                <span className="font-medium text-charcoal block">Public</span>
                                                <span className="text-charcoal/70 text-sm">{upcomingWorkshop.audience || "Adultes et adolescents à partir de 16 ans"}</span>
                                            </div>
                                        </li>
                                        {upcomingWorkshop.level && (
                                            <li className="flex items-start gap-3">
                                                <Star className="text-terracotta shrink-0 mt-1" size={20} />
                                                <div>
                                                    <span className="font-medium text-charcoal block">Niveau</span>
                                                    <span className="text-charcoal/70 text-sm">{upcomingWorkshop.level}</span>
                                                </div>
                                            </li>
                                        )}
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
                    ) : (
                        <div className="text-white text-center py-20">
                            <h3 className="font-serif text-2xl mb-4">Aucun atelier programmé pour le moment.</h3>
                            <p className="text-white/80">Revenez bientôt pour découvrir nos prochains événements !</p>
                        </div>
                    )}
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

                        <h2 className="font-serif text-3xl md:text-5xl text-charcoal mb-6">
                            Moments de Création
                        </h2>
                    </div>

                    {/* Texte d'introduction */}
                    <div className="max-w-2xl mx-auto text-left md:text-center space-y-4 text-charcoal/70 text-base md:text-lg leading-relaxed mb-8">


                        <p>
                            Les ateliers d'aquarelle que je propose sont généralement <strong className="text-charcoal">à thème</strong>.
                        </p>
                        <p>
                            Je prépare des séances légères et accessibles, où vous découvrez de nouvelles techniques tout en explorant des sujets inspirants.
                        </p>
                        <p>
                            En plein air ou dans un café littéraire, ce sont des moments de <strong className="text-charcoal">plaisir, de détente et de créativité</strong>, que je partage avec des participants de tous niveaux.
                        </p>
                        <p>
                            Pour l'instant, les ateliers ont lieu à <strong className="text-charcoal">Tlemcen</strong>, mais j'aimerais beaucoup en proposer dans d'autres villes.
                        </p>
                        <p className="pt-2">
                            Vous êtes un café, un lieu culturel ou un espace créatif et vous aimeriez accueillir un atelier ?
                        </p>

                        {/* Bouton CTA */}
                        <div className="mt-8 text-center">
                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-terracotta text-white rounded-full font-medium hover:bg-terracotta/90 transition-colors shadow-md hover:shadow-lg"
                            >
                                Discutons de votre projet
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Section Inscription - Handmade Style */}
                    <div className="max-w-4xl mx-auto mb-20 md:mb-32 relative px-4">

                        {/* Elements décoratifs d'arrière-plan */}
                        <div className="absolute top-0 right-10 text-terracotta/10 -z-10">
                            <svg width="150" height="150" viewBox="0 0 200 200">
                                <path d="M40,100 Q100,20 160,100 T280,100" fill="none" stroke="currentColor" strokeWidth="20" strokeLinecap="round" opacity="0.6" />
                            </svg>
                        </div>
                        <div className="absolute -bottom-10 left-0 text-sage/10 -z-10">
                            <svg width="200" height="200" viewBox="0 0 200 200" fill="currentColor">
                                <circle cx="100" cy="100" r="80" />
                            </svg>
                        </div>

                        <div className="relative bg-[#fffdf9] p-8 md:p-12 rounded-sm shadow-[2px_2px_15px_rgba(0,0,0,0.08)] border border-charcoal/5 mx-auto max-w-3xl">

                            {/* Effet Scotch */}
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-32 h-10 bg-white/40 backdrop-blur-[2px] shadow-sm border-l border-r border-white/60 z-10" />

                            <h3 className="font-serif text-3xl md:text-4xl text-charcoal mb-8 text-center" style={{ fontFamily: 'Georgia, serif' }}>
                                Comment participer ?
                            </h3>

                            <div className="space-y-8">
                                <div className="text-center space-y-4">
                                    <p className="font-sans text-lg text-charcoal/80 leading-relaxed">
                                        J’organise <span className="font-serif italic text-xl text-terracotta">un à deux ateliers</span> par mois.
                                    </p>
                                    <p className="font-sans text-charcoal/70">
                                        Les places partent vite à chaque nouvelle annonce !
                                    </p>
                                </div>

                                <div className="bg-sage/5 p-6 rounded-lg border-2 border-dashed border-sage/20 relative">
                                    <div className="absolute -top-3 -left-3 text-2xl">📌</div>
                                    <h4 className="font-serif text-lg text-charcoal mb-4 flex items-center gap-2">
                                        La marche à suivre :
                                    </h4>
                                    <ul className="space-y-4 font-sans text-charcoal/80">
                                        <li className="flex gap-3">
                                            <span className="font-serif italic text-terracotta font-bold text-lg">1.</span>
                                            <span>
                                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-terracotta font-medium hover:underline decoration-wavy underline-offset-4">Suivez-moi sur Instagram</a> pour voir les dates en premier.
                                            </span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="font-serif italic text-terracotta font-bold text-lg">2.</span>
                                            <span>
                                                Une fois l'annonce faite, revenez ici pour réserver votre place.
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="pt-6 border-t border-charcoal/10 text-center">
                                    <p className="font-serif text-xl text-charcoal mb-2">
                                        Ne ratez aucun atelier !
                                    </p>
                                    <p className="text-sm text-charcoal/60 mb-6 max-w-md mx-auto">
                                        Créez votre compte membre gratuitement pour être notifié par email dès qu'une nouvelle date est en ligne.
                                    </p>

                                    <a
                                        href="/signup"
                                        className="inline-block px-8 py-4 bg-charcoal text-white rounded-full font-medium tracking-wide hover:bg-terracotta transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-xl"
                                    >
                                        Créer mon compte membre
                                    </a>
                                    <p className="mt-3 text-xs text-charcoal/40 italic">
                                        C'est gratuit et ça prend 30 secondes.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                <div className="max-w-6xl mx-auto">
                    {/* Titre Galerie */}
                    <div className="text-center mb-4">
                        <h2 className="font-serif text-3xl md:text-5xl text-charcoal">
                            Galerie des ateliers
                        </h2>
                    </div>
                    {/* Video Slider moved here */}
                    {/* Styles pour cacher la scrollbar */}
                    <style>{`
                        .no-scrollbar::-webkit-scrollbar {
                            display: none;
                        }
                        .no-scrollbar {
                            -ms-overflow-style: none;
                            scrollbar-width: none;
                        }
                    `}</style>

                    {/* Simple Separator Top */}
                    <div className="flex justify-center mb-8 opacity-20">
                        <svg width="400" height="20" viewBox="0 0 400 20" className="text-charcoal">
                            <path d="M0,10 Q50,0 100,10 T200,10 T300,10 T400,10" fill="none" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>

                    <div className="relative w-[100vw] left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] mb-12 group h-[60vh] md:h-[80vh] overflow-hidden"
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

                    </div>

                    {/* Simple Separator Bottom */}
                    <div className="flex justify-center mt-4 mb-4 opacity-20">
                        <svg width="400" height="20" viewBox="0 0 400 20" className="text-charcoal">
                            <path d="M0,10 Q50,20 100,10 T200,10 T300,10 T400,10" fill="none" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>

                    <div className="relative w-[100vw] left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] overflow-hidden space-y-10">
                        {/* Row 1: Octobre Rose */}
                        <div>
                            <div className="flex items-center justify-center gap-4 mb-4">
                                <svg width="30" height="10" viewBox="0 0 30 10" className="text-dusty-pink/40">
                                    <path d="M0,5 Q7,0 15,5 Q23,10 30,5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                                <h3 className="text-2xl md:text-3xl font-serif italic text-charcoal/70 tracking-wide">Octobre Rose</h3>
                                <svg width="30" height="10" viewBox="0 0 30 10" className="text-dusty-pink/40 rotate-180">
                                    <path d="M0,5 Q7,0 15,5 Q23,10 30,5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                            </div>
                            <div
                                className="flex overflow-x-auto no-scrollbar gap-4 px-4 pb-4 cursor-grab active:cursor-grabbing"
                                ref={scrollRef1}
                                {...scrollProps1}
                            >
                                {[...Array(2)].map((_, i) => (
                                    <React.Fragment key={i}>
                                        <img src="/octobre rose/1769554013942_thumb.webp" alt="Octobre Rose" className="h-56 md:h-72 w-auto object-cover rounded-sm hover:opacity-90 transition-opacity flex-shrink-0" onClick={() => setLightboxImage('/octobre rose/1769554013942.jpg')} draggable="false" />
                                        <img src="/octobre rose/1769554013984_thumb.webp" alt="Octobre Rose" className="h-56 md:h-72 w-auto object-cover rounded-sm hover:opacity-90 transition-opacity flex-shrink-0" onClick={() => setLightboxImage('/octobre rose/1769554013984.jpg')} draggable="false" />
                                        <img src="/octobre rose/1769554014020_thumb.webp" alt="Octobre Rose" className="h-56 md:h-72 w-auto object-cover rounded-sm hover:opacity-90 transition-opacity flex-shrink-0" onClick={() => setLightboxImage('/octobre rose/1769554014020.jpg')} draggable="false" />
                                        <img src="/octobre rose/1769554014050_thumb.webp" alt="Octobre Rose" className="h-56 md:h-72 w-auto object-cover rounded-sm hover:opacity-90 transition-opacity flex-shrink-0" onClick={() => setLightboxImage('/octobre rose/1769554014050.jpg')} draggable="false" />
                                        <img src="/octobre rose/1769554014080_thumb.webp" alt="Octobre Rose" className="h-56 md:h-72 w-auto object-cover rounded-sm hover:opacity-90 transition-opacity flex-shrink-0" onClick={() => setLightboxImage('/octobre rose/1769554014080.jpg')} draggable="false" />
                                        <img src="/octobre rose/WhatsApp Image 2025-10-16 at 20.18.47_thumb.webp" alt="Octobre Rose" className="h-56 md:h-72 w-auto object-cover rounded-sm hover:opacity-90 transition-opacity flex-shrink-0" onClick={() => setLightboxImage('/octobre rose/WhatsApp Image 2025-10-16 at 20.18.47.jpeg')} draggable="false" />
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        {/* Séparateur aquarelle */}
                        <div className="flex items-center justify-center opacity-30">
                            <svg width="200" height="20" viewBox="0 0 200 20" className="text-terracotta">
                                <path d="M0,10 Q25,2 50,10 Q75,18 100,10 Q125,2 150,10 Q175,18 200,10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>

                        {/* Row 2: Valentine (Reverse) */}
                        <div>
                            <div className="flex items-center justify-center gap-4 mb-4">
                                <svg width="30" height="10" viewBox="0 0 30 10" className="text-dusty-pink/40">
                                    <path d="M0,5 Q7,0 15,5 Q23,10 30,5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                                <h3 className="text-2xl md:text-3xl font-serif italic text-charcoal/70 tracking-wide">Valentine</h3>
                                <svg width="30" height="10" viewBox="0 0 30 10" className="text-dusty-pink/40 rotate-180">
                                    <path d="M0,5 Q7,0 15,5 Q23,10 30,5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                            </div>
                            <div
                                className="flex overflow-x-auto no-scrollbar gap-4 px-4 pb-4 cursor-grab active:cursor-grabbing"
                                ref={scrollRef2}
                                {...scrollProps2}
                            >
                                {[...Array(2)].map((_, i) => (
                                    <React.Fragment key={i}>
                                        <img src="/valentine/valentine_thumb.webp" alt="Valentine" className="h-56 md:h-72 w-auto object-cover rounded-sm hover:opacity-90 transition-opacity flex-shrink-0" onClick={() => setLightboxImage('/valentine/valentine.jpg')} draggable="false" />
                                        <img src="/valentine/valentine(1)_thumb.webp" alt="Valentine" className="h-56 md:h-72 w-auto object-cover rounded-sm hover:opacity-90 transition-opacity flex-shrink-0" onClick={() => setLightboxImage('/valentine/valentine(1).jpg')} draggable="false" />
                                        <img src="/valentine/valentine(2)_thumb.webp" alt="Valentine" className="h-56 md:h-72 w-auto object-cover rounded-sm hover:opacity-90 transition-opacity flex-shrink-0" onClick={() => setLightboxImage('/valentine/valentine(2).jpg')} draggable="false" />
                                        <img src="/valentine/valentine(3)_thumb.webp" alt="Valentine" className="h-56 md:h-72 w-auto object-cover rounded-sm hover:opacity-90 transition-opacity flex-shrink-0" onClick={() => setLightboxImage('/valentine/valentine(3).jpg')} draggable="false" />
                                        <img src="/valentine/1769441541619_thumb.webp" alt="Valentine" className="h-56 md:h-72 w-auto object-cover rounded-sm hover:opacity-90 transition-opacity flex-shrink-0" onClick={() => setLightboxImage('/valentine/1769441541619.jpg')} draggable="false" />
                                        <img src="/valentine/1769441541793_thumb.webp" alt="Valentine" className="h-56 md:h-72 w-auto object-cover rounded-sm hover:opacity-90 transition-opacity flex-shrink-0" onClick={() => setLightboxImage('/valentine/1769441541793.JPG')} draggable="false" />
                                        <img src="/valentine/1769441541812_thumb.webp" alt="Valentine" className="h-56 md:h-72 w-auto object-cover rounded-sm hover:opacity-90 transition-opacity flex-shrink-0" onClick={() => setLightboxImage('/valentine/1769441541812.JPG')} draggable="false" />
                                        <img src="/valentine/1769441541833_thumb.webp" alt="Valentine" className="h-56 md:h-72 w-auto object-cover rounded-sm hover:opacity-90 transition-opacity flex-shrink-0" onClick={() => setLightboxImage('/valentine/1769441541833.JPG')} draggable="false" />
                                        <img src="/valentine/1769441541851_thumb.webp" alt="Valentine" className="h-56 md:h-72 w-auto object-cover rounded-sm hover:opacity-90 transition-opacity flex-shrink-0" onClick={() => setLightboxImage('/valentine/1769441541851.JPG')} draggable="false" />
                                        <img src="/valentine/1769441541890_thumb.webp" alt="Valentine" className="h-56 md:h-72 w-auto object-cover rounded-sm hover:opacity-90 transition-opacity flex-shrink-0" onClick={() => setLightboxImage('/valentine/1769441541890.JPG')} draggable="false" />
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        {/* Séparateur aquarelle */}
                        <div className="flex items-center justify-center opacity-30">
                            <svg width="200" height="20" viewBox="0 0 200 20" className="text-sage">
                                <path d="M0,10 Q25,2 50,10 Q75,18 100,10 Q125,2 150,10 Q175,18 200,10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>

                        {/* Row 3: Plein Air */}
                        <div>
                            <div className="flex items-center justify-center gap-4 mb-4">
                                <svg width="30" height="10" viewBox="0 0 30 10" className="text-sage/40">
                                    <path d="M0,5 Q7,0 15,5 Q23,10 30,5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                                <h3 className="text-2xl md:text-3xl font-serif italic text-charcoal/70 tracking-wide">Plein Air</h3>
                                <svg width="30" height="10" viewBox="0 0 30 10" className="text-sage/40 rotate-180">
                                    <path d="M0,5 Q7,0 15,5 Q23,10 30,5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                            </div>
                            <div
                                className="flex overflow-x-auto no-scrollbar gap-4 px-4 pb-4 cursor-grab active:cursor-grabbing"
                                ref={scrollRef3}
                                {...scrollProps3}
                            >
                                {[...Array(2)].map((_, i) => (
                                    <React.Fragment key={i}>
                                        <img src="/plein air/DSC05954_thumb.webp" alt="Plein Air" className="h-56 md:h-72 w-auto object-cover rounded-sm hover:opacity-90 transition-opacity flex-shrink-0" onClick={() => setLightboxImage('/plein air/DSC05954.JPG')} draggable="false" />
                                        <img src="/plein air/DSC05976_thumb.webp" alt="Plein Air" className="h-56 md:h-72 w-auto object-cover rounded-sm hover:opacity-90 transition-opacity flex-shrink-0" onClick={() => setLightboxImage('/plein air/DSC05976.JPG')} draggable="false" />
                                        <img src="/plein air/DSC05977_thumb.webp" alt="Plein Air" className="h-56 md:h-72 w-auto object-cover rounded-sm hover:opacity-90 transition-opacity flex-shrink-0" onClick={() => setLightboxImage('/plein air/DSC05977.JPG')} draggable="false" />
                                        <img src="/plein air/DSC05982_thumb.webp" alt="Plein Air" className="h-56 md:h-72 w-auto object-cover rounded-sm hover:opacity-90 transition-opacity flex-shrink-0" onClick={() => setLightboxImage('/plein air/DSC05982.JPG')} draggable="false" />
                                        <img src="/plein air/DSC06030_thumb.webp" alt="Plein Air" className="h-56 md:h-72 w-auto object-cover rounded-sm hover:opacity-90 transition-opacity flex-shrink-0" onClick={() => setLightboxImage('/plein air/DSC06030.JPG')} draggable="false" />
                                        <img src="/plein air/DSC06041_thumb.webp" alt="Plein Air" className="h-56 md:h-72 w-auto object-cover rounded-sm hover:opacity-90 transition-opacity flex-shrink-0" onClick={() => setLightboxImage('/plein air/DSC06041.JPG')} draggable="false" />
                                        <img src="/plein air/DSC06116_thumb.webp" alt="Plein Air" className="h-56 md:h-72 w-auto object-cover rounded-sm hover:opacity-90 transition-opacity flex-shrink-0" onClick={() => setLightboxImage('/plein air/DSC06116.JPG')} draggable="false" />
                                        <img src="/plein air/DSC06219_thumb.webp" alt="Plein Air" className="h-56 md:h-72 w-auto object-cover rounded-sm hover:opacity-90 transition-opacity flex-shrink-0" onClick={() => setLightboxImage('/plein air/DSC06219.JPG')} draggable="false" />
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Lightbox Modal */}
                    {lightboxImage && (
                        <div
                            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
                            onClick={() => setLightboxImage(null)}
                        >
                            <button
                                className="absolute top-6 right-6 text-white text-4xl hover:text-white/70 transition-colors z-10"
                                onClick={() => setLightboxImage(null)}
                                aria-label="Fermer"
                            >
                                ✕
                            </button>
                            <img
                                src={lightboxImage}
                                alt="Image agrandie"
                                className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    )}
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
