import React, { createContext, useCallback, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthState {
  user: User;
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  signUp(credentials: SignUpCredentials): Promise<void>;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const history = useHistory();

  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem('@GoBarber:user');
    const token = localStorage.getItem('@GoBarber:token');

    if (user && token) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return {
        user: JSON.parse(user),
        token,
      };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(
    async ({ email, password }: SignInCredentials) => {
      const response = await api.post('sessions', { email, password });

      const { user, token } = response.data;

      localStorage.setItem('@GoBarber:user', JSON.stringify(user));
      localStorage.setItem('@GoBarber:token', token);

      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({ user, token });
      history.push('/dashboard');
    },
    [history],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:user');
    localStorage.removeItem('@GoBarber:token');

    setData({} as AuthState);
    history.push('/');
  }, [history]);

  const signUp = useCallback(
    async ({ name, email, password }: SignUpCredentials) => {
      await api.post('users', { name, email, password });

      history.push('/');
    },
    [history],
  );

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@GoBarber:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, signUp, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
