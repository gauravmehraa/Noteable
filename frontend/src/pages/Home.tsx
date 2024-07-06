import Navbar from '../components/Navbar';
import Notes from '../components/Notes';
import { NotesProvider } from '../context/NotesContext';

const Home = () => {

  return (
    <NotesProvider>
      <div className='flex flex-col items-center justify-start w-full h-full mx-auto'>
        <Navbar/>
          <Notes/>
      </div>
    </NotesProvider>
  )
};

export default Home