import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { ChevronRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { signInWithGoogle } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/accueil');
        } catch (err: any) {
            console.error(err);
            setError('Échec de la connexion. Vérifiez vos identifiants.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setError('');
            setLoading(true);
            await signInWithGoogle();
            navigate('/accueil');
        } catch (err: any) {
            console.error("Google Login Error:", err);
            const errorMessage = err.message || 'Échec de la connexion avec Google.';
            const errorCode = err.code ? ` (${err.code})` : '';
            setError(`Erreur Google: ${errorMessage}${errorCode}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-cream px-4">
            <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg border border-charcoal/5 w-full max-w-md relative overflow-hidden">
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-terracotta/5 rounded-bl-[4rem]" />

                <h2 className="font-serif text-3xl text-charcoal mb-8 text-center">Bon retour parmi nous</h2>

                {error && (
                    <div className="bg-red-50 text-red-800 p-3 rounded mb-6 text-sm border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-charcoal/70 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-3 border border-charcoal/10 rounded-md focus:outline-none focus:ring-1 focus:ring-terracotta bg-cream/20"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-charcoal/70 mb-1">Mot de passe</label>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-3 border border-charcoal/10 rounded-md focus:outline-none focus:ring-1 focus:ring-terracotta bg-cream/20"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-terracotta text-white py-3 rounded-md font-medium uppercase tracking-wider text-sm hover:bg-terracotta/90 transition-colors flex items-center justify-center gap-2 group mt-4"
                    >
                        {loading ? 'Connexion...' : 'Se connecter'}
                        {!loading && <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                    </button>

                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase">Ou</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full bg-white text-charcoal border border-charcoal/10 py-3 rounded-md font-medium text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continuer avec Google
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-charcoal/60">
                    Pas encore de compte ?{' '}
                    <Link to="/signup" className="text-terracotta hover:underline underline-offset-4">
                        Créer un compte
                    </Link>
                </div>
            </div>
        </div>
    );
};
