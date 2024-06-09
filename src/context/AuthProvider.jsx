import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [updateCount, setUpdateCount] = useState(0);

  const navigate = useNavigate();
  //auth state observer
  useEffect(() => {
    const auth = getAuth();
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unSubscribe();
  }, [authSuccess, updateCount, currentUser]);

  // login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false);
      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      toast.error("Bad user credentials");
    }
  };
  // logout function
  const logout = () => {
    const auth = getAuth();
    setAuthSuccess(true);
    signOut(auth);
    navigate("/signin");
  };

  const authValue = {
    currentUser,
    authSuccess,
    login,
    logout,
    loading,
    setAuthSuccess,
    setUpdateCount,
    setCurrentUser,
  };
  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
