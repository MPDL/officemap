'use client'
import { SearchResultItem, fetchSearch, useSearch } from '@/app/api/api'
import React, { use } from 'react'

interface Props {
    query: string
}

const SearchResults = ({query} : Props) => {
    const results = use(fetchSearch(query))
    if (results == undefined)
        return <div></div>

    return (
        <div>
            { 
                results.map(({type} : SearchResultItem)  => {
                    return <div>{type}</div>
                })
            }
        </div>
    )
}

export default SearchResults
