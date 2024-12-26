import React, { useContext } from 'react';
import { AuthContext } from '../Context/Authentication';
import { useNavigate } from 'react-router-dom';

function Logout() {

    const { setAuthTokens, setUserAccessToken, setUserRefreshToken } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleClick = () => {
        localStorage.removeItem('authTokens')
        setAuthTokens(null)
        setUserAccessToken(null)
        setUserRefreshToken(null)
        navigate('/')
    }

    return (
        <div>
            Are you sure you want to logout?
            <button onClick={handleClick}>Confirm</button>
        </div>
    );
}

export default Logout;
