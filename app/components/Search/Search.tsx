import React from 'react'

const Search = () => {
  return (
    <div className='flex absolute top-5 shadow-xl rounded-3xl p-4'>
      <input
        className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
        type="text"
        id="search"
        placeholder="Search for employees, rooms, printers ..." /> 
    </div>
  )
}

export default Search
