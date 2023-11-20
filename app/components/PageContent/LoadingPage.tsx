"use client"
import { useRooms, usePrinters, useEmployees } from '@/app/api/api';
import React from 'react'
import PageContent from './PageContent';

const LoadingPage = () => {
  const { rooms, isLoading: isRoomsLoading, isError: isRoomsError } = useRooms();
  const { printers, isLoading: isPrintersLoading, isError: isPrintersError } = usePrinters();
  const { employees, isLoading: isEmployeesLoading, isError: isEmployeesError } = useEmployees();

  if (isRoomsLoading || isPrintersLoading || isEmployeesLoading)
    return <div>loading screen</div>

  if (isRoomsError || isPrintersError || isEmployeesError)
    return <div>loading screen</div>

  return (
    <PageContent rooms={rooms} printers={printers} employees={employees}/>
  )
}

export default LoadingPage
