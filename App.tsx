import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Page } from './types';

const App: React.FC = () => {
  // Setting default page to 'shop' as requested in the prompt ("Page Boutique (Page par défaut)")
  const [currentPage, setCurrentPage] = useState<Page>('shop');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNavigate = (page: Page) => {
    if (currentPage === page) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsTransitioning(false);
      window.scrollTo(0, 0);
    }, 400); // Wait for fade out
  };

  // Content Renderer
  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'shop':
        return <Shop />;
      case 'books':
      case 'universe':
      case 'contact':
        // Reuse Shop's empty state for now as other pages weren't detailed
        return (
          <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
             <h2 className="font-serif text-3xl text-charcoal mb-4">Page en construction</h2>
             <p className="font-sans text-charcoal/60">La section {currentPage} sera bientôt disponible.</p>
             <button 
                onClick={() => handleNavigate('home')} 
                className="mt-8 text-sm underline decoration-terracotta underline-offset-4 hover:text-terracotta transition-colors"
             >
                Retour à l'accueil
             </button>
          </div>
        );
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col font-sans selection:bg-terracotta selection:text-white">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      
      <main className={`flex-grow transition-opacity duration-500 ease-in-out ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        {renderContent()}
      </main>

      <Footer />
    </div>
  );
};

export default App;