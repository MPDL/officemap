'use client'
import { SearchResultItem, fetchSearch, useSearch } from '@/app/api/api'
import React, { Suspense, useCallback, useState } from 'react'
import SearchResults from '../SearchResults/SearchResults'
import LoadSearchResults from '../SearchResults/SearchResults'

const Search = () => {
    const [query, setQuery] = useState<string>("")

    return (
        <div className='flex flex-col left-1/2  transform -translate-x-1/2  w-1/2 absolute top-5 shadow-xl rounded-3xl p-4 bg-white divide-y'>
					<div className='flex content-center'>
						<div className='symbol text-2xl text-gray-400'>
							search
						</div>
            <input
                className="peer content-center h-full w-full outline-none text-base text-gray-700 px-2"
                type="text"
                id="search"
                value={query}
                onChange={(e) => {setQuery(e.target.value)}}
								autoComplete="off"
                placeholder="Search for employees, rooms, printers ..." /> 
						<button className='symbol text-2xl text-gray-400' onClick={() => {setQuery("")}}>
								close
						</button>
					</div>
					<Suspense>
							<LoadSearchResults query={query}/>
					</Suspense>
        </div>
    )
}


export default Search
