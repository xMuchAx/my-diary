import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DiaryProvider } from '../context/DiaryContext';
import { MemoryRouter } from 'react-router-dom';
import MyDiary from '../layout/MyDiary';

describe('Diary Component', () => {
  test('affiche le titre du journal', () => {
    render(
      <MemoryRouter>  
        <DiaryProvider>
          <MyDiary />
        </DiaryProvider>
      </MemoryRouter>
    );

    const titleElement = screen.getByText(/Mon Journal/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('soumet une note et affiche les notes', () => {
    render(
      <MemoryRouter>  
        <DiaryProvider>
          <MyDiary />
        </DiaryProvider>
      </MemoryRouter>
    );

    // Remplir le formulaire de note
    fireEvent.change(screen.getByPlaceholderText(/Contenu/i), { target: { value: 'Ceci est le contenu de ma note.' } });
    fireEvent.click(screen.getByText(/Soumettre Note/i));

    // Vérifier que la note est affichée
    expect(screen.getByText(/Ceci est le contenu de ma note./i)).toBeInTheDocument();
  });

  test('affiche une alerte en cas de mot de passe incorrect', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {}); // Mock l'alerte
    render(
      <MemoryRouter>  
        <DiaryProvider>
          <MyDiary />
        </DiaryProvider>
      </MemoryRouter>
    );

    // Tenter de voir les notes avec un mot de passe incorrect
    fireEvent.change(screen.getByPlaceholderText(/Entrez votre mot de passe/i), { target: { value: 'wrongPassword' } });
    fireEvent.click(screen.getByText(/Voir les Notes/i));

    expect(window.alert).toHaveBeenCalledWith('Mot de passe incorrect !');
  });
});
