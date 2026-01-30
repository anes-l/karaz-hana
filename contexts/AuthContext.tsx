import React, { useContext, useState, useEffect, ReactNode } from 'react';
import { auth, db } from '../firebase';
import {
    onAuthStateChanged,
    User,
    signOut as firebaseSignOut,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface AuthContextType {
    currentUser: User | null;
    userRole: 'admin' | 'user' | null;
    loading: boolean;
    logout: () => Promise<void>;
    signInWithGoogle: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userRole, setUserRole] = useState<'admin' | 'user' | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);

            if (user) {
                // Fetch user role from Firestore
                try {
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        setUserRole(userDoc.data()?.role as 'admin' | 'user');
                    } else {
                        setUserRole('user'); // Default role
                    }
                } catch (error) {
                    console.error("Error fetching user role:", error);
                    setUserRole('user');
                }
            } else {
                setUserRole(null);
            }

            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Try to create/check user document, but don't block login if it fails (e.g. permission issues)
            try {
                // Check if user document exists
                const userDocRef = doc(db, 'users', user.uid);
                const userDocSnapshot = await getDoc(userDocRef);

                if (!userDocSnapshot.exists()) {
                    // Create new user document
                    await setDoc(userDocRef, {
                        email: user.email,
                        role: 'user', // Default role
                        createdAt: new Date().toISOString(),
                        photoURL: user.photoURL,
                        displayName: user.displayName
                    });
                }
            } catch (firestoreError) {
                console.warn("Firestore profile creation failed (likely permissions), but Auth succeeded:", firestoreError);
                // We do NOT re-throw here, letting the user proceed as 'user' (fallback in onAuthStateChanged)
            }
        } catch (error) {
            console.error("Error signing in with Google:", error);
            throw error; // Re-throw actual Auth errors
        }
    };

    const logout = () => {
        return firebaseSignOut(auth);
    };

    const value = {
        currentUser,
        userRole,
        loading,
        logout,
        signInWithGoogle
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
