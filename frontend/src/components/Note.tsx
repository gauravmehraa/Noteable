import React from 'react'
import { generateTimestamp } from '../utils/timestamp'

const Note = (props: {data: any}) => {
  const date = generateTimestamp(props.data.createdAt);
  return (
    <div className='bg-white m-4 p-4 rounded-md min-w-48 max-w-48'> 
      <div className='text-xl'>{props.data.title}</div>
      <div>{date}</div>
      <div>{props.data.content}</div>
    </div>
  )
}

export default Note
