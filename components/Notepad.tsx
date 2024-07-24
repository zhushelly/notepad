"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

const Notepad = () => {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  const fetchNotes = async () => {
    try {
      const response = await axios.get('/api/notes');
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async () => {
    if (noteText.trim() === '') return;
    try {
      if (editId) {
        await axios.put(`/api/notes?id=${editId}`, { text: noteText });
        setEditId(null);
      } else {
        await axios.post('/api/notes', { text: noteText });
      }
      setNoteText('');
      fetchNotes();
    } catch (error) {
      console.error('Error adding/updating note:', error);
    }
  };

  const deleteNote = async (id: number) => {
    try {
      await axios.delete(`/api/notes?id=${id}`);
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const editNote = (note: { id: number; text: string }) => {
    setNoteText(note.text);
    setEditId(note.id);
  };

  return (
    <div>
      <h1>Notepad</h1>
      <input
        type="text"
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
      />
      <button onClick={addNote}>{editId ? 'Update' : 'Add'}</button>
      {isLoading ? (
        <p>Loading...</p> // Show a loading state while fetching data
      ) : (
        <ul>
          {notes.map((note: { id: number; text: string }) => (
            <li key={note.id}>
              {note.text}
              <button onClick={() => editNote(note)}>Edit</button>
              <button onClick={() => deleteNote(note.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notepad;
