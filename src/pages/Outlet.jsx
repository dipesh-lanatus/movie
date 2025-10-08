import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const OutletComponent = () => {
  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default OutletComponent