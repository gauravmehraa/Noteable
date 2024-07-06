import { useState } from 'react'
import { MdEdit } from "react-icons/md";
import useEditNote from '../hooks/useEditNote';

const EditNote = (props: {note: any}) => {
  const [title, setTitle] = useState(props.note.title);
  const [content, setContent] = useState(props.note.content);
  const { loading, editNote } = useEditNote();

  const handleCancel: any = async(e: MouseEvent) => {
    setTitle(props.note.title);
    setContent(props.note.content);
  }

  const handleSubmit: any = async(e: MouseEvent) => {
    await editNote(props.note._id, title, content);
  }

  return (
    <div className='text-white font-normal'>
      <button className='btn btn-square justify-center items-center flex bg-blue-800 text-white' onClick={()=>(document.getElementById(`edit_note_modal_${props.note._id}`) as HTMLDialogElement).showModal()}>
        <MdEdit className='w-6 h-6 mx-auto mr-3 text-white'/>
      </button>
      
      <dialog id={`edit_note_modal_${props.note._id}`} className="modal">
        <div className="modal-box w-11/12 max-w-xl">
          <h3 className="font-bold text-xl text-white">
            Edit Note
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
                { loading ? <span className='loading loading-spinner'></span>: "Save" }
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default EditNote
