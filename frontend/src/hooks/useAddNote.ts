import { useState } from "react";
import toast from "react-hot-toast";

const useAddNote = () => {

  const [loading, setLoading] = useState(false);

  const addNote = async(title: string, content: string) => {
    setLoading(true);
    try{
      const response: Response = await fetch('/api/notes/add',{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content })
      });
      
      const data = await response.json();
      if(data.error){
        throw new Error(data.error);
      }
      toast.success("Note successfully added.")
    }
    catch (error){
      toast.error((error as Error).message);
    }
    finally{
      setLoading(false);
    }
  }

  return { loading, addNote };
}

export default useAddNote;