'use client'
import { SearchResultItem, fetchSearch, useSearch } from '@/app/api/api'
import React, { Suspense, useCallback, useState } from 'react'
import SearchResults from '../SearchResults/SearchResults'
import LoadSearchResults from '../SearchResults/SearchResults'

const Search = () => {
    const [query, setQuery] = useState<string>("")

    return (
        <div className='flex flex-col left-1/2  transform -translate-x-1/2  w-1/2 absolute top-5 shadow-xl rounded-3xl p-4 bg-white divide-y'>
					<div className='flex fle'>
						<svg className="h-6 w-6 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  
							<path stroke="none" d="M0 0h24v24H0z"/>  
							<circle cx="10" cy="10" r="7" />  
							<line x1="21" y1="21" x2="15" y2="15" />
						</svg>
            <input
                className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                type="text"
                id="search"
                value={query}
                onChange={(e) => {setQuery(e.target.value)}}
								autoComplete="off"
                placeholder="Search for employees, rooms, printers ..." /> 
					</div>
					<div>
            <Suspense fallback={<h2>Loading...</h2>}>
                <LoadSearchResults query={query}/>
            </Suspense>
					</div>
        </div>
    )
}

export default Search
