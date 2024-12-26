import React, { useContext } from 'react'
import { AuthContext } from '../Context/Authentication'
import { Navigate } from 'react-router-dom';

function PrivateRoute({ Component }) {

    const { userAccessToken } = useContext(AuthContext)

    return userAccessToken ? <Component /> : <Navigate to='/login' />
}

export default PrivateRoute
