import React from 'react'
import Feed from './Feed'
import LeftBar from './LeftBar'
import RightBar from './RightBar'

const Body = () => {
  return (
    <div className='min-h-screen bg-[--bg-light] dark:bg-[--bg-dark] flex justify-center gap-6' >
      <LeftBar  />
        <Feed/>
      <RightBar/>
    </div>
  )
}

export default Body