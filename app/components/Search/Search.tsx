'use client'
import { SearchResultItem, fetchSearch, useSearch } from '@/app/api/api'
import React, { Suspense, useCallback, useState } from 'react'
import SearchResults from '../SearchResults/SearchResults'
import LoadSearchResults from '../SearchResults/SearchResults'

const Search = () => {
    const [query, setQuery] = useState<string>("")

    return (
        <div className='flex flex-col left-1/2  transform -translate-x-1/2  w-1/2 absolute top-5 shadow-xl rounded-3xl p-4 bg-white divide-y'>
					<div className='flex'>
						<div className='symbol text-xl'>
							search
						</div>
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
