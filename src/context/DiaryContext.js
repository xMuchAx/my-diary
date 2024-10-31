import React, { createContext, useContext, useState } from 'react';
import CryptoJS from 'crypto-js'; // Importation de CryptoJS

// Création du contexte
const DiaryContext = createContext();

// Fournisseur du contexte
export const DiaryProvider = ({ children }) => {
  const [diarySettings, setDiarySettings] = useState([]);

  // Fonction pour chiffrer le mot de passe
  const encryptPassword = (password) => {
    console.log(password)
    // Utilisation d'un IV fixe pour obtenir des résultats de chiffrement constants
    const iv = CryptoJS.enc.Hex.parse('0'); 
    const encrypted = CryptoJS.AES.encrypt(password, CryptoJS.enc.Utf8.parse('vj040302'), {
      iv: iv,
    });
    return encrypted.toString();
  };

  return (
    <DiaryContext.Provider value={{ diarySettings, setDiarySettings, encryptPassword }}>
      {children}
    </DiaryContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useDiary = () => useContext(DiaryContext);
