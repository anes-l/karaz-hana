import React from 'react';
import { Link } from 'react-router-dom';
import { Palette } from 'lucide-react';

export const AdminDashboard: React.FC = () => {

    return (
        <div className="min-h-screen bg-cream p-8">
            <div className="max-w-4xl mx-auto">
                <header className="flex justify-between items-center mb-12">
                    <h1 className="font-serif text-4xl text-charcoal">Tableau de bord</h1>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card: Gestion Ateliers */}
                    <Link to="/gestion/ateliers" className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all group border border-charcoal/5">
                        <div className="w-12 h-12 bg-terracotta/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Palette className="text-terracotta" size={24} />
                        </div>
                        <h3 className="font-serif text-xl text-charcoal mb-3">Ateliers</h3>
                        <p className="text-charcoal/60 text-sm mb-4">
                            Gérer les prochains ateliers, modifier les descriptions et les photos.
                        </p>
                        <span className="text-terracotta text-sm font-medium border-b border-terracotta/30 pb-0.5 group-hover:border-terracotta transition-colors">
                            Gérer →
                        </span>
                    </Link>

                    {/* Placeholder for future features */}
                    <div className="bg-white/50 p-8 rounded-lg border border-dashed border-charcoal/20 flex flex-col items-center justify-center text-center opacity-70">
                        <span className="text-4xl mb-4 grayscale">🛍️</span>
                        <h3 className="font-serif text-lg text-charcoal/60 mb-2">Boutique (Bientôt)</h3>
                        <p className="text-charcoal/40 text-xs">
                            La gestion des produits sera disponible prochainement.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
