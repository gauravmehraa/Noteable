import { BiLogOut } from 'react-icons/bi';
import useLogout from '../hooks/useLogout';
import AddNote from './AddNote';

const Navbar = () => {
  const { loading, logout } = useLogout();
  return (
    <div className='flex flex-col w-full gap-4 mt-6 sm:mt-2'>
      <div className='text-center text-white mx-auto text-3xl font-bold w-full'>Notes</div>
      <div className='flex flex-row justify-center gap-6'>
        <AddNote/>
        {loading ? 
        <span className='loading loading-spinner'></span>
        :
        <button className='btn btn-square justify-center items-center flex bg-red-800 text-white' onClick={logout}>
          <BiLogOut className='w-6 h-6 mx-auto mr-3 text-white'/>
        </button>}
      </div>
    </div>
  )
}

export default Navbar;