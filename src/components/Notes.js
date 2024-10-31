// Notes.js
import React from 'react';

function Notes({ notes, onEdit, onDelete }) {
  const handleDeleteClick = (index) => {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette note ?');
    if (confirmDelete) {
      onDelete(index);
    }
  };

  return (
    <div>
      {notes.length > 0 ? (
        notes.map((note, index) => (
          <div key={index}>
            <h5>{note.title}</h5>
            <p>{note.content}</p>
            <button onClick={() => onEdit(index)}>Modifier</button>
            <button onClick={() => handleDeleteClick(index)}>Supprimer</button>
          </div>
        ))
      ) : (
        <p>Aucune note disponible.</p>
      )}
    </div>
  );
}

export default Notes;
