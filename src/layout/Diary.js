import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDiary } from '../context/DiaryContext'; // Importation du hook

function Diary() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const { diarySettings, setDiarySettings, encryptPassword } = useDiary();

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
  
    // Crypte le mot de passe avant de le vérifier ou de le stocker
    const encryptedPassword = encryptPassword(password);
  
    // Vérifie si le mot de passe existe déjà dans diarySettings
    const existingDiary = diarySettings.find(setting => setting.password === encryptedPassword);
    
    if (existingDiary) {
      // Redirige vers la page des notes si le mot de passe existe
      navigate('/diary');
    } else {
      // Si le mot de passe n'existe pas, crée un nouvel objet
      const newDiarySetting = { password: encryptedPassword, notes: [] }; // Stocke le mot de passe chiffré
      setDiarySettings([...diarySettings, newDiarySetting]);
      setPassword(''); // Réinitialise le champ de mot de passe
      navigate('/diary'); // Redirige vers "my-diary"
    }
  };

  return (
    <>
      <h1>Diary Home</h1>
      <form onSubmit={handlePasswordSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Entrez votre mot de passe"
          required
        />
        <button type="submit">Soumettre</button>
      </form>
    </>
  );
}

export default Diary;
