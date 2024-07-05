import React from 'react'
import useGetNotes from '../hooks/useGetNotes'
import Note from './Note';

const Notes = () => {
  const { loading, notes } = useGetNotes();

  return (
    <div className='flex flex-row flex-wrap justify-center'>

      { loading ?
      <div className='loading loading-spinner'></div>
      :
        notes.length > 0 ?
        notes.map((note: { _id: React.Key | null | undefined; }) => (
          <div key={note._id} className=''>
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
