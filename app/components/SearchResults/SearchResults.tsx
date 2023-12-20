'use client'
import { SearchResultItem, fetchSearch, useSearch } from '@/app/api/api'
import React, { Dispatch, SetStateAction, use } from 'react'
import SearchResult from '../SearchResult/SearchResult'
import { FocusState } from '../PageContent/State'

interface Props {
	query: string
	focus: FocusState
	resetQuery: () => void 
}

const SearchResults = ({query, resetQuery, focus} : Props) => {
    const results = use(fetchSearch(query))
    if (results == undefined || results.length == 0)
        return <></>

    return (
				<div>
						{ 
								results.sort((n1, n2) => n1.priority - n2.priority)
								.slice(0, 10)
								.map((entry, key)  => {
										return <SearchResult key={key} entry={entry} focus={focus} resetQuery={resetQuery}/>
								})}
						{
							results.length > 10 ? (
								<div className='text-center italic'>... and {results.length - 10} more. Be more specific!</div>
							) : (<></>)}
				</div>
    )
}

export default SearchResults
