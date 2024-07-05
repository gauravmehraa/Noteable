import { useState } from "react";
import toast from "react-hot-toast";

const useEditNote = () => {

  const [loading, setLoading] = useState(false);

  const editNote = async(noteid: string, title: string, content: string) => {
    const success: boolean = handleInputErrors({ title, content });
    if(!success) return;
    setLoading(true);
    try{
      const response: Response = await fetch(`/api/notes/update/${noteid}`,{
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content })
      });
      
      const data = await response.json();
      if(data.error){
        throw new Error(data.error);
      }
      toast.success("Note successfully edited.");
    }
    catch (error){
      toast.error((error as Error).message);
    }
    finally{
      setLoading(false);
    }
  }

  return { loading, editNote };
}

function handleInputErrors({ title, content }:
  { title: string, content: string }){
  if(!title || !content ){
    let emptyField: string = '';
    if(!title) emptyField = 'Title';
    else if(!content) emptyField = 'Content';
    toast.error(`${emptyField} is required`);
    return false;
  }
  if(title.length < 6){
    toast.error("Title is too short.");
    return false;
  }
  if(content.length < 6){
    toast.error("Content is too short.");
    return false;
  }
  return true;
}

export default useEditNote;