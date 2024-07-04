import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetNotes = () => {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);

  useEffect( () => {
    const getNotes = async() => {
      setLoading(true);
      try{
        const response: Response = await fetch('/api/notes/');
        
        const data = await response.json();
        if(data.error){
          throw new Error(data.error);
        }
        
        setNotes(data);
      }
      catch (error){
        toast.error((error as Error).message);
      }
      finally{
        setLoading(false);
      }
    }
    getNotes();
  }, []);

  return { loading, notes };
}

export default useGetNotes;