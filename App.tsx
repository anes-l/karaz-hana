
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream flex flex-col font-sans selection:bg-terracotta selection:text-white">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Navigate to="/shop" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/books" element={<UnderConstruction page="Livres" />} />
          <Route path="/universe" element={<UnderConstruction page="Mon Univers" />} />
          <Route path="/contact" element={<UnderConstruction page="Contact" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

// Page temporaire pour les sections non implémentées
const UnderConstruction: React.FC<{ page: string }> = ({ page }) => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
    <h2 className="font-serif text-3xl text-charcoal mb-4">Page en construction</h2>
    <p className="font-sans text-charcoal/60">La section {page} sera bientôt disponible.</p>
    <a href="/home" className="mt-8 text-sm underline decoration-terracotta underline-offset-4 hover:text-terracotta transition-colors">
      Retour à l'accueil
    </a>
  </div>
);

const NotFound: React.FC = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
    <h2 className="font-serif text-3xl text-charcoal mb-4">404 - Page non trouvée</h2>
    <a href="/home" className="mt-8 text-sm underline decoration-terracotta underline-offset-4 hover:text-terracotta transition-colors">
      Retour à l'accueil
    </a>
  </div>
);

export default App;