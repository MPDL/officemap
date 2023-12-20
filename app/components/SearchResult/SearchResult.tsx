import { Employee, Room, SearchResultItem } from '@/app/api/api'
import React from 'react'
import { FocusState } from '../PageContent/State'

interface Props {
	entry: SearchResultItem,
	focus: FocusState,
	resetQuery: () => void,
}

const SearchResult = ({entry, focus, resetQuery} : Props) => {

	const renderResult = (type: string, name: string, tag: string) => {
		return (
			<div className='py-1 flex flex-row'>
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
			const onClick = () => {
				console.log("set focus to employee")
				focus.setState({object: employee, type: entry.type})
				resetQuery()
			}

			return (
				<div className='hover:bg-neutral-100 px-4' onClick={onClick}>
					{renderResult("person", employee.firstname + "," + employee.lastname, employee.department)}
				</div>)
			// return renderResult("person", employee.firstname + "," + employee.lastname, employee.department)
		}
		else if(entry.type == "room") {
			const room = JSON.parse(entry.data) as Room;
			const onClick = () => {
				console.log("set focus to room")
				focus.setState({object: room, type: entry.type})
				resetQuery()
			}

			return (
				<div className='hover:bg-neutral-100 px-4' onClick={onClick}>
					{renderResult("meeting_room", room.name, room.type)}
				</div>)
			// return renderResult("meeting_room", room.name, room.type)
		}
		else {
			return (<></>)
		}
	}


		// <div className='hover:bg-neutral-100 px-4'

	return (
		<>
			{parseResult(entry)}
		</>)
}

export default SearchResult
