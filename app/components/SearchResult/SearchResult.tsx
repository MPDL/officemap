import { Employee, Room, SearchResultItem } from '@/app/api/api'
import React from 'react'

interface Props {
	entry: SearchResultItem,
}

const SearchResult = ({entry} : Props) => {

	const renderResult = (type: string, name: string, tag: string) => {
		return (<div className='py-1 flex flex-row'>
			<div className="mr-2 text-gray-500 symbol">
				{type}
			</div>
			{name}
			<div className='ml-2 px-1 border-solid border-2 border-officemap-blue-400 rounded-md text-sm text-officemap-blue-400'>
				{tag}
			</div>
			</div>)
	}

	const parseResult = (entry : SearchResultItem) => {
		if(entry.type == "employee") {
			const employee = JSON.parse(entry.data) as Employee;
			return renderResult("person", employee.firstname + "," + employee.lastname, employee.department)
		}
		else if(entry.type == "room") {
			const room = JSON.parse(entry.data) as Room;
			return renderResult("meeting_room", room.name, room.type)
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
