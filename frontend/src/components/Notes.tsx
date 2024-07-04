import React from 'react'
import useGetNotes from '../hooks/useGetNotes'
import Note from './Note';

const Notes = () => {
  const { loading, notes } = useGetNotes();
  return (
    <div className='flex flex-row flex-wrap'>

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
        <div className='flex flex-col items-center w-full justify-evenly min-h-36'>
          no notes
        </div>
      }
  </div>
  )
}

export default Notes
