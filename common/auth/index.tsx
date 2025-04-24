import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

interface AuthContextType {
  user: User | null;
  authLoading: boolean;
  signIn: (
    email: string,
    password: string,
    onLogin: () => void,
    onError: (message: string) => void
  ) => Promise<void>;
  signOut: ({
    onLogout,
    onLogoutError,
  }: {
    onLogout: () => void;
    onLogoutError: (message: string) => void;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const onLogin = async (
  email: string,
  password: string,
  onSignIn: () => void,
  onError: (message: string) => void
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password).then(() => {
      onSignIn();
    });
  } catch (e) {
    if (e instanceof Error) {
      onError(e.message);
    } else {
      onError("An unknown error occurred during login");
    }
  }
};

const onLogout = async ({
  onLogout,
  onLogoutError,
}: {
  onLogout: () => void;
  onLogoutError: (message: string) => void;
}) => {
  try {
    await signOut(auth);
    onLogout();
  } catch (error) {
    if (error instanceof Error) {
      onLogoutError(error.message);
    } else {
      onLogoutError("An unknown error occurred during logout");
    }
  }
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signIn: onLogin, signOut: onLogout, authLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
