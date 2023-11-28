'use client'
import { SearchResultItem, fetchSearch, useSearch } from '@/app/api/api'
import React, { Suspense, useCallback, useState } from 'react'
import SearchResults from '../SearchResults/SearchResults'
import LoadSearchResults from '../SearchResults/SearchResults'

const Search = () => {
    const [query, setQuery] = useState<string>("")

    return (
        <div className='flex absolute top-5 shadow-xl rounded-3xl p-4'>
            <input
                className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                type="text"
                id="search"
                value={query}
                onChange={(e) => {setQuery(e.target.value)}}
                placeholder="Search for employees, rooms, printers ..." /> 
            <Suspense fallback={<h2>Loading...</h2>}>
                <LoadSearchResults query={query}/>
            </Suspense>
        </div>
    )
}

export default Search
