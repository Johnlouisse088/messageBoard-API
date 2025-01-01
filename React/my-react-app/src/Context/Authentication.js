import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'


export const AuthContext = createContext()

function Authentication({ children }) {

    const [authTokens, setAuthTokens] = useState()
    const [userAccessToken, setUserAccessToken] = useState(null)
    const [userRefreshToken, setUserRefreshToken] = useState(null)

    const navigate = useNavigate()

    // When the page is refreshed
    useEffect(() => {
        const localStorageTokens = JSON.parse(localStorage.getItem('authTokens'))
        if (localStorageTokens) {
            setAuthTokens(localStorageTokens)
            setUserAccessToken(jwtDecode(localStorageTokens.access))
            setUserRefreshToken(localStorageTokens.refresh)
        } else {
            navigate('/login')
        }
    }, [])

    // refresh token function
    async function refreshTokens() {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/token/refresh/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refresh: userRefreshToken })
            })
            if (response.ok) {
                const data = await response.json()
                console.log("------data: ", data.access)
                setAuthTokens(data)
                setUserAccessToken(jwtDecode(data.access))
                setUserRefreshToken(data.refresh)
                localStorage.setItem('authTokens', JSON.stringify(data))
            } else {
                alert("session expired")
                setAuthTokens(null)
                setUserAccessToken(null)
                setUserRefreshToken(null)
                localStorage.removeItem('authTokens')
            }
        } catch (error) {
            console.error(error)
        }
    }

    // every 4 mins the refresh token will refreshed
    useEffect(() => {
        if (authTokens) {
            const minutes = 4
            const convertedMinutes = 60 * 1000 * minutes
            const interval = setInterval(refreshTokens, convertedMinutes)
            return () => clearInterval(interval)
        }
    }, [authTokens])


    const context = {
        authTokens,
        userAccessToken,
        userRefreshToken,
        setAuthTokens,
        setUserAccessToken,
        setUserRefreshToken
    }
    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}

export default Authentication
