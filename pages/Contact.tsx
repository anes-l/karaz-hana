import React, { useState } from 'react';
import { Mail, MapPin, Send, Palette, Heart } from 'lucide-react';

export const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
                {/* Background decorations */}
                <div className="absolute top-20 left-10 w-64 h-64 bg-dusty-pink/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-sage/10 rounded-full blur-3xl -z-10"></div>

                <div className="text-center max-w-md">
                    <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-sage/20 flex items-center justify-center">
                        <Heart className="w-10 h-10 text-terracotta" fill="currentColor" />
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
                        Merci pour votre message !
                    </h2>
                    <p className="font-sans text-charcoal/70 font-light leading-relaxed mb-8">
                        Je vous répondrai avec joie dans les plus brefs délais.
                        En attendant, n'hésitez pas à explorer mes créations.
                    </p>
                    <a
                        href="/boutique"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-terracotta text-white rounded-full text-sm font-medium uppercase tracking-widest hover:bg-terracotta/90 transition-colors"
                    >
                        <Palette size={16} />
                        Découvrir mes œuvres
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-40 left-0 w-96 h-96 bg-dusty-pink/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-40 right-0 w-80 h-80 bg-sage/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
                <span className="font-serif text-[20rem] text-dusty-pink/5 leading-none">✉</span>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">

                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1 bg-dusty-pink/30 text-charcoal/70 text-xs font-sans uppercase tracking-widest rounded-full mb-4">
                        Échangeons
                    </span>
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6">
                        Parlons de votre <span className="italic text-terracotta">projet</span>
                    </h1>
                    <p className="font-sans text-charcoal/60 font-light text-lg max-w-2xl mx-auto leading-relaxed">
                        Une commande personnalisée, une question sur un atelier, ou simplement l'envie de discuter aquarelle ?
                        Je suis à votre écoute.
                    </p>
                </div>

                <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

                    {/* Left side - Info cards */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Contact info card */}
                        <div className="bg-white p-8 rounded-tr-[3rem] rounded-bl-[3rem] shadow-lg border-r-4 border-b-4 border-dusty-pink/20 relative overflow-hidden group">
                            {/* Decorative corner */}
                            <div className="absolute -top-4 -right-4 w-16 h-16 bg-sage/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>

                            <h3 className="font-serif text-2xl text-charcoal mb-6">Restons en contact</h3>

                            <div className="space-y-5">
                                <a
                                    href="mailto:contact@karazhana.com"
                                    className="flex items-start gap-4 group/item"
                                >
                                    <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-terracotta/20 transition-colors">
                                        <Mail size={18} className="text-terracotta" />
                                    </div>
                                    <div>
                                        <p className="font-sans text-xs uppercase tracking-widest text-charcoal/50 mb-1">Email</p>
                                        <p className="font-sans text-charcoal group-hover/item:text-terracotta transition-colors">contact@karazhana.com</p>
                                    </div>
                                </a>


                            </div>
                        </div>

                        {/* Social / Instagram card */}
                        <div className="bg-charcoal p-8 rounded-tl-[3rem] rounded-br-[3rem] shadow-lg relative overflow-hidden">
                            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-terracotta/20 rounded-full blur-2xl"></div>

                            <h3 className="font-serif text-2xl text-white mb-4">Suivez mon travail</h3>
                            <p className="font-sans text-white/60 font-light text-sm mb-6 leading-relaxed">
                                Coulisses, inspirations et nouvelles créations... Retrouvez-moi sur Instagram.
                            </p>

                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full text-sm font-medium transition-colors"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                                @karazhana
                            </a>
                        </div>

                        {/* Handwritten note */}
                        <div className="relative p-6 rotate-1 hover:rotate-0 transition-transform duration-500">
                            <div className="absolute inset-0 bg-[#FFF9E6] shadow-md transform -rotate-1"></div>
                            <div className="relative">
                                <p className="font-serif italic text-charcoal/80 text-lg leading-relaxed">
                                    "Chaque échange est une source d'inspiration.
                                    N'hésitez pas à me partager vos idées,
                                    même les plus folles !"
                                </p>
                                <p className="font-serif text-terracotta mt-4">— Hanane</p>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Form */}
                    <div className="lg:col-span-3">
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white p-8 md:p-12 rounded-tl-[4rem] rounded-br-[4rem] shadow-xl border-l-4 border-t-4 border-sage/20 relative"
                        >
                            {/* Decorative element */}
                            <div className="absolute -top-6 -left-6 text-sage/20">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C7.5 2 4 6.5 4 11C4 16.5 8 21 12 22C16 21 20 16.5 20 11C20 6.5 16.5 2 12 2ZM12 20C9.5 19 6 15.5 6 11C6 8.5 8.5 4 12 4C15.5 4 18 8.5 18 11C18 15.5 14.5 19 12 20Z" />
                                </svg>
                            </div>

                            <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-8">
                                Envoyez-moi un message
                            </h3>

                            <div className="space-y-6">
                                {/* Name & Email row */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block font-sans text-xs uppercase tracking-widest text-charcoal/60 mb-2">
                                            Votre nom
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-cream/50 border-b-2 border-charcoal/10 focus:border-terracotta focus:bg-white outline-none transition-all font-sans font-light placeholder-charcoal/30"
                                            placeholder="Marie Dupont"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block font-sans text-xs uppercase tracking-widest text-charcoal/60 mb-2">
                                            Votre email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-cream/50 border-b-2 border-charcoal/10 focus:border-terracotta focus:bg-white outline-none transition-all font-sans font-light placeholder-charcoal/30"
                                            placeholder="marie@exemple.com"
                                        />
                                    </div>
                                </div>

                                {/* Subject */}
                                <div>
                                    <label htmlFor="subject" className="block font-sans text-xs uppercase tracking-widest text-charcoal/60 mb-2">
                                        Sujet
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-cream/50 border-b-2 border-charcoal/10 focus:border-terracotta focus:bg-white outline-none transition-all font-sans font-light text-charcoal appearance-none cursor-pointer"
                                    >
                                        <option value="" disabled hidden>Choisissez un sujet...</option>
                                        <option value="commande">Commande personnalisée</option>
                                        <option value="atelier-perso">Atelier personnalisé</option>
                                        <option value="collaboration">Proposition de collaboration</option>
                                        <option value="autre">Autre</option>
                                    </select>
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="block font-sans text-xs uppercase tracking-widest text-charcoal/60 mb-2">
                                        Votre message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 bg-cream/50 border-b-2 border-charcoal/10 focus:border-terracotta focus:bg-white outline-none transition-all font-sans font-light placeholder-charcoal/30 resize-none"
                                        placeholder="Décrivez votre projet, posez vos questions..."
                                    ></textarea>
                                </div>

                                {/* Submit button */}
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full md:w-auto px-10 py-4 bg-terracotta text-white rounded-full font-sans uppercase tracking-widest text-sm hover:bg-terracotta/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                Envoi en cours...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={18} />
                                                Envoyer le message
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
