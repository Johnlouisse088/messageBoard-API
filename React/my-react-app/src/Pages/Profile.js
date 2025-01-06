import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/Authentication'
import { Link, useLocation } from 'react-router-dom';

function Profile() {

    const [rooms, setRooms] = useState([])

    const { authTokens, userAccessToken } = useContext(AuthContext)

    const location = useLocation()
    const { userInfo } = location.state || {}

    console.log('userInfo: ', userInfo)

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
            <p>Name: {userInfo.name}</p>
            <p>Email: {userInfo.email} </p>
            <p>Description: {userInfo.bio} </p>

            {userAccessToken.name === userInfo.username ? (
                <Link
                    to={`/profile/update/${userInfo.id}`}
                    state={{ profileInfo: userInfo }}>
                    <h4>Update Profile</h4>
                </Link>
            ) : null}


            <h2>Rooms hosted by {userInfo.name}</h2>
            <ul>
                {rooms.map(room => {
                    return <li key={room.id}>{room.name}</li>
                })}
            </ul>
        </div>
    )
}

export default Profile
