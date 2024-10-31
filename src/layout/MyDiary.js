import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Notes from '../components/Notes';
import { useDiary } from '../context/DiaryContext';

function MyDiary() {
  const { diarySettings, setDiarySettings, encryptPassword } = useDiary();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  const [currentDiary, setCurrentDiary] = useState(null);
  const navigate = useNavigate();

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    const updatedDiarySettings = [...diarySettings];
    const lastIndex = updatedDiarySettings.length - 1;
    if (lastIndex >= 0) {
      updatedDiarySettings[lastIndex].notes.push({ title, content });
      setDiarySettings(updatedDiarySettings);
      setTitle('');
      setContent('');
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    // Crypte le mot de passe saisi par l'utilisateur
    const encryptedInputPassword = encryptPassword(password);

    // Cherche un journal avec le mot de passe chiffré
    const diary = diarySettings.find(setting => setting.password === encryptedInputPassword);
    
    if (diary) {
      setCurrentDiary(diary);
      setShowNotes(true);
    } else {
      alert('Mot de passe incorrect !');
    }
    setPassword('');
};

  const handleDeleteNote = (index) => {
    const updatedDiarySettings = [...diarySettings];
    const lastIndex = updatedDiarySettings.length - 1;
    if (lastIndex >= 0) {
      updatedDiarySettings[lastIndex].notes.splice(index, 1);
      setDiarySettings(updatedDiarySettings);
      setCurrentDiary(updatedDiarySettings[lastIndex]);
    }
  };

  return (
    <>
      <h1>Mon Journal</h1>

      <form onSubmit={handleNoteSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Contenu"
          required
        />
        <button type="submit">Soumettre Note</button>
      </form>

      <h2>Entrées du journal :</h2>
      <form onSubmit={handlePasswordSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Entrez votre mot de passe"
          required
        />
        <button type="submit">Voir les Notes</button>
      </form>

      {showNotes && currentDiary && (
        <Notes
          notes={currentDiary.notes}
          onEdit={(index) => console.log(`Edit note at index: ${index}`)} // Logique de modification à ajouter
          onDelete={handleDeleteNote}
        />
      )}

      <button onClick={() => navigate('/')}>Retour à l'accueil</button>
    </>
  );
}

export default MyDiary;
