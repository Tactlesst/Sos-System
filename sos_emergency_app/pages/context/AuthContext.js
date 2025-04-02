import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // Initialize auth state
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userType = localStorage.getItem('userType');
    
    if (token && userId && userType) {
      setUser({ token, userId, userType });
    }
  }, []);

  const login = (token, userId, userType, rememberMe = false) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('userType', userType);
    if (rememberMe) {
      localStorage.setItem('rememberMe', 'true');
    }
    setUser({ token, userId, userType });
  };

  const logout = (showMessage = true) => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    setUser(null);
    
    if (showMessage) {
      Swal.fire({
        icon: 'info',
        title: 'Logged Out',
        text: 'You have been logged out due to session expiration',
      }).then(() => {
        router.push('/auth');
      });
    } else {
      router.push('/auth');
    }
  };

  // Wrapper for authenticated fetch calls
  const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        // Handle token expiration
        if (errorData.code === 'TOKEN_EXPIRED') {
          logout();
          throw new Error('Session expired');
        }
        
        throw new Error(errorData.message || 'API request failed');
      }

      return await response.json();
    } catch (error) {
      console.error('API call error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, fetchWithAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}