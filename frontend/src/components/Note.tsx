import React from 'react';
import { generateTimestamp } from '../utils/timestamp';
import EditNote from './EditNote';
import DeleteNote from './DeleteNote';

const Note = (props: {data: any}) => {
  const date = generateTimestamp(props.data.createdAt);
  return (
    <div className='bg-white m-6 p-6 rounded-md min-w-64 max-w-64'> 
      <div className='text-xl'>{props.data.title}</div>
      <div>{date}</div>
      <div>{props.data.content}</div>
      <div className='mt-6 flex flex-row justify-end gap-4'>
        <EditNote note = {props.data}/>
        <DeleteNote note = {props.data}/>
      </div>
    </div>
  )
}

export default Note
