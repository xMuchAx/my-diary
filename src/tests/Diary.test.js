import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DiaryProvider } from '../context/DiaryContext';
import { MemoryRouter } from 'react-router-dom'; 
import Diary from '../layout/Diary';



test('affiche le titre de MyDiary', () => {
    render(
    <MemoryRouter>  
        <DiaryProvider>
        <Diary />
      </DiaryProvider>
    </MemoryRouter>  
    );
  
    const titleElement = screen.getByText(/Diary Home/i);
    expect(titleElement).toBeInTheDocument();
  });
  
  test('soumet un nouveau mot de passe et redirige vers le journal', () => {
    render(
    <MemoryRouter>  
        <DiaryProvider>
          <Diary />
        </DiaryProvider>
    </MemoryRouter>  
    );
  
    // Remplir le champ de mot de passe
    fireEvent.change(screen.getByPlaceholderText(/Entrez votre mot de passe/i), { target: { value: 'monNouveauMotDePasse' } });
    fireEvent.click(screen.getByText(/Soumettre/i));
  
    // Vérifier que nous sommes redirigés (test à faire avec le mock ou un spy si redirection)
    // Vous pouvez utiliser un mock pour le navigate si vous utilisez useNavigate
  });
