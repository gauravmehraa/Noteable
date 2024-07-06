import { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { useNotes } from '../context/NotesContext';

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const { clearNotesContext } = useNotes();

  const logout = async() => {
    setLoading(true);
    try{
      const response: Response = await fetch("/api/auth/logout",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if(data.error){
        throw new Error(data.error);
      }

      //cache
      sessionStorage.removeItem("notes-user");

      //context
      setAuthUser(null);
      clearNotesContext();
      
    }
    catch (error){
      toast.error((error as Error).message);
    }
    finally{
      setLoading(false);
    }
  }
  return {logout, loading};
}

export default useLogout;