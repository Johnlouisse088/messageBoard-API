import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'


export const AuthContext = createContext()

function Authentication({ children }) {

    const [authTokens, setAuthTokens] = useState()
    const [userAccessToken, setUserAccessToken] = useState(null)
    const [userRefreshToken, setUserRefreshToken] = useState(null)
    const [topics, setTopics] = useState([])
    const [error, setError] = useState("")
    const [roomForm, setRoomForm] = useState({
        "name": "",
        "topic": "",
        "description": "",
        "participants": []
    })

    const navigate = useNavigate()

    // If the access token is expired
    const accessTokenExpired = () => {
        navigate('/login')
        alert('Session expired, please login again')
        setAuthTokens(null)
        setUserAccessToken(null)
        setUserRefreshToken(null)
        localStorage.removeItem('authTokens')
    }

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
    }, [])

    const handleChange = (event) => {
        setRoomForm((currentForm) => {
            const { name, value } = event.target
            return { ...currentForm, [name]: value }
        })
    }

    // Create room
    async function handleSubmit(event) {
        event.preventDefault()
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/rooms/create/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    'Authorization': 'Bearer ' + String(authTokens.access)
                },
                body: JSON.stringify(roomForm)
            })
            if (response.ok) {
                navigate('/')         // navigate the homepage after the room created
                setRoomForm({         // reset the form after the room created
                    "name": "",
                    "topic": "",
                    "description": ""
                })
            }
        } catch (error) {
            console.error(error)
            setError("Failed to create room!")
        }
    }

    // Fetch topic for create room form
    async function fetchTopic() {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/topics`)
            const data = await response.json()
            setTopics(data)
        } catch (error) {
            console.error(error)
            setError("Failed to load topics")
        }
    }


    const context = {
        authTokens,
        userAccessToken,
        userRefreshToken,
        setAuthTokens,
        setUserAccessToken,
        setUserRefreshToken,
        handleChange,
        handleSubmit,
        roomForm,
        fetchTopic,
        topics,
        error,
        accessTokenExpired,

    }
    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}

export default Authentication
