import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { firebase, auth } from "../../services/firebase";

type User = {
  id: string;
  name: string;
  photo: string;
};

type AuthConxtextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthConxtextType);

const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((response) => {
      handleUserData(response);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    const response = await auth.signInWithPopup(provider);

    handleUserData(response.user);
  };

  const handleUserData = (user: any) => {
    if (user) {
      const { displayName, photoURL, uid } = user;

      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account.");
      }

      setUser({ id: uid, name: displayName, photo: photoURL });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthContextProvider, useAuth };
