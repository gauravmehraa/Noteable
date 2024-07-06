import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import toast from "react-hot-toast";

interface Note {
  _id: string;
  title: string;
  content: string;
  created: Date;
}

interface NotesContextType {
  notes: Note[];
  loading: boolean;
  addNoteContext: (note: Note) => void;
  editNoteContext: (updatedNote: Note) => void;
  deleteNoteContext: (noteId: string) => void;
  clearNotesContext: () => void;
  refreshNotes: () => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);

  const refreshNotes = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/notes/');
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setNotes(data);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const addNoteContext = (note: Note) => {
    setNotes((prevNotes) => [note, ...prevNotes]);
  };

  const editNoteContext = (updatedNote: Note) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note._id === updatedNote._id ? updatedNote : note))
    );
  };

  const deleteNoteContext = (noteId: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
  }

  const clearNotesContext = () => {
    setNotes([]);
  }

  useEffect(() => {
    refreshNotes();
  }, []);

  return (
    <NotesContext.Provider value={{ notes, loading, clearNotesContext, addNoteContext, editNoteContext, deleteNoteContext, refreshNotes }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("Notes provider missing");
  }
  return context;
};