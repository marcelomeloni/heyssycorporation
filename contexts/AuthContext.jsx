'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();

  // Ao carregar o site, verifica se alguém já estava logado
  useEffect(() => {
    const savedUser = localStorage.getItem('heyssy_logged_in');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const register = (name, email, password) => {
    // Puxa a "base de dados" falsa do navegador
    const users = JSON.parse(localStorage.getItem('heyssy_users') || '[]');
    
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Este e-mail já está em uso.' };
    }

    const newUser = { id: Date.now(), name, email, password, memberSince: new Date().getFullYear() };
    users.push(newUser);
    localStorage.setItem('heyssy_users', JSON.stringify(users));
    
    return { success: true };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('heyssy_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      // Remove a senha antes de salvar o usuário atual na sessão
      const { password, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('heyssy_logged_in', JSON.stringify(userWithoutPassword));
      return { success: true };
    }
    return { success: false, message: 'E-mail ou senha incorretos.' };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('heyssy_logged_in');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);