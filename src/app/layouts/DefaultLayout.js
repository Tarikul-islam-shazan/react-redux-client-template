import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const DefaultLayout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('userInfo'))
        if(data?.status === 'ACTIVE'){
            navigate('/dashboard')
        } else if (data?.status === 'DISABLED') {
            localStorage.clear();
            sessionStorage.clear()
            navigate('/login')
        } else if (data?.emailVerified === false) {
            navigate('/login', { state: { emailVerified: false } })
        }else if (data?.businessInfoGiven === false) {
            navigate('/activation')
            return <Navigate to='/activation' />
        } else if (data?.status === 'PENDING') {
            navigate('/activation')
        }
    },[])

    return (
        <div className='inner-content'>
            <Outlet />
        </div>
    )
}

export default DefaultLayout
