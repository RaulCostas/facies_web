import React, { useState, useEffect } from 'react'
import Protocols from './Protocols'
import logoImg from './assets/logo.jpg'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('facies_auth') === 'true';
  });
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sincronizar ruta en la barra de direcciones del navegador (/login vs /inicio)
  useEffect(() => {
    if (isAuthenticated) {
      if (window.location.pathname !== '/inicio') {
        window.history.replaceState(null, '', '/inicio' + (window.location.hash || ''));
      }
    } else {
      if (window.location.pathname !== '/login') {
        window.history.replaceState(null, '', '/login');
      }
    }

    const handlePopState = () => {
      const isAuth = sessionStorage.getItem('facies_auth') === 'true';
      setIsAuthenticated(isAuth);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    
    // Autenticar de forma inmediata
    sessionStorage.setItem('facies_auth', 'true');
    sessionStorage.setItem('facies_user_email', email);
    
    // Cambiar URL inmediatamente a /inicio
    window.history.pushState(null, '', '/inicio');
    
    try {
      // Notificar al backend en segundo plano
      fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      }).catch(err => console.warn('Sync backend:', err));
      
      setIsSubmitting(false);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error:', error);
      setIsSubmitting(false);
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('facies_auth');
    sessionStorage.removeItem('facies_user_email');
    window.history.pushState(null, '', '/login');
    setIsAuthenticated(false);
  };

  if (isAuthenticated) {
    return <Protocols onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center font-sans px-4 py-12">
      <header className="w-full bg-white shadow-sm px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center fixed top-0 z-50">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <img src={logoImg} alt="Logo Facies Dentium" className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg shadow-sm object-cover" />
          <h1 className="text-lg sm:text-xl font-bold text-gray-800 tracking-wide">FACIES DENTIUM</h1>
        </div>
      </header>

      <main className="mt-16 sm:mt-24 p-2 sm:p-6 w-full max-w-xl sm:max-w-2xl flex flex-col items-center text-center">
        <div className="mb-4">
          <img 
            src={logoImg} 
            alt="Facies Dentium" 
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl shadow-lg border-2 border-white ring-4 ring-blue-100 object-cover mx-auto transform hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4">Protocolos Clínicos y Guías</h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 max-w-lg">
          Accede al material exclusivo para profesionales y pacientes. Por favor, ingresa tu correo para ingresar al material.
        </p>

        <form className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-100" onSubmit={handleSubmit}>
          <div className="mb-6 text-left">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              id="email"
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          <button
            className={`w-full text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 cursor-pointer ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'}`}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </main>
      
      <footer className="mt-auto py-6 text-gray-500 text-xs sm:text-sm text-center">
        © {new Date().getFullYear()} Facies Dentium. Todos los derechos reservados.
      </footer>
    </div>
  )
}

export default App
