import React from 'react';
import { Calendar, MapPin, Clock, Banknote } from 'lucide-react';

export const Ateliers: React.FC = () => {
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

            {/* Bandeau Prochain Atelier */}
            <section className="bg-terracotta text-white py-12 md:py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <span className="inline-block bg-white/20 text-white text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                        Prochain Atelier
                    </span>

                    <h1 className="font-serif text-3xl md:text-5xl mb-6 leading-tight">
                        Un atelier pour soi, pour créer ce que l'on veut voir grandir dans sa vie.
                    </h1>

                    <p className="font-sans text-white/90 text-lg md:text-xl mb-8 leading-relaxed">
                        Offrez-vous une pause créative pour commencer l'année avec intention, douceur et couleurs.
                    </p>

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-8">
                        <p className="text-white/95 leading-relaxed mb-6">
                            À travers la réalisation d'un <strong>vision board illustré à l'aquarelle</strong>, je vous guide pour découvrir les bases de l'illustration, la mise en page et le matériel, dans une ambiance chaleureuse et accessible à tous les niveaux.
                        </p>
                        <p className="text-white/95 leading-relaxed mb-6">
                            Au-delà de la création, ce moment sera aussi un <strong>espace de réflexion et de discussion</strong> autour de cette tendance que l'on voit émerger, de son sens et de la manière dont elle peut s'inscrire dans nos valeurs et notre vie.
                        </p>
                        <p className="text-white/90 italic leading-relaxed">
                            ✨ Vous repartez avec votre création personnelle, de nouvelles bases artistiques, et surtout un moment pour vous recentrer et poser vos intentions avec sens.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 md:gap-6 text-sm md:text-base">
                        <div className="flex items-center gap-2">
                            <MapPin size={18} />
                            <span>Café littéraire La Habana</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Banknote size={18} />
                            <span>1200 DA</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={18} />
                            <span>Paiement sur place</span>
                        </div>
                    </div>

                    <a
                        href="/contact"
                        className="inline-block mt-8 bg-white text-terracotta px-8 py-4 rounded-full font-medium uppercase tracking-widest text-sm hover:bg-cream transition-colors shadow-lg"
                    >
                        S'inscrire
                    </a>
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

                    {/* Grille de photos style polaroid/artiste */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
                        {[
                            { src: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop', rotation: -3, caption: 'Aquarelle' },
                            { src: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=400&fit=crop', rotation: 2, caption: 'Paysage' },
                            { src: 'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=400&h=400&fit=crop', rotation: -1.5, caption: 'Nature' },
                            { src: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400&h=400&fit=crop', rotation: 2.5, caption: 'Créativité' },
                            { src: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop', rotation: -2, caption: 'Expression' },
                            { src: 'https://images.unsplash.com/photo-1456086272160-b28b0645b729?w=400&h=400&fit=crop', rotation: 1, caption: 'Partage' }
                        ].map((photo, i) => (
                            <div
                                key={i}
                                className="group cursor-pointer"
                                style={{ transform: `rotate(${photo.rotation}deg)` }}
                            >
                                {/* Cadre polaroid */}
                                <div className="bg-white p-3 pb-12 shadow-[5px_5px_15px_rgba(0,0,0,0.1)] hover:shadow-[8px_8px_25px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-2">
                                    <div className="aspect-square overflow-hidden">
                                        <img
                                            src={photo.src}
                                            alt={`Atelier ${i + 1}`}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    {/* Légende manuscrite */}
                                    <p className="absolute bottom-3 left-0 right-0 text-center text-charcoal/40 text-xs tracking-widest uppercase font-medium">
                                        {photo.caption}
                                    </p>
                                </div>
                                {/* Petit pin/épingle décoratif */}
                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-terracotta/70 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        ))}
                    </div>

                    {/* Élément décoratif */}
                    <div className="flex justify-center mt-16">
                        <svg width="100" height="30" viewBox="0 0 100 30" className="text-terracotta/20">
                            <path d="M0,15 Q25,0 50,15 Q75,30 100,15" fill="none" stroke="currentColor" strokeWidth="1" />
                            <circle cx="50" cy="15" r="3" fill="currentColor" />
                        </svg>
                    </div>
                </div>
            </section>

            {/* Section Vidéo */}
            <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
                {/* Placeholder vidéo - remplacer par la vraie vidéo */}
                <div className="absolute inset-0 bg-sage/30">
                    <video
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster="/hana.jpg"
                    >
                        {/* Ajouter la source vidéo ici */}
                        <source src="/0424.mp4" type="video/mp4" />
                    </video>
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-charcoal/40" />
                </div>

                {/* Titre par-dessus */}
                <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                    <div>
                        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-4 drop-shadow-lg">
                            Atelier en plein air
                        </h2>
                        <p className="font-sans text-white/90 text-lg md:text-xl max-w-xl mx-auto">
                            Créer au milieu de la nature, là où tout commence.
                        </p>
                    </div>
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
