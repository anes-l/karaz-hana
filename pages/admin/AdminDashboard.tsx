import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, getCountFromServer } from 'firebase/firestore';
import { Palette, ShoppingBag, Users, TrendingUp, Calendar, ArrowRight, Sparkles } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
    const [totalUsers, setTotalUsers] = useState<string>('...');

    useEffect(() => {
        const fetchUserCount = async () => {
            try {
                const coll = collection(db, "users");
                const snapshot = await getCountFromServer(coll);
                setTotalUsers(snapshot.data().count.toString());
            } catch (error) {
                console.error("Error fetching user count:", error);
                setTotalUsers('-');
            }
        };

        fetchUserCount();
    }, []);

    // Stats placeholder (could be dynamic later)
    const stats = [
        { label: 'Ateliers actifs', value: '3', icon: Calendar, color: 'terracotta' },
        { label: 'Total Inscrits', value: totalUsers, icon: Users, color: 'sage' },
        { label: 'Taux de conversion', value: '68%', icon: TrendingUp, color: 'dusty-pink' },
    ];

    return (
        <div className="min-h-screen bg-cream">
            {/* Hero section with artistic touch */}
            <div className="relative overflow-hidden bg-gradient-to-br from-cream via-dusty-pink/10 to-cream py-12 px-8">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-sage/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                <div className="max-w-6xl mx-auto relative">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <span className="inline-block px-3 py-1 bg-terracotta/10 text-terracotta text-xs font-sans uppercase tracking-widest rounded-full mb-4">
                                <Sparkles size={12} className="inline mr-1" />
                                Espace Gestion
                            </span>
                            <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-2">
                                Bonjour, <span className="italic text-terracotta">Hanane</span> ✨
                            </h1>
                            <p className="font-sans text-charcoal/60 font-light">
                                Voici un aperçu de ton activité artistique
                            </p>
                        </div>

                        {/* Quick action */}
                        <Link
                            to="/gestion/ateliers"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal text-white rounded-full text-sm font-medium hover:bg-terracotta transition-colors shadow-lg"
                        >
                            <Palette size={18} />
                            Gérer les ateliers
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-8 py-12">

                {/* Stats cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-charcoal/5 hover:shadow-md transition-shadow group"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="font-sans text-xs uppercase tracking-widest text-charcoal/50 mb-2">
                                        {stat.label}
                                    </p>
                                    <p className="font-serif text-4xl text-charcoal">
                                        {stat.value}
                                    </p>
                                </div>
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color === 'terracotta' ? 'bg-terracotta/10 text-terracotta' :
                                    stat.color === 'sage' ? 'bg-sage/20 text-sage' :
                                        'bg-dusty-pink/30 text-charcoal/60'
                                    } group-hover:scale-110 transition-transform`}>
                                    <stat.icon size={20} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Section title */}
                <div className="flex items-center gap-4 mb-8">
                    <h2 className="font-serif text-2xl text-charcoal">Accès rapide</h2>
                    <div className="h-px bg-charcoal/10 flex-1"></div>
                </div>

                {/* Management cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Card: Gestion Ateliers */}
                    <Link
                        to="/gestion/ateliers"
                        className="relative bg-white p-8 rounded-tr-[3rem] rounded-bl-[3rem] shadow-md hover:shadow-xl transition-all group border-r-4 border-b-4 border-terracotta/20 overflow-hidden"
                    >
                        {/* Decorative corner */}
                        <div className="absolute -top-6 -right-6 w-16 h-16 bg-terracotta/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>

                        <div className="relative">
                            <div className="w-14 h-14 bg-terracotta/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-terracotta/20 transition-colors">
                                <Palette className="text-terracotta" size={26} />
                            </div>
                            <h3 className="font-serif text-2xl text-charcoal mb-3">Ateliers</h3>
                            <p className="text-charcoal/60 text-sm mb-6 leading-relaxed">
                                Créer, modifier et gérer tes prochains ateliers d'aquarelle.
                            </p>
                            <div className="flex items-center gap-2 text-terracotta font-medium text-sm group-hover:gap-3 transition-all">
                                Gérer les ateliers
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>

                    {/* Placeholder: Boutique */}
                    <div className="relative bg-white/60 p-8 rounded-tl-[3rem] rounded-br-[3rem] border-2 border-dashed border-charcoal/10 flex flex-col overflow-hidden">
                        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-sage/10 rounded-full blur-xl"></div>

                        <div className="relative flex-1">
                            <div className="w-14 h-14 bg-charcoal/5 rounded-full flex items-center justify-center mb-6">
                                <ShoppingBag className="text-charcoal/30" size={26} />
                            </div>
                            <h3 className="font-serif text-2xl text-charcoal/50 mb-3">Boutique</h3>
                            <p className="text-charcoal/40 text-sm mb-6 leading-relaxed">
                                Gère tes œuvres en vente, les tirages et les produits dérivés.
                            </p>
                            <span className="inline-block px-3 py-1 bg-charcoal/5 text-charcoal/40 text-xs rounded-full">
                                Bientôt disponible
                            </span>
                        </div>
                    </div>

                    {/* Placeholder: Clients */}
                    <div className="relative bg-white/60 p-8 rounded-tr-[3rem] rounded-bl-[3rem] border-2 border-dashed border-charcoal/10 flex flex-col overflow-hidden">
                        <div className="absolute -top-4 -right-4 w-16 h-16 bg-dusty-pink/20 rounded-full blur-xl"></div>

                        <div className="relative flex-1">
                            <div className="w-14 h-14 bg-charcoal/5 rounded-full flex items-center justify-center mb-6">
                                <Users className="text-charcoal/30" size={26} />
                            </div>
                            <h3 className="font-serif text-2xl text-charcoal/50 mb-3">Clients</h3>
                            <p className="text-charcoal/40 text-sm mb-6 leading-relaxed">
                                Liste des inscrits, historique des commandes et messages.
                            </p>
                            <span className="inline-block px-3 py-1 bg-charcoal/5 text-charcoal/40 text-xs rounded-full">
                                Bientôt disponible
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
