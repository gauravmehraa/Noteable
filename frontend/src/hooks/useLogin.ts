import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
 
  const login = async(username: string, password: string) => {
    const success: boolean = handleInputErrors(username, password);
    if(!success) return;

    setLoading(true);
    try{
      const response: Response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      if(data.error){
        throw new Error(data.error);
      }

      //cache
      sessionStorage.setItem("notes-user", JSON.stringify(data));

      //context
      setAuthUser(data);
      
    }
    catch (error){
      toast.error((error as Error).message);
    }
    finally{
      setLoading(false);
    }
  }
  return {login, loading};
}

function handleInputErrors(username: string, password: string){
  if(!username){
    toast.error("Username cannot be blank");
    return false;
  }
  if(!password){
    toast.error("Enter password");
    return false;
  }
  return true;
}

export default useLogin;