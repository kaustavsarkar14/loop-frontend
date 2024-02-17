import React from 'react'

const Comment = ({comment}) => {
  return (
    <div className='bg-gray-900 flex gap-2' >
        <div className='h-6 w-6 rounded-full overflow-hidden' >
            <img src={comment.userId.picturePath} className='w-full h-full object-cover' alt="" />
        </div>
        <div className='flex flex-col' >
            <h1>{comment.userId.name}</h1>
            <p className='text-sm' >{comment.comment}</p>
        </div>
    </div>
  )
}

export default Comment