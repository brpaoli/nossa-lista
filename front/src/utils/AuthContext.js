import React, { createContext, useState, useEffect, useContext } from "react";
import { authentication, db } from "../../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { LoadingScreen } from "../screens/LoadingScreen";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authentication, async (authUser) => {
      setLoading(true); // Inicia o carregamento
      if (authUser) {
        try {
          const userDocRef = doc(db, "usuarios", authUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              uid: authUser.uid,
              email: authUser.email,
              nome: userData.nome,
              usuario: userData.usuario,
            });
          } else {
            console.log("Usuário não encontrado no Firestore");
          }
        } catch (error) {
          console.error("Erro ao buscar usuário no Firestore:", error);
        }
      } else {
        setUser(null);
      }
      setLoading(false); // Finaliza o carregamento
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadingScreen />; // Substitua por sua tela de carregamento personalizada
  }

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);