import React from 'react'
import { Outlet } from 'react-router-dom'

const DefaultLayout = () => {
    return (
        <div className='inner-content'>
            <Outlet />
        </div>
    )
}

export default DefaultLayout
