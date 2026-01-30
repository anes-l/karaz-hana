
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Ateliers } from './pages/Ateliers';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ManageWorkshops } from './pages/admin/ManageWorkshops';

const App: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/gestion');

  return (
    <AuthProvider>
      <div className="min-h-screen bg-cream flex flex-col font-sans selection:bg-terracotta selection:text-white">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/boutique" replace />} />
            <Route path="/accueil" element={<Home />} />
            <Route path="/boutique" element={<Shop />} />
            <Route path="/ateliers" element={<Ateliers />} />
            <Route path="/contact" element={<UnderConstruction page="Contact" />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Admin Routes */}
            <Route path="/gestion" element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/gestion/ateliers" element={
              <ProtectedRoute requiredRole="admin">
                <ManageWorkshops />
              </ProtectedRoute>
            } />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        {!isAdminRoute && <Footer />}
      </div>
    </AuthProvider>
  );
};

// Page temporaire pour les sections non implémentées
const UnderConstruction: React.FC<{ page: string }> = ({ page }) => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
    <h2 className="font-serif text-3xl text-charcoal mb-4">Page en construction</h2>
    <p className="font-sans text-charcoal/60">La section {page} sera bientôt disponible.</p>
    <a href="/accueil" className="mt-8 text-sm underline decoration-terracotta underline-offset-4 hover:text-terracotta transition-colors">
      Retour à l'accueil
    </a>
  </div>
);

const NotFound: React.FC = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
    <h2 className="font-serif text-3xl text-charcoal mb-4">404 - Page non trouvée</h2>
    <a href="/accueil" className="mt-8 text-sm underline decoration-terracotta underline-offset-4 hover:text-terracotta transition-colors">
      Retour à l'accueil
    </a>
  </div>
);

export default App;