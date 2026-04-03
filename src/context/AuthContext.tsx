import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { ref, get, set } from 'firebase/database';
import { auth, database } from '../firebase';
import { UserProfile, UserRole } from '../types';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signup: (email: string, password: string, role: UserRole) => Promise<void>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  async function signup(email: string, password: string, role: UserRole) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Save role in Realtime Database
    await set(ref(database, 'users/' + user.uid), {
      email,
      role
    });
    
    setUserProfile({ uid: user.uid, email, role });
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const userRef = ref(database, 'users/' + user.uid);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setUserProfile({ uid: user.uid, email: user.email, role: snapshot.val().role });
        } else {
          setUserProfile({ uid: user.uid, email: user.email, role: 'Viewer' }); // Default fallback
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    loading,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
