import { generateTimestamp } from '../utils/timestamp';
import EditNote from './EditNote';
import DeleteNote from './DeleteNote';
import React from 'react';

const Note = (props: {data: any}) => {
  const date = generateTimestamp(props.data.created);
  return (
    <div className='bg-white m-6 p-6 rounded-md min-w-64 max-w-64 text-black font-normal'> 
      <div className='text-xl mb-6 font-semibold'>{props.data.title}</div>
      <div>{date}</div>
      <div> 
        {/* To render \n as new lines */}
        {props.data.content.split("\n").map((line: any, index: number) => (
          <React.Fragment key={index}> {line} <br/> </React.Fragment>
        ))}
      </div>
      <div className='mt-6 flex flex-row justify-end gap-4'>
        <EditNote note = {props.data}/>
        <DeleteNote note = {props.data}/>
      </div>
    </div>
  )
}

export default Note
