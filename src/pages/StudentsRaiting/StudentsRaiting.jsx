import React, { useState } from 'react'
import CustomTable from './CustomTable'

const StudentsRaiting = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className='flex flex-col gap- p-8  overflow-y-hidden'>
            <div className='flex items-center justify-between'>
                <div>
                    <p className='text-3xl font-bold'>Students Rating</p>
                </div>

                <div className='flex items-center'>
                    <label className="input input-info w-96">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input
                            type="search"
                            className="grow"
                            placeholder="Search users.."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </label>
                </div>
            </div>

            <div className='mt-8'>
                <CustomTable filterStudents={searchTerm} />
            </div>
        </div>
    )
}

export default StudentsRaiting
