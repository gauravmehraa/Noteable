import { BiLogOut } from 'react-icons/bi';
import useLogout from '../hooks/useLogout';
import AddNote from './AddNote';

const Navbar = () => {
  const { loading, logout } = useLogout();
  return (
    <div className='flex flex-row'>
      <AddNote/>
      
      {loading ? 
      <span className='loading loading-spinner'></span>
      :
      <button className='btn btn-circle justify-center items-center flex bg-red-800 text-white' onClick={logout}>
        <BiLogOut className='w-6 h-6 mx-auto mr-3 text-white'/>
      </button>}

    </div>
  )
}

export default Navbar;