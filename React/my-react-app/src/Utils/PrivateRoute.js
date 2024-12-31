import React, { useContext } from 'react'
import { AuthContext } from '../Context/Authentication'
import { Navigate } from 'react-router-dom';

function PrivateRoute({ Component }) {

    const { userAccessToken } = useContext(AuthContext)

    const output = () => {
        if (userAccessToken) {
            return <Component />
        } else {
            // When you refresh the page without token in userAccessToken, it will go automatically in the login Component
            if (Component.name === 'Login') {
                return <Navigate to='/login' />
            } else {
                // When you refresh the page it wil stay in the same page. Compare to the previous version it goes to homepage after you refresh it even you are in different page
                // In the previous implementation. In the first render, the userAccessToken is null so it will go to login component
                // For the current implementation. We throw a null value for the first render even its no value inside of the userAccessToken
                // go to github and read the previous branches
                return null
            }
        }
    }


    return output()
}

export default PrivateRoute
