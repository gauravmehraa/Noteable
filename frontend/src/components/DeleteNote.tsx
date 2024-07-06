import { MdDeleteForever } from "react-icons/md";
import { generateTimestamp } from '../utils/timestamp';
import useDeleteNote from '../hooks/useDeleteNote';

const DeleteNote = (props: {note: any}) => {
  const { loading, deleteNote } = useDeleteNote();

  const handleSubmit: any = async(e: MouseEvent) => {
    await deleteNote(props.note._id);
  }

  return (
    <div className="text-white font-normal">
      <button className='btn btn-square justify-center items-center flex bg-blue-800 text-white' onClick={()=>(document.getElementById(`delete_note_modal_${props.note._id}`) as HTMLDialogElement).showModal()}>
          <MdDeleteForever className='w-6 h-6 mx-auto mr-3 text-white'/>
        </button>
      
      <dialog id={`delete_note_modal_${props.note._id}`} className="modal">
        <div className="modal-box w-11/12 max-w-xl">
          <h3 className="font-bold text-xl text-white">
            Delete Note?
          </h3>
          <div className='mt-4 text-md'>Title: {props.note.title}</div>
          <div className='text-md'>Content: {props.note.content}</div>
          <div className='text-md'>Created at: {generateTimestamp(props.note.created)}</div>
          <p className="py-4 text-lg">Notes once deleted cannot be recovered.</p>
          
          <div className="modal-action">
            <form method="dialog">
              <button className="btn m-2 btn-error">Cancel</button>
              <button className="btn m-2 btn-success" type='submit' onClick={handleSubmit}>
                { loading ? <span className='loading loading-spinner'></span>: "Delete" }
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default DeleteNote
