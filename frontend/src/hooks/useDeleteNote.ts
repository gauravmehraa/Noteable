import { useState } from "react";
import toast from "react-hot-toast";
import { useNotes } from "../context/NotesContext";

const useDeleteNote = () => {

  const [loading, setLoading] = useState(false);
  const { deleteNoteContext } = useNotes();

  const deleteNote = async(noteid: string) => {
    setLoading(true);
    try{
      const response: Response = await fetch(`/api/notes/delete/${noteid}`,{
        method: "DELETE"
      });
      
      const data = await response.json();
      if(data.error){
        throw new Error(data.error);
      }
      toast.success("Note successfully deleted.");
      deleteNoteContext(noteid);
    }
    catch (error){
      toast.error((error as Error).message);
    }
    finally{
      setLoading(false);
    }
  }

  return { loading, deleteNote };
}

export default useDeleteNote;