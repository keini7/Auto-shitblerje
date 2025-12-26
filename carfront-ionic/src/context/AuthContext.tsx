import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { Preferences } from '@capacitor/preferences';
import { fetchMe, loginUser, registerUser, AuthResponse } from '../api/auth';

interface AuthContextValue {
  user: AuthResponse['user'] | null;
  token: string | null;
  loading: boolean;
  isLogged: boolean;
  loginWithCredentials: (email: string, password: string) => Promise<void>;
  registerAccount: (
    name: string,
    email: string,
    password: string,
    phone?: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = 'carapp_token';
const USER_KEY = 'carapp_user';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthResponse['user'] | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(async () => {
    setUser(null);
    setToken(null);
    try {
      await Preferences.remove({ key: TOKEN_KEY });
      await Preferences.remove({ key: USER_KEY });
    } catch {
      // Fallback to localStorage for web
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  }, []);

  useEffect(() => {
    const loadAuth = async () => {
      try {
        console.log('[AuthContext] Loading auth state...');
        let savedToken: string | null = null;
        let savedUser: string | null = null;

        try {
          const tokenResult = await Preferences.get({ key: TOKEN_KEY });
          const userResult = await Preferences.get({ key: USER_KEY });
          savedToken = tokenResult.value;
          savedUser = userResult.value;
          console.log('[AuthContext] Loaded from Preferences');
        } catch (e) {
          console.log('[AuthContext] Preferences failed, using localStorage', e);
          savedToken = localStorage.getItem(TOKEN_KEY);
          savedUser = localStorage.getItem(USER_KEY);
        }

        if (savedToken) {
          console.log('[AuthContext] Found saved token');
          setToken(savedToken);
          if (savedUser) {
            try {
              setUser(JSON.parse(savedUser));
            } catch {
              // Invalid JSON, ignore
            }
          }

          try {
            console.log('[AuthContext] Fetching fresh user data...');
            const freshUser = await fetchMe(savedToken);
            setUser(freshUser);
            try {
              await Preferences.set({ key: USER_KEY, value: JSON.stringify(freshUser) });
            } catch {
              localStorage.setItem(USER_KEY, JSON.stringify(freshUser));
            }
            console.log('[AuthContext] User data refreshed');
          } catch (error) {
            console.error('[AuthContext] Auth refresh error', error);
            await logout();
          }
        } else {
          console.log('[AuthContext] No saved token found');
        }
      } catch (err) {
        console.error('[AuthContext] Auth load error', err);
      } finally {
        console.log('[AuthContext] Setting loading to false');
        setLoading(false);
      }
    };

    loadAuth();
  }, [logout]);

  const persistAuth = async (authData: AuthResponse) => {
    setUser(authData.user);
    setToken(authData.token);
    try {
      await Preferences.set({ key: TOKEN_KEY, value: authData.token });
      await Preferences.set({ key: USER_KEY, value: JSON.stringify(authData.user) });
    } catch {
      localStorage.setItem(TOKEN_KEY, authData.token);
      localStorage.setItem(USER_KEY, JSON.stringify(authData.user));
    }
  };

  const loginWithCredentials = useCallback(async (email: string, password: string) => {
    const authData = await loginUser(email, password);
    await persistAuth(authData);
  }, []);

  const registerAccount = useCallback(
    async (name: string, email: string, password: string, phone?: string) => {
      const authData = await registerUser(name, email, password, phone);
      await persistAuth(authData);
    },
    [],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      loading,
      isLogged: Boolean(token),
      loginWithCredentials,
      registerAccount,
      logout,
    }),
    [loading, loginWithCredentials, logout, registerAccount, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
};

