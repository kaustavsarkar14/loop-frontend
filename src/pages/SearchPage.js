import React from 'react'
import Navbar from '../components/Navbar'
import Search from '../components/Search'

const SearchPage = () => {
  return (
    <div className="flex flex-col relative">
      <Navbar/>
      <Search/>
    </div>
  )
}

export default SearchPage