import Navbar from '../components/Navbar';
import Notes from '../components/Notes';

const Home = () => {

  return (
    <div className='flex flex-col items-center justify-center w-full mx-auto'>
      <Navbar/>
      <Notes/>
    </div>
  )
};

export default Home