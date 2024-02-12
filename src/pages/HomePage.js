import React from 'react'
import Navbar from '../components/Navbar.js'
import Body from '../components/Body.js'

const HomePage = () => {
  return (
    <div className="flex flex-col relative">
      <Navbar/>
      <Body/>
    </div>
  )
}

export default HomePage