'use client'
import React, { ReactNode, useState } from 'react'

interface Props {
  children: ReactNode;
}

const Filter = ({children} : Props) => {
	var [visible, setVisible] = useState(true)

	const onClick = () => {
		setVisible(!visible);
	}

  return (
    <div className='absolute top-5 right-5 flex flex-col shadow-xl rounded-3xl p-4 z-[999], bg-white'>
			{ visible ?  
				<>
				<div className='flex flex-row justify-between'>
					<div className='text-xl font-bold'> Filter </div>
					<button className='symbol text-xl' onClick={onClick}>close </button>
				</div>
				<div> 
					{children}
				</div></> 
				:
				<button className='symbol' onClick={onClick}>tune</button>
			}
    </div>
  )
}

export default Filter
