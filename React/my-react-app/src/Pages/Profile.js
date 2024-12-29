import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/Authentication'

function Profile() {

    const { authTokens, userAccessToken } = useContext(AuthContext)

    const [rooms, setRooms] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/profile/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + String(authTokens.access)
                    }
                })
                const data = await response.json()
                console.log('data: ', data.user_room)
                setRooms(data.user_room)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])


    return (
        <div>
            <h1>Profile</h1>
            <p>Name: {userAccessToken.name}</p>
            <p>Email: {userAccessToken.email} </p>
            <p>Description: {userAccessToken.bio} </p>

            <h2>Rooms hosted by {userAccessToken.name}</h2>
            <ul>
                {rooms.map(room => {
                    return <li key={room.id}>{room.name}</li>
                })}
            </ul>
        </div>
    )
}

export default Profile
