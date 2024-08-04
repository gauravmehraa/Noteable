import React from 'react'
import { useNotes } from '../context/NotesContext';
import Note from './Note';

const Notes = () => {
  const { loading, notes } = useNotes();
  const sortedNotes = notes.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

  return (
    <div className='flex flex-row flex-wrap justify-center'>

      { loading ?
      <div className='loading loading-spinner'></div>
      :
        sortedNotes.length > 0 ?
        sortedNotes.map((note: { _id: React.Key | null | undefined; }) => (
          <div key={note._id}>
            <Note data={note}/>
          </div>
        ))
        :
        <div className='mt-6 text-2xl font-semibold px-2 text-center'>
          You haven't added any notes yet!
        </div>
      }
  </div>
  )
}

export default Notes
