import { Employee, Room, SearchResultItem } from '@/app/api/api'
import React from 'react'

interface Props {
	entry: SearchResultItem,
}

const SearchResult = ({entry} : Props) => {

	const renderResult = (name: string, tag: string) => {
		return (<div className='py-1 flex flex-row'>
			<svg className="mr-2 h-5 w-5 text-gray-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  
				<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />  
				<circle cx="12" cy="7" r="4" />
			</svg>
			{name}
			<div className='ml-2 px-1 border-solid border-2 border-officemap-blue-400 rounded-md text-sm text-officemap-blue-400'>
				{tag}
			</div>
			</div>)
	}

	const parseResult = (entry : SearchResultItem) => {
		if(entry.type == "employee") {
			const employee = JSON.parse(entry.data) as Employee;
			return renderResult(employee.firstname + "," + employee.lastname, employee.department)
		}
		else if(entry.type == "room") {
			const room = JSON.parse(entry.data) as Room;
			return renderResult(room.name, room.type)
		}
		else {
			return (<></>)
		}
	}


	return (<div className='hover:bg-neutral-100 px-4'>
			{parseResult(entry)}
		</div>)
}

export default SearchResult
