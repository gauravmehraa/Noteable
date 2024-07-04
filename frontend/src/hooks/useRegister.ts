import { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const register = async({ name, username, password, confirmPassword }:
    { name: string, username: string, password: string, confirmPassword: string }) => {
    const success: boolean = handleInputErrors({ name, username, password, confirmPassword });
    if(!success) return;
      setLoading(true);
    try{

      const response: Response = await fetch("/api/auth/register",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, username, password, confirmPassword
        }),
      });

      const data = await response.json();
      if(data.error){
        throw new Error(data.error);
      }

      //cache
      localStorage.setItem("notes-user", JSON.stringify(data));

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
  return {register, loading};
}

function handleInputErrors({ name, username, password, confirmPassword }:
  { name: string, username: string, password: string, confirmPassword: string }){
  if(!name || !username || !password || !confirmPassword){
    let emptyField: string = '';
    if(!name) emptyField = 'Name';
    else if(!username) emptyField = 'Username';
    else if(!password) emptyField = 'Password';
    else if(!confirmPassword) emptyField = 'Confirming password';
    toast.error(`${emptyField} is required`);
    return false;
  }
  if(password !== confirmPassword){
    toast.error("Passwords should match");
    return false;
  }
  if(password.length < 6){
    toast.error("Weak password");
    return false;
  }
  return true;
}

export default useRegister;