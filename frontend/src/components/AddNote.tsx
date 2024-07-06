import { useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import useAddNote from '../hooks/useAddNote';

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { loading, addNote } = useAddNote();

  const handleCancel: any = async(e: MouseEvent) => {
    setTitle("");
    setContent("");
  }

  const handleSubmit: any = async(e: MouseEvent) => {
    await addNote(title, content);
    setTitle("");
    setContent("");
  }

  return (
    <div>
      <button className='btn btn-square justify-center items-center flex bg-red-800 text-white' onClick={()=>(document.getElementById('add_note_modal') as HTMLDialogElement).showModal()}>
        <IoMdAdd className='w-6 h-6 mx-auto'/>
      </button>
      
      <dialog id="add_note_modal" className="modal">
        <div className="modal-box w-11/12 max-w-xl">
          <h3 className="font-bold text-xl text-white">
            Add Note
          </h3>
          <div>
            <label className="mt-6 input input-bordered flex items-center gap-2 focus:outline-none">
              <input
                type='text'
                placeholder='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='grow'
                autoComplete='false'
                autoCapitalize='true'
              />
            </label>
          </div>
          <div>
            <label className="mt-6 flex items-center gap-2 focus:outline-none">
            <textarea
              rows={3}
              className='textarea textarea-bordered grow'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
              autoComplete="false"
            >
            </textarea>
            </label>
          </div>
          
          <div className="modal-action">
            <form method="dialog">
              <button className="btn m-2 btn-error" onClick={handleCancel}>Cancel</button>
              <button className="btn m-2 btn-success" type='submit' onClick={handleSubmit}>
                { loading ? <span className='loading loading-spinner'></span>: "Add" }
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default AddNote
