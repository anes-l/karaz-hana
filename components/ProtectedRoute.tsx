import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: 'admin' | 'user';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
    const { currentUser, userRole, loading } = useAuth();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
    }

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && userRole !== requiredRole) {
        return <Navigate to="/" />; // Or access denied page
    }

    return <>{children}</>;
};
