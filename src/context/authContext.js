import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  reload
} from "firebase/auth";
import { auth } from "../server/firebase";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("there is no auth provider");
  return context;
};

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const  [loading,setLoading] = useState(true);

  const signup = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  const logout = async () => {
    return await signOut(auth);
  };

  const Resetpass = async (email) => {
    return await sendPasswordResetEmail(auth, email);
  }

  const recarga = async () => {
    reload(user);
  }

  return (
    <authContext.Provider value={{ signup, login, user, logout, loading, Resetpass, recarga}}>
      {" "}
      {children}
    </authContext.Provider>
  );
}
