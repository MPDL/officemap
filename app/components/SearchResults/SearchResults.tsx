'use client'
import { SearchResultItem, fetchSearch, useSearch } from '@/app/api/api'
import React, { use } from 'react'
import SearchResult from '../SearchResult/SearchResult'

interface Props {
    query: string
}

const SearchResults = ({query} : Props) => {
    const results = use(fetchSearch(query))
    if (results == undefined || results.length == 0)
        return <></>

    return (
				<div>
						{ 
								results.sort((n1, n2) => n1.priority - n2.priority)
								.slice(0, 10)
								.map((entry, key)  => {
										return <SearchResult key={key} entry={entry}/>
								})}
						{
							results.length > 10 ? (
								<div className='text-center italic'>... and {results.length - 10} more. Be more specific!</div>
							) : (<></>)}
				</div>
    )
}

export default SearchResults
