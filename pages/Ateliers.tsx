import React from 'react';
import { Calendar, MapPin, Clock, Euro } from 'lucide-react';

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
                            <Euro size={18} />
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
            <section className="py-16 md:py-24 px-4 bg-cream">
                <div className="max-w-6xl mx-auto">
                    <h2 className="font-serif text-3xl md:text-4xl text-charcoal text-center mb-4">
                        Moments capturés
                    </h2>
                    <p className="font-sans text-charcoal/60 text-center mb-12 max-w-2xl mx-auto">
                        Quelques souvenirs de nos ateliers passés, entre nature, créativité et bienveillance.
                    </p>

                    {/* Grille de photos placeholder */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div
                                key={i}
                                className="aspect-square bg-dusty-pink/20 rounded-2xl overflow-hidden relative group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="w-full h-full flex items-center justify-center text-dusty-pink/50">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                                        <circle cx="9" cy="9" r="2" />
                                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                                    </svg>
                                </div>
                            </div>
                        ))}
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
                        {/* <source src="/atelier-video.mp4" type="video/mp4" /> */}
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

            {/* Témoignages */}
            <section className="py-16 md:py-24 px-4 bg-cream">
                <div className="max-w-5xl mx-auto">
                    <h2 className="font-serif text-3xl md:text-4xl text-charcoal text-center mb-4">
                        Ce qu'ils en disent
                    </h2>
                    <p className="font-sans text-charcoal/60 text-center mb-12">
                        Des mots qui réchauffent le cœur 💛
                    </p>

                    {/* Grille de témoignages style "handmade" */}
                    <div className="columns-1 md:columns-2 gap-6 space-y-6">
                        {testimonials.map((testimonial, i) => (
                            <div
                                key={i}
                                className="break-inside-avoid bg-white p-6 md:p-8 rounded-2xl shadow-sm border-l-4 border-terracotta/60 hover:shadow-md transition-shadow"
                                style={{
                                    transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (Math.random() * 0.5)}deg)`
                                }}
                            >
                                <p className="font-sans text-charcoal/80 leading-relaxed italic mb-4">
                                    "{testimonial.text}"
                                </p>
                                <span className="text-sm text-terracotta font-medium">
                                    — {testimonial.author}
                                </span>
                            </div>
                        ))}
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
                        Rejoignez-nous pour un moment de créativité et de partage.
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
